require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const { sendAdminEmail, sendClientEmail } = require("./services/emailService");
const { sendAdminWhatsApp } = require("./services/whatsappService");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/api/book-meeting", async (req, res) => {

  const data = req.body;

  console.log("New Booking Request:", data);

  // --- SEND EMAILS FIRST (MOST IMPORTANT) ---
  try {
    await sendAdminEmail(data);
    await sendClientEmail(data);
    console.log("Emails Sent Successfully");
  } catch (emailError) {
    console.log("Email Error:", emailError.message);
  }

  // --- SEND WHATSAPP ---
  try {
    await sendAdminWhatsApp(data);
    console.log("Admin WhatsApp Sent");
  } catch (whatsappError) {
    console.log("WhatsApp Error:", whatsappError.message);
  }

  // --- SAVE TO GOOGLE SHEET (LAST, NON-CRITICAL) ---
  try {
    await axios.post(
      "https://script.google.com/macros/s/AKfycbyMWCj0H_WwTK_zZ9zCArjwC5dHAfNeCr-_Ttolrzh9jhdyNaqhLa3UwP_0mKk7Sehy/exec",
      data
    );
    console.log("Saved to Google Sheet");
  } catch (sheetError) {
    console.log("Google Sheet Error:", sheetError.message);
  }

  // Always return success so frontend can redirect
  res.json({ success: true });

});

app.listen(5000, () => console.log("Backend running on 5000"));
