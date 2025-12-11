import * as functions from "firebase-functions";
import cors from "cors";
import { google } from "googleapis";

const corsHandler = cors({ origin: true });

// ⚠️ Tu remplis ces constantes avec TES valeurs :
const CLIENT_EMAIL = "contact-form-service@kodium-website.iam.gserviceaccount.com";
const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCifvGF1BsSuJrq\nGnus1YZ5idVwWa0R9FExe65f4ftL+Ch8EMfv4lUpX6x4S+zFUmtY9QobzgYIMsiw\nBOT5y70IQi71SIunS9HrCXJrNpKvko5k8G3azdGzq7tvh6gljuAQ2LQf/85kvm4l\n96fArt+10nG3Gv3k7Y9+etzMVBukzgu3spAy5x9LaIx42aDkflYThc4VdrhyP8a4\naF1mVAQbsyzOb/XstAYueHuT4WBgSbaV8e6B0LlE9bcnf6+y6MqtPVci97PQP0OX\nlvi/neIzHLTPwAbElJSNGIUyNNA0GV+u1v3piewOfUlpJbC1JMNbXL6G4d0lLXts\n9fW8Gum1AgMBAAECggEACf28q3dzHQeml3TT5w4E8/BL5ER7SKfpSHMxRvojLv9d\n5oz17NO8MUGi842VjBIT1sx67TfnH+DBfVh7sg6Qe6jCxY2gRUPQmdSYSVZ5wUZa\nr4L8pNq0BV8D32kWUg2IIjkKJY/fY0s12hXxZalK84gc5P7e9BEVmi0DP6P/RCGB\nt/kE0xmpaHghsF9cUbOrtb9lhwHIYOHh0X4Uaa5osrFXjwmZBUv8g7sbwXhsa6pg\nGW7+j+x1c2nBZKLyfwpmDjFcLJUTq8w+pIvm+NeCtktw9/rYbzKj45SPRfrvPNdf\nFWOYoxnXDgcuLheiI2gVOcgbHpHgxrtDVXBcbg6L+QKBgQDSP7yAj3gkrfJ/cagD\niYHBbMavXx1/DRNfGNhuIeWf1L13HTb5mh2wVZ1tr109QH66BBX39FwDDJHdzQbN\n28nPbwnoIiETvApVaDyg5gyUMbbKxRXB2+Pvh9ndfQLRFLfBaiFApHdAAWJuQirx\nnaj4u+ZJaJVdZ6ezGlag+pKsaQKBgQDF2wriqCQSM/IVXGJzrlQHvHDNNZGxov4v\nN2vws4p2vKAr7fVDnDEXQuqu+/Pja0ItxSYIwlfqBXfWFqXlPBJhZh/Xz3xpi9g7\nrbTJqMGhwCSVTYFd023dFnQ/LU/yockwDw7RSQCu4vxAydh2a9p5imL/QOQiT/JM\nZlCgJR9ZbQKBgA2N4FglZ6htsmF28U7xEXVnztNFfYBQVnxd/K3073nDXEeOkZm7\nzsgsbM7CbG9jdggF9Wibz0a/C7RR4GtrDPKbhPb7JEjCaaQh6S6yRgNTxSYDWKi7\nxVEO4APAaGsUO9hzQBuLvshYjoDvMReMg3Utn+YBoQd5hD0uqIEORmBpAoGBAMDW\ni9Z7sKR5MpJ1N5OuLkJX/M1VT8oFpZ5Zcv/nzaWKlMYcKDccTZBxbRDdikh2asr3\nYumYmV0CtVjZPBmfof6CLbkGhijM3xTTaeg+bXL8Neu63cKX5nVchDJrNIez/cW0\nd2mtsFfD7b4rvKk213osUe6czX1P1EV4V06uv85FAoGAR4OLibdaE1qDOtv5oz2r\nFb2otpGlZVb34ICLdLD5ZrBjaat0dG+PMUIs/tr9ie8MXxuqBLoJ8SjAD442ui5a\nuVMdrVJ4t7E7u7XSrwLBnx7VVRzfiaqx73FUBaIn3SK6yCayMdAYtaGio2EyXolj\nH6WIlM/BW30t0DXPcxE/oZ0=\n-----END PRIVATE KEY-----\n`;
const SPREADSHEET_ID = "1qRCNuB43-RXvk1MlTSFDH1fY2cmkvsxErdJkjEPGE1I";
const SHEET_NAME = "Feuille 1";

export const addContactMessage = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Méthode non autorisée" });
    }

    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: CLIENT_EMAIL,
          private_key: PRIVATE_KEY,
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const sheets = google.sheets({ version: "v4", auth });

      const body = req.body || {};

      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1`,
        valueInputOption: "RAW",
        requestBody: {
          values: [
            [
              new Date().toISOString(),
              body.lang || "",
              body.type || "",
              body.company || "",
              body.name || "",
              body.email || "",
              body.phone || "",
              body.message || "",
            ],
          ],
        },
      });

      return res.json({ status: "success" });
    } catch (err: any) {
      console.error("Erreur Cloud Function:", err?.message || err);
      return res.status(500).json({ error: "Erreur interne" });
    }
  });
});
