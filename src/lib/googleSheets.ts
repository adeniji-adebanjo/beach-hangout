import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const PAID_SHEET_NAME = "groups";

function getCredentials() {
  const client_email = process.env.GOOGLE_CLIENT_EMAIL;
  // Important: replace escaped `\n` with real newlines for private key
  const private_key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!client_email || !private_key) {
    throw new Error("Missing Google service account credentials in env vars.");
  }
  return { client_email, private_key };
}

export function getSheetsClient() {
  const { client_email, private_key } = getCredentials();

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email,
      private_key,
    },
    scopes: SCOPES,
  });

  return google.sheets({ version: "v4", auth });
}

export async function ensurePaidAttendeesSheet(
  spreadsheetId: string
): Promise<void> {
  const sheets = getSheetsClient();
  const resp = await sheets.spreadsheets.get({ spreadsheetId });
  const sheetTitles = (resp.data.sheets ?? []).map((s) => s.properties?.title);
  const exists = sheetTitles.includes(PAID_SHEET_NAME);

  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: PAID_SHEET_NAME } } }],
      },
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${PAID_SHEET_NAME}!A1:D1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [["first_name", "last_name", "status", "team"]],
      },
    });
  }
}

export type AttendeeRow = {
  rowIndex: number;
  firstName: string;
  lastName: string;
  status: string;
  team?: string;
};

export async function readAttendees(
  spreadsheetId: string
): Promise<AttendeeRow[]> {
  const sheets = getSheetsClient();
  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${PAID_SHEET_NAME}!A2:D`,
  });

  const values = (resp.data.values ?? []) as string[][];
  return values.map((r, idx) => ({
    rowIndex: idx + 2,
    firstName: r[0]?.trim() ?? "",
    lastName: r[1]?.trim() ?? "",
    status: r[2]?.trim() ?? "",
    team: r[3]?.trim() ?? "",
  }));
}

export async function updateTeamAssignments(
  spreadsheetId: string,
  updates: { rowIndex: number; team: string }[]
): Promise<void> {
  const sheets = getSheetsClient();
  const data = updates.map((u) => ({
    range: `${PAID_SHEET_NAME}!D${u.rowIndex}`,
    majorDimension: "ROWS",
    values: [[u.team]],
  }));

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId,
    requestBody: { valueInputOption: "RAW", data },
  });
}
