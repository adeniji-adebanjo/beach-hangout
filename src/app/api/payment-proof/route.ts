import { google } from "googleapis";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const firstName = formData.get("firstName")?.toString().trim();
    const lastName = formData.get("lastName")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const method = formData.get("method")?.toString().trim();
    const file = formData.get("file") as File | null;

    if (!firstName || !lastName || !phone || !method || !file) {
      return NextResponse.json({
        success: false,
        message: "All fields are required.",
      });
    }

    // ✅ Setup Google Auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: process.env.GOOGLE_TYPE,
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const sheetId = process.env.GOOGLE_SHEET_ID!;

    // ✅ Step 1: Check registration from “Sheet1” (columns B:E)
    const regRes = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Sheet1!B2:E", // First Name | Last Name | Email | Phone
    });

    const rows = regRes.data.values || [];

    const normalizePhone = (num: string) =>
      num.replace(/\s+/g, "").replace(/^(\+234|0)/, "");

    const isRegistered = rows.some((row) => {
      const [fName, lName, , phoneNum] = row.map((v) =>
        v?.toString().trim().toLowerCase()
      );

      return (
        (fName === firstName.toLowerCase() &&
          lName === lastName.toLowerCase()) ||
        (phoneNum && normalizePhone(phoneNum) === normalizePhone(phone))
      );
    });

    if (!isRegistered) {
      return NextResponse.json({
        success: false,
        message: "User not registered. Please register. Redirecting...",
        redirect: "/#register",
      });
    }

    // ✅ Step 2: Cloudinary upload
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "payment_proofs",
              resource_type: "auto",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result as { secure_url: string });
            }
          )
          .end(buffer);
      }
    );

    // ✅ Step 3: Append to “proof_of_payment” sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "proof_of_payment!A2",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            new Date().toLocaleString(),
            `${firstName} ${lastName}`,
            method,
            uploadResult.secure_url,
          ],
        ],
      },
    });

    // ✅ Step 4: Return success response
    return NextResponse.json({
      success: true,
      message: "Payment proof submitted successfully.",
      redirect: "/payment-received",
    });
  } catch (error) {
    console.error("Error submitting payment proof:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
