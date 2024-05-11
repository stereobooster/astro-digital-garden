import { bdb } from "@lib/braindb.mjs";

export async function GET() {
  await bdb.ready();

  return new Response(JSON.stringify([]));
}
