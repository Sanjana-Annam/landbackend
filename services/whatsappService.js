require("dotenv").config();
const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Format phone number safely
function formatPhone(phone) {
  if (!phone) return null;

  let cleaned = phone.toString().replace(/\D/g, "");

  // If user entered 10 digit Indian number
  if (cleaned.length === 10) {
    cleaned = "91" + cleaned;
  }

  // If already has country code (12 digits like 9198...)
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return cleaned;
  }

  return cleaned;
}

exports.sendAdminWhatsApp = async (data) => {
  try {
    await client.messages.create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:${process.env.ADMIN_WHATSAPP}`,
      body: `New Booking:\nName: ${data.name}\nPhone: ${data.phone}\nSlot: ${data.date} ${data.time}`
    });

    console.log("Admin WhatsApp Sent Successfully");

  } catch (error) {
    console.log("Admin WhatsApp Error:", error.message);
  }
};

exports.sendClientWhatsApp = async (data) => {
  try {
    const formattedPhone = formatPhone(data.phone);

    if (!formattedPhone) {
      console.log("Invalid phone number provided:", data.phone);
      return;
    }

    await client.messages.create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:+${formattedPhone}`,
      body: `Hi ${data.name}, your slot is confirmed on ${data.date} at ${data.time}.`
    });

    console.log("Client WhatsApp Sent to:", formattedPhone);

  } catch (error) {
    console.log("Client WhatsApp Error:", error.message);
  }
};
