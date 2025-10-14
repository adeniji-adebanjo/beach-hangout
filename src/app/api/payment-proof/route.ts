import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const firstName = formData.get("firstName")?.toString().trim();
    const lastName = formData.get("lastName")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const method = formData.get("method")?.toString().trim();

    if (!firstName || !lastName || !phone || !method) {
      return NextResponse.json({
        success: false,
        message: "All fields are required.",
      });
    }

    // ✅ Google Auth setup
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

    // ✅ Step 1: Fetch registration data (skip header row)
    const regRes = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Sheet1!A2:D", // First Name | Last Name | Email | Phone
    });

    const rows = regRes.data.values || [];

    // Normalize phone (remove spaces, leading +234 or 0)
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
        message: "User not registered. Redirecting...",
        redirect: "/#register",
      });
    }

    // ✅ Step 2: Append payment proof record
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
            phone,
          ],
        ],
      },
    });

    // ✅ Step 3: Return success and redirect
    return NextResponse.json({
      success: true,
      message: "Payment proof submitted successfully.",
      redirect: "/payment-received",
    });
  } catch (error) {
    console.error("Error submitting payment proof:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
