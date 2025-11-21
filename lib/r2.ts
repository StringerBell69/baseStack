import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export async function uploadFile(
  file: Buffer,
  key: string,
  contentType: string
): Promise<{ success: boolean; url?: string; error?: unknown }> {
  try {
    await r2Client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: key,
        Body: file,
        ContentType: contentType,
      })
    )

    const url = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`
    return { success: true, url }
  } catch (error) {
    console.error("Error uploading file to R2:", error)
    return { success: false, error }
  }
}

export async function deleteFile(key: string): Promise<{ success: boolean; error?: unknown }> {
  try {
    await r2Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: key,
      })
    )
    return { success: true }
  } catch (error) {
    console.error("Error deleting file from R2:", error)
    return { success: false, error }
  }
}

export async function getSignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn = 3600
): Promise<{ success: boolean; url?: string; error?: unknown }> {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      ContentType: contentType,
    })

    const url = await getSignedUrl(r2Client, command, { expiresIn })
    return { success: true, url }
  } catch (error) {
    console.error("Error generating signed URL:", error)
    return { success: false, error }
  }
}

export async function getSignedDownloadUrl(
  key: string,
  expiresIn = 3600
): Promise<{ success: boolean; url?: string; error?: unknown }> {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
    })

    const url = await getSignedUrl(r2Client, command, { expiresIn })
    return { success: true, url }
  } catch (error) {
    console.error("Error generating signed download URL:", error)
    return { success: false, error }
  }
}
