import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type {
  IMediaUploadStorage,
  UploadObjectInput,
  UploadObjectResult,
} from '../interface/media-upload-storage.interface';

@Injectable()
export class MinioStorageProvider implements IMediaUploadStorage {
  private readonly client: S3Client;
  private readonly bucket: string;
  private readonly endpoint: string;
  private readonly region: string;
  private readonly accessKey: string;
  private readonly secretKey: string;
  constructor(private readonly config: ConfigService) {
    this.endpoint = this.config.get<string>('MINIO_ENDPOINT')!;
    this.bucket = this.config.get<string>('MINIO_BUCKET')!;
    this.region = this.config.get<string>('MINIO_REGION')!;
    this.accessKey = this.config.get<string>('MINIO_ACCESS_KEY')!;
    this.secretKey = this.config.get<string>('MINIO_SECRET_KEY')!;

    this.client = new S3Client({
      region: this.region,
      endpoint: this.endpoint,
      credentials: {
        accessKeyId: this.accessKey,
        secretAccessKey: this.secretKey,
      },
      forcePathStyle: true,
    });
  }

  async upload(input: UploadObjectInput): Promise<UploadObjectResult> {
    const sanitizedKey = `reports/${Date.now()}/${input.key}`;
    try {
      await this.client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: sanitizedKey,
          Body: input.body,
          ...(input.contentType !== undefined
            ? { ContentType: input.contentType }
            : {}),
        }),
      );
      return {
        bucket: this.bucket,
        key: sanitizedKey,
        fileUrl: `${this.endpoint}/${this.bucket}/${sanitizedKey}`,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to upload file');
    }
  }
}
