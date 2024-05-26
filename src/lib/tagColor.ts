import ch from "color-hash";
// @ts-ignore
const colorHash = new ch.default();

export function tagColor(tag: string): string {
  return colorHash.hex(tag + "q");
}
