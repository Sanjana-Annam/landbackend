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

  try {

    console.log("New Booking Request:", data);

    // 1️⃣ SAVE TO GOOGLE SHEET FIRST
    await axios.post(
      "https://script.google.com/macros/s/AKfycbyMWCj0H_WwTK_zZ9zCArjwC5dHAfNeCr-_Ttolrzh9jhdyNaqhLa3UwP_0mKk7Sehy/exec",
      data
    );

    console.log("Saved to Google Sheet");

    // 2️⃣ SEND EMAILS
    await sendAdminEmail(data);
    await sendClientEmail(data);

    console.log("Emails Sent");

    // 3️⃣ SEND ADMIN WHATSAPP ONLY
    await sendAdminWhatsApp(data);

    console.log("Admin WhatsApp Sent");

    res.json({ success: true });

  } catch (error) {
    console.log("Booking Error:", error.message);
    res.status(500).json({ success: false });
  }

});

app.listen(5000, () => console.log("Backend running on 5000"));
