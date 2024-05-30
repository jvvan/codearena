import env from "#start/env";

const driveConfig = {
  default: env.get("DRIVE_DEFAULT"),
  disks: {
    s3: {
      driver: "s3",
      bucket: env.get("DRIVE_S3_BUCKET"),
      region: env.get("DRIVE_S3_REGION"),
      endpoint: env.get("DRIVE_S3_ENDPOINT"),
      key: env.get("DRIVE_S3_ACCESS_KEY_ID"),
      secret: env.get("DRIVE_S3_SECRET_ACCESS_KEY"),
      forcePathStyle: env.get("DRIVE_S3_FORCE_PATH_STYLE"),
    },
  },
};

export default driveConfig;
