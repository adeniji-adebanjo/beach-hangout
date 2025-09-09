import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { compressImage } from "@/lib/compressImage";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const uploadsDir = path.join(process.cwd(), "public/uploads");

// POST handler (existing)
export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const fileEntry = data.get("file");
    if (!fileEntry || !(fileEntry instanceof File))
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const arrayBuffer = await fileEntry.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

    const fileName = `${Date.now()}-${fileEntry.name}`;
    const tempPath = path.join(uploadsDir, "temp-" + fileName);
    const finalPath = path.join(uploadsDir, fileName);

    // Save original temporarily
    fs.writeFileSync(tempPath, buffer);

    // Compress using TinyPNG
    await compressImage(tempPath, finalPath);

    // Remove temp file
    fs.unlinkSync(tempPath);

    // Save URL to MongoDB
    const client = await clientPromise;
    const db = client.db("nlwc_gallery");
    const collection = db.collection("images");

    await collection.insertOne({
      url: `/uploads/${fileName}`,
      uploadedAt: new Date(),
    });

    return NextResponse.json({ success: true, url: `/uploads/${fileName}` });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

// GET handler (add this)
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("nlwc_gallery");
    const collection = db.collection("images");

    const images = await collection.find({}).sort({ uploadedAt: -1 }).toArray();

    return NextResponse.json(images);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
