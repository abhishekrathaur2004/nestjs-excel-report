export interface UploadObjectInput {
  key: string;
  body: Buffer | Uint8Array;
  contentType?: string;
}

export interface UploadObjectResult {
  bucket: string;
  key: string;
  fileUrl: string;
}

export interface IMediaUploadStorage {
  upload(input: UploadObjectInput): Promise<UploadObjectResult>;
}
