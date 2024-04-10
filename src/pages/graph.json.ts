import { bdb } from "../lib/braindb.mjs";
import { toGraphologyJson } from "../lib/graph";

export async function GET() {
  return new Response(JSON.stringify(await toGraphologyJson(bdb)));
}
