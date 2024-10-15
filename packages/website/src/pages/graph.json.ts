import { getBrainDb } from "starlight-digital-garden";
import { toGraphologyJson } from "@lib/graph";

export async function GET() {
  await getBrainDb().ready();
  return new Response(JSON.stringify(await toGraphologyJson(getBrainDb())));
}
