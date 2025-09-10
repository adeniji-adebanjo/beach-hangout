import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

export const runtime = "nodejs";

// Configure Cloudinary with env vars
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST handler - upload image to Cloudinary + save URL in MongoDB
export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const fileEntry = data.get("file");

    if (!fileEntry || !(fileEntry instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await fileEntry.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary (with auto compression/optimization)
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "nlwc_gallery",
            transformation: [{ quality: "auto", fetch_format: "auto" }],
          },
          (error: unknown, result?: UploadApiResponse) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    const result = uploadResult as { secure_url: string };

    // Save URL to MongoDB
    const client = await clientPromise;
    const db = client.db("nlwc_gallery");
    const collection = db.collection("images");

    const insertResult = await collection.insertOne({
      url: result.secure_url,
      uploadedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      id: insertResult.insertedId.toString(),
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

// GET handler - fetch images from MongoDB
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("nlwc_gallery");
    const collection = db.collection("images");

    const images = await collection.find({}).sort({ uploadedAt: -1 }).toArray();

    const imagesWithId = images.map((img) => ({
      ...img,
      _id: img._id?.toString(),
    }));

    return NextResponse.json(imagesWithId);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
