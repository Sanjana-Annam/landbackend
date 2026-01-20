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

  // 1️⃣ SEND EMAILS FIRST
  try {
    await sendAdminEmail(data);
    await sendClientEmail(data);
    console.log("Emails Sent Successfully");
  } catch (emailError) {
    console.log("Email Error:", emailError.message);
  }

  // 2️⃣ SAVE TO GOOGLE SHEET
  try {
    await axios.post(
      "https://script.google.com/macros/s/AKfycbyMWCj0H_WwTK_zZ9zCArjwC5dHAfNeCr-_Ttolrzh9jhdyNaqhLa3UwP_0mKk7Sehy/exec",
      data
    );
    console.log("Saved to Google Sheet");
  } catch (sheetError) {
    console.log("Google Sheet Error:", sheetError.message);
  }

  // 3️⃣ IMMEDIATELY RETURN RESPONSE TO FRONTEND
  res.json({ success: true });

  // 4️⃣ SEND WHATSAPP IN BACKGROUND (NON BLOCKING)
  (async () => {
    try {
      await sendAdminWhatsApp(data);
      console.log("Admin WhatsApp Sent (After Response)");
    } catch (whatsappError) {
      console.log("WhatsApp Error:", whatsappError.message);
    }
  })();

});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
