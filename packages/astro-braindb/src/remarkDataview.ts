import remarkCodeHook from "@beoe/remark-code-hook";
import type { BrainDB, Task, Document } from "@braindb/core";

const list = (children: any) => ({
  type: "list",
  ordered: false,
  start: null,
  spread: false,
  children,
});
const listItem = (children: any, checked = null) => ({
  type: "listItem",
  spread: false,
  checked,
  children,
});
const paragraph = (children: any) => ({ type: "paragraph", children });
const link = (children: any, url: string) => ({
  type: "link",
  title: null,
  url: url,
  children,
});
const text = (value: string) => ({ type: "text", value });

export type RemarkDataviewOptions = {
  bdb: BrainDB;
  isContent?: (x: Document) => boolean;
};

export function remarkDataview(options: RemarkDataviewOptions): any {
  const { bdb, isContent, ...rest } = options;
  // @ts-ignore
  return remarkCodeHook({
    ...rest,
    language: "dataview",
    code: ({ code }) => {
      if (code !== "TASK")
        throw new Error("PoC of Daview - only TASK supported");

      const grouped: Record<string, Task[]> = {};
      bdb.tasksSync().forEach((task) => {
        const path = task.from().path();
        grouped[path] = grouped[path] || [];
        grouped[path].push(task);
      });

      return paragraph(
        Object.values(grouped)
          .filter((group) => (isContent ? isContent(group[0].from()) : true))
          .flatMap((group) => {
            const doc = group[0].from();
            return [
              paragraph([link([text(doc.title())], doc.url())]),
              // @ts-ignore
              list(group.map((task) => listItem([task.ast()], task.checked()))),
            ];
          })
      );
    },
  });
}
