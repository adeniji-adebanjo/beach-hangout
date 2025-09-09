import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get("file") as File;

  if (!file)
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadsDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

  const fileName = `${Date.now()}-${(file as File).name ?? "upload"}`;
  const filePath = path.join(uploadsDir, fileName);
  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({ url: `/uploads/${fileName}` });
}
