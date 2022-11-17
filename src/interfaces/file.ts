export interface GenericItem {
  name: string;
  created: Date;
  path: string;
  size?: number;
  type: "file" | "dir";
  file: string;
  preview?: string;
  md5?: string;
}
