import { bdb } from "astro-braindb/braindb";
import { toGraphologyJson } from "@lib/graph";

export async function GET() {
  await bdb.ready();
  return new Response(JSON.stringify(await toGraphologyJson(bdb)));
}
