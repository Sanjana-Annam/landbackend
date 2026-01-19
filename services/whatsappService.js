require("dotenv").config();
const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.sendAdminWhatsApp = async (data) => {
  await client.messages.create({
    from: "whatsapp:+14155238886",
    to: `whatsapp:${process.env.ADMIN_WHATSAPP}`,
    body: `New Booking:\n${data.name}\n${data.phone}\n${data.date} ${data.time}`
  });
};

exports.sendClientWhatsApp = async (data) => {
  await client.messages.create({
    from: "whatsapp:+14155238886",
    to: `whatsapp:+91${data.phone}`,
    body: `Hi ${data.name}, your slot is confirmed on ${data.date} at ${data.time}`
  });
};
