import { google } from "googleapis";
import { NextResponse } from "next/server";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const spreadsheetId = process.env.GOOGLE_SHEET_ID as string;

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

const GROUPS = ["Team Joy", "Team Peace", "Team Love", "Team Grace"];

export async function GET() {
  try {
    // Fetch all rows
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "paid_attendees!A:D", // first_name, last_name, status, team
    });

    const rows = res.data.values || [];

    // Extract header and data
    const [header, ...attendees] = rows;

    const paidAttendees = attendees.filter(
      (row) => row[2]?.toLowerCase() === "paid"
    );

    // Assign teams only if not already assigned
    const updatedRows: string[][] = [];
    const assigned = paidAttendees.map((row, idx) => {
      let team = row[3]; // Existing team if already assigned

      if (!team) {
        team = GROUPS[idx % GROUPS.length]; // round-robin assign
        updatedRows.push([`${row[0]}`, `${row[1]}`, row[2], team]);
      }

      return {
        firstName: row[0],
        lastName: row[1],
        status: row[2],
        team,
      };
    });

    // Persist new assignments if any
    if (updatedRows.length > 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `paid_attendees!A2:D${attendees.length + 1}`,
        valueInputOption: "RAW",
        requestBody: {
          values: attendees.map((row, i) => {
            const found = updatedRows.find(
              (u) => u[0] === row[0] && u[1] === row[1]
            );
            return found || row;
          }),
        },
      });
    }

    return NextResponse.json({ success: true, data: assigned });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Google Sheets error:", msg);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
