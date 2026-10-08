import { readFileSync } from "node:fs";
import path from "node:path";

import { codeToHtml } from "shiki";

export interface SourceFile {
  path: string;
  name: string;
  code: string;
}

const registryPrefix = "src/registry/";

export function readSourceFiles(files: readonly string[]): SourceFile[] {
  return files.map((file) => {
    if (!file.startsWith(registryPrefix)) {
      throw new Error(`Component source must live in ${registryPrefix}: ${file}`);
    }
    return {
      path: file,
      name: path.basename(file),
      code: readFileSync(
        path.join(process.cwd(), "src", "registry", file.slice(registryPrefix.length)),
        "utf8",
      ),
    };
  });
}

export async function highlight(code: string, fileName: string) {
  "use cache";
  const lang = fileName.endsWith(".css") ? "css" : "tsx";
  return codeToHtml(code, { lang, theme: "github-light" });
}
