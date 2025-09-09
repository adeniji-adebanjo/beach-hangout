import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { compressImage } from "@/lib/compressImage";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const uploadsDir = path.join(process.cwd(), "public/uploads");

// POST handler (with more logging)
export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const fileEntry = data.get("file");
    if (!fileEntry || !(fileEntry instanceof File)) {
      console.error("No file uploaded or fileEntry is not a File");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await fileEntry.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (!fs.existsSync(uploadsDir)) {
      console.log("Uploads directory does not exist. Creating...");
      fs.mkdirSync(uploadsDir);
    }

    const fileName = `${Date.now()}-${fileEntry.name}`;
    const tempPath = path.join(uploadsDir, "temp-" + fileName);
    const finalPath = path.join(uploadsDir, fileName);

    // Save original temporarily
    fs.writeFileSync(tempPath, buffer);
    console.log(`Saved temp file: ${tempPath}`);

    // Compress using TinyPNG
    await compressImage(tempPath, finalPath);
    console.log(`Compressed image saved to: ${finalPath}`);

    // Remove temp file
    fs.unlinkSync(tempPath);
    console.log(`Temp file removed: ${tempPath}`);

    // Save URL to MongoDB
    try {
      const client = await clientPromise;
      const db = client.db("nlwc_gallery");
      const collection = db.collection("images");

      const result = await collection.insertOne({
        url: `/uploads/${fileName}`,
        uploadedAt: new Date(),
      });

      console.log("Image inserted:", result.insertedId);

      return NextResponse.json({ success: true, url: `/uploads/${fileName}` });
    } catch (dbError) {
      console.error("Mongo insert error:", dbError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  } catch (error) {
    console.error("General POST error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

// GET handler (fix _id.toString())
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("nlwc_gallery");
    const collection = db.collection("images");

    const images = await collection.find({}).sort({ uploadedAt: -1 }).toArray();

    // Convert _id to string for each image
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
