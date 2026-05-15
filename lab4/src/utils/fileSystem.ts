import { Directory, Paths } from "expo-file-system";

export const BASE_DIR = new Directory(Paths.document, "filemanager");

export async function ensureBaseDir(): Promise<void> {
  if (!BASE_DIR.exists) {
    BASE_DIR.create({ intermediates: true });
  }
}

export interface FileItem {
  name: string;
  path: string;
  isDirectory: boolean;
  size: number;
  modificationTime: number;
}

export async function readDirectory(dir: Directory): Promise<FileItem[]> {
  const items = dir.list();

  const details: FileItem[] = items.map((item) => {
    const isDirectory = item instanceof Directory;
    const info = isDirectory ? item.info() : item.info();

    return {
      name: item.name,
      path: item.uri,
      isDirectory,
      size: info.size ?? 0,
      modificationTime: info.modificationTime ?? 0,
    };
  });

  return details.sort((a, b) => {
    if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

export function getRelativePath(dir: Directory): string {
  return dir.uri.replace(BASE_DIR.uri, "") || "Root";
}

export interface BreadcrumbSegment {
  name: string;
  uri: string;
}

export function getBreadcrumb(dir: Directory): BreadcrumbSegment[] {
  const relative = dir.uri.replace(BASE_DIR.uri, "");
  if (!relative) return [{ name: "Root", uri: BASE_DIR.uri }];

  const segments = relative.split("/").filter(Boolean);
  const result: BreadcrumbSegment[] = [{ name: "Root", uri: BASE_DIR.uri }];

  let currentUri = BASE_DIR.uri;
  for (const segment of segments) {
    currentUri = currentUri + segment + "/";
    result.push({ name: segment, uri: currentUri });
  }

  return result;
}

export function formatSize(bytes: number): string {
  if (bytes === 0) return "0 B";

  const kb = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(kb));

  return parseFloat((bytes / Math.pow(kb, i)).toFixed(2)) + " " + sizes[i];
}
