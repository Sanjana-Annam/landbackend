const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sanjanaannam87@gmail.com",
    pass: "gqpe evbl bfxt lnsz"
  }
});

exports.sendAdminEmail = async (data) => {
  await transporter.sendMail({
    to: "sanjanaannam87@gmail.com",
    subject: "New Booking from Website",
    html: `
      <h3>New Client Booking</h3>
      <p>Name: ${data.name}</p>
      <p>Phone: ${data.phone}</p>
      <p>Email: ${data.email}</p>
      <p>Slot: ${data.date} - ${data.time}</p>
      <p>Mode: ${data.mode}</p>
    `
  });
};

exports.sendClientEmail = async (data) => {
  await transporter.sendMail({
    to: data.email,
    subject: "Booking Confirmed – Jiph Furniture",
    html: `
      <h3>Hi ${data.name}</h3>
      <p>Your meeting is confirmed.</p>
      <p>Date: ${data.date}</p>
      <p>Time: ${data.time}</p>
      <p>Mode: ${data.mode}</p>
    `
  });
};
