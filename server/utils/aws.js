const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadFilesToS3 = async (files, bucketName) => {
  try {
    const uploadPromises = files.map(async (file) => {
      const fileStream = fs.createReadStream(file.path);

      const params = {
        Bucket: bucketName,
        Key: file.filename,
        Body: fileStream,
      };

      const command = new PutObjectCommand(params);
      const result = await client.send(command);

      return {
        Key: params.Key,
        Location: `https://${bucketName}.s3.amazonaws.com/${params.Key}`,
        ETag: result.ETag,
      };
    });

    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error("S3 Upload Error: ", error);
    throw new Error(`File upload failed: ${error.message}`);
  }
};

const storeFilesLocally = async (files, storageDir) => {
  try {
    const storedFilePaths = [];

    for (const file of files) {
      const localFilePath = path.join(storageDir, file.originalname);
      const fileStream = fs.createWriteStream(localFilePath);
      fileStream.write(file.buffer);
      fileStream.end();

      storedFilePaths.push(localFilePath);
      console.log(
        `Successfully stored ${file.originalname} at ${localFilePath}`
      );
    }
    
    return storedFilePaths;
  } catch (error) {
    console.error("Error storing files locally:", error);
    throw error;
  }
};

module.exports = { storeFilesLocally };