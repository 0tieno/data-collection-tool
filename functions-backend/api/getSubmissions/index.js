// getSubmissions/index.js

import { CosmosClient } from "@azure/cosmos";

const { COSMOS_DB_CONNECTION_STRING, COSMOS_DB_NAME, COSMOS_DB_CONTAINER } = process.env;

const client = new CosmosClient(COSMOS_DB_CONNECTION_STRING);
const container = client.database(COSMOS_DB_NAME).container(COSMOS_DB_CONTAINER);

export async function GET(context, req) {
  try {
    const { resources: items } = await container.items.query("SELECT * FROM c").fetchAll();

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items), // ✅ important!
    };
  } catch (error) {
    context.log.error("❌ Failed to fetch submissions:", error);

    context.res = {
      status: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to fetch submissions" }),
    };
  }
}
