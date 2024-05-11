import { bdb } from "@lib/braindb.mjs";

export async function GET() {
  const docs = await bdb.documents();
  return new Response(
    JSON.stringify(
      docs.map((doc) => {
        const date = doc.updatedAt().toISOString().split("T")[0].split("-");
        return {
          objectID: doc.id(),
          name: doc.title(),
          description: doc.text(),
          categories: date,
          hierarchicalCategories: {
            lvl0: date[0],
            lvl1: `${date[0]} > ${date[1]}`,
            lvl2: `${date[0]} > ${date[1]} > ${date[2]}`,
          },
          url: doc.url(),
          brand: doc.frontmatter().tags || [],
          popularity: doc.updatedAt().getTime(),
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
