import { bdb } from "@lib/braindb.mjs";

export async function GET() {
  const docs = await bdb.documents();
  return new Response(
    JSON.stringify(
      docs
        // @ts-expect-error
        .filter((doc) => doc.frontmatter().tags?.length > 0)
        .map((doc) => {
          const date = doc.updatedAt().toISOString().split("T")[0].split("-");
          return {
            objectID: doc.id(),
            name: doc.title(),
            description: doc.text(),
            updatedAt: date,
            hierarchicalUpdatedAt: {
              lvl0: date[0],
              lvl1: `${date[0]} > ${date[1]}`,
              lvl2: `${date[0]} > ${date[1]} > ${date[2]}`,
            },
            url: doc.url(),
            tag: doc.frontmatter().tags || [],
          };
        })
    ),
    {
      headers: {
        "Content-Type": "application/javascript",
      },
    }
  );
}
