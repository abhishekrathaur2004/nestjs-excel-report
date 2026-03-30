import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MEDIA_UPLOAD_STORAGE } from './constants/media-upload.constants';
import { MediaUploadService } from './media-upload.service';
import { MinioStorageProvider } from './providers/minio-storage.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
      envFilePath: ['.env', '.env.local'],
    }),
  ],
  providers: [
    {
      provide: MEDIA_UPLOAD_STORAGE,
      useClass: MinioStorageProvider,
    },
    MediaUploadService,
  ],
  exports: [MediaUploadService],
})
export class MediaUploadModule {}
