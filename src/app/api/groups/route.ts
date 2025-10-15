import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const spreadsheetId = process.env.GOOGLE_SHEET_ID as string;

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

export async function GET() {
  try {
    // Fetch all rows from Google Sheets
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "groups!A:D",
    });

    const rows = res.data.values;

    if (!rows || rows.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "No data found" }),
        { status: 404 }
      );
    }

    // Map rows to an array of objects
    const data = rows.slice(1).map((row) => ({
      first_name: row[0] || "",
      last_name: row[1] || "",
      team: row[3] || "",
    }));

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (error: unknown) {
    console.error("Error fetching data from Google Sheets:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch data" }),
      { status: 500 }
    );
  }
}
