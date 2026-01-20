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

  // 4️⃣ AFTER RESPONSE – SEND WHATSAPP IN BACKGROUND
  // This runs asynchronously so user is not blocked
  (async () => {
    try {
      await sendAdminWhatsApp(data);
      console.log("Admin WhatsApp Sent (After Response)");
    } catch (whatsappError) {
      console.log("WhatsApp Error:", whatsappError.message);
    }
  })();

});
