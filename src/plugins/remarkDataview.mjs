import remarkCodeHook from "@beoe/remark-code-hook";
import { isContent } from "../lib/braindb.mjs";

const list = (children) => ({
  type: "list",
  ordered: false,
  start: null,
  spread: false,
  children,
});

const listItem = (children, checked = null) => ({
  type: "listItem",
  spread: false,
  checked,
  children,
});

const paragraph = (children) => ({ type: "paragraph", children });

const link = (children, url) => ({
  type: "link",
  title: null,
  url: url,
  children,
});

const text = (value) => ({ type: "text", value });

export function remarkDataview(options) {
  const { bdb, ...rest } = options;
  return remarkCodeHook({
    ...rest,
    language: "dataview",
    code: ({ code }) => {
      console.log("here");
      if (code !== "TASK")
        throw new Error("PoC of Daview - only TASK supported");

      const grouped = {};
      bdb.tasksSync().forEach((task) => {
        const path = task.from().path();
        grouped[path] = grouped[path] || [];
        grouped[path].push(task);
      });

      return list(
        Object.values(grouped)
          .filter((group) => isContent(group[0].from()))
          .map((group) => {
            const doc = group[0].from();
            return listItem([
              paragraph([link([text(doc.title())], doc.url())]),
              list(group.map((task) => listItem([task.ast()], task.checked()))),
            ]);
          })
      );
    },
  });
}
