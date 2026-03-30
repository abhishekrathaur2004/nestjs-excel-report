import { Inject, Injectable } from '@nestjs/common';
import type {
  IMediaUploadStorage,
  UploadObjectInput,
  UploadObjectResult,
} from './interface/media-upload-storage.interface';
import { MEDIA_UPLOAD_STORAGE } from './constants/media-upload.constants';

@Injectable()
export class MediaUploadService {
  constructor(
    @Inject(MEDIA_UPLOAD_STORAGE)
    private readonly storage: IMediaUploadStorage
  ) {}

  async upload(input: UploadObjectInput): Promise<UploadObjectResult> {
    return await this.storage.upload(input);
  }
}
