require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { sendAdminEmail, sendClientEmail } = require("./services/emailService");
const { sendAdminWhatsApp, sendClientWhatsApp } = require("./services/whatsappService");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/api/book-meeting", async (req, res) => {

  const data = req.body;

  try {

    // 1️⃣ SAVE TO GOOGLE SHEET FIRST
    await fetch("https://script.google.com/macros/s/AKfycbyMWCj0H_WwTK_zZ9zCArjwC5dHAfNeCr-_Ttolrzh9jhdyNaqhLa3UwP_0mKk7Sehy/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    // 2️⃣ SEND EMAILS
    await sendAdminEmail(data);
    await sendClientEmail(data);

    // 3️⃣ SEND WHATSAPP
    await sendAdminWhatsApp(data);
    await sendClientWhatsApp(data);

    res.json({ success: true });

  } catch (error) {
    console.log("Booking Error:", error);
    res.status(500).json({ success: false });
  }

});

app.listen(5000, () => console.log("Backend running on 5000"));
