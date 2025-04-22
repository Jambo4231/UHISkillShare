const AWS = require("aws-sdk"); // Use the built-in aws-sdk
const sharp = require("sharp");

const s3 = new AWS.S3();

exports.handler = async function (event) {
  console.log("Received S3 event:", JSON.stringify(event, null, 2));

  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );
  const resizedKey = `resized/${key}`;

  // Skip processing if the file is already in the "resized/" folder
  if (key.startsWith("resized/")) {
    console.log("Skipping already resized image:", key);
    return;
  }

  try {
    // Get the uploaded image from S3
    const originalImage = await s3
      .getObject({ Bucket: bucket, Key: key })
      .promise();

    // Resize the image to 100x100
    const resizedImage = await sharp(originalImage.Body)
      .resize(100, 100) // Resize to 100x100
      .toBuffer();

    // Save the resized image back to S3
    await s3
      .putObject({
        Bucket: bucket,
        Key: resizedKey,
        Body: resizedImage,
        ContentType: "image/jpeg", // Adjust based on your image type
      })
      .promise();

    console.log(`Resized image saved to ${resizedKey}`);
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};
