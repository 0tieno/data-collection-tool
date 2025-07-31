// getSubmissions/index.js
import { CosmosClient } from "@azure/cosmos";

const { COSMOS_DB_CONNECTION_STRING, COSMOS_DB_NAME, COSMOS_DB_CONTAINER } = process.env;

const client = new CosmosClient(COSMOS_DB_CONNECTION_STRING);
const container = client.database(COSMOS_DB_NAME).container(COSMOS_DB_CONTAINER);

export async function GET(context, req) {
  const url = new URL(req.url);
  const limit = parseInt(url.searchParams.get("limit") || "10");
  const continuationToken = url.searchParams.get("token") || undefined;

  try {
    const querySpec = {
      query: "SELECT * FROM c ORDER BY c._ts DESC",
    };

    const options = {
      maxItemCount: limit,
      continuationToken,
    };

    const iterator = container.items.query(querySpec, options);
    const { resources, continuationToken: nextToken } = await iterator.fetchNext();

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: resources,
        nextToken: nextToken || null,
      }),
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
