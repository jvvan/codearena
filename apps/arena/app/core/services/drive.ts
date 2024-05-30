import driveConfig from "#config/drive";
import { DriveManager } from "flydrive";
import { S3Driver } from "flydrive/drivers/s3";

export const drive = new DriveManager({
  default: driveConfig.default,
  services: {
    s3: () =>
      new S3Driver({
        credentials: {
          accessKeyId: driveConfig.disks.s3.key,
          secretAccessKey: driveConfig.disks.s3.secret,
        },
        endpoint: driveConfig.disks.s3.endpoint,
        region: driveConfig.disks.s3.region,
        bucket: driveConfig.disks.s3.bucket,
        forcePathStyle: driveConfig.disks.s3.forcePathStyle,
        visibility: "private",
      }),
  },
});
