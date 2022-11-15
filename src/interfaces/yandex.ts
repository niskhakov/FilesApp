export interface Exif {
  date_time?: Date;
}

export interface CommentIds {
  private_resource?: string;
  public_resource?: string;
}

export interface Item {
  name: string;
  exif: Exif;
  created: Date;
  resource_id: string;
  modified: Date;
  path: string;
  comment_ids: CommentIds;
  type: string;
  revision: any;
  antivirus_status: string;
  size?: number;
  mime_type: string;
  file: string;
  media_type: string;
  preview: string;
  sha256: string;
  md5: string;
}

export interface Embedded {
  sort: string;
  items: Item[];
  limit: number;
  offset: number;
  path: string;
  total: number;
}

export interface FileItem {
  _embedded: Embedded;
  name: string;
  exif: Exif;
  resource_id: string;
  created: Date;
  modified: Date;
  path: string;
  comment_ids: CommentIds;
  type: string;
  revision: number;
}
