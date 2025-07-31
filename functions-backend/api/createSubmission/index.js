import { BlobServiceClient } from "@azure/storage-blob";
import fs from "fs";
import path from "path";

import { CosmosClient } from "@azure/cosmos";
import { validateSubmissionData } from "../validation.js";
import { IncomingForm } from "formidable";
import { Readable } from "stream";

const { COSMOS_DB_CONNECTION_STRING, COSMOS_DB_NAME, COSMOS_DB_CONTAINER } = process.env;

const client = new CosmosClient(COSMOS_DB_CONNECTION_STRING);
const container = client.database(COSMOS_DB_NAME).container(COSMOS_DB_CONTAINER);

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient("resumes"); 


export async function POST(context, req) {
  return new Promise((resolve) => {
    const form = new IncomingForm({ multiples: false });

    // ✅ Convert raw body to stream
    const bufferStream = new Readable();
    bufferStream.push(context.req.body); 
    bufferStream.push(null);
    bufferStream.headers = req.headers;

    form.parse(bufferStream, async (err, fields, files) => {
      if (err) {
        context.log("❌ Form parse error:", err);
        return resolve({
          status: 400,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ success: false, error: "Invalid form data" }),
        });
      }

      try {
        // ✅ Normalize all fields: unwrap single-element arrays
        for (const key in fields) {
          if (Array.isArray(fields[key]) && fields[key].length === 1) {
            fields[key] = fields[key][0];
          }
        }

        // ✅ Parse experienceList from JSON string
        if (fields.experienceList) {
          try {
            fields.experienceList = JSON.parse(fields.experienceList);
          } catch (e) {
            context.log("⚠️ experienceList JSON parse failed:", fields.experienceList);
            return resolve({
              status: 400,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ success: false, error: "Invalid experience list format" }),
            });
          }
        }

        // ✅ Add file name if CV is uploaded
        const uploadedFile = Array.isArray(files.cv) ? files.cv[0] : files.cv;
        if (uploadedFile) {
          const tempFilePath = uploadedFile.filepath;
const blobName = `${Date.now()}-${uploadedFile.originalFilename}`;
const blockBlobClient = containerClient.getBlockBlobClient(blobName);

// Upload the file
await blockBlobClient.uploadFile(tempFilePath);

// Attach blob info to fields
fields.cvFileName = uploadedFile.originalFilename;
fields.cvBlobUrl = blockBlobClient.url;

        }

        context.log("📦 Normalized fields:", fields);

        // ✅ Validate the submission
        const { isValid, errors } = validateSubmissionData(fields);
        if (!isValid) {
          return resolve({
            status: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ success: false, errors }),
          });
        }

        // ✅ Add timestamp and save to DB
        fields._ts = new Date().toISOString();
        const { resource: createdItem } = await container.items.create(fields);

        return resolve({
          status: 201,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ success: true, id: createdItem.id }),
        });
      } catch (err) {
        context.log.error("❌ Submission error:", err);
        return resolve({
          status: 500,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ success: false, error: err.message }),
        });
      }
    });
  });
}
