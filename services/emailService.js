require("dotenv").config();
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});
transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Server is ready to send emails");
  }
});


exports.sendAdminEmail = async (data) => {
  try {
    await transporter.sendMail({
      to: process.env.EMAIL_USER,
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

    console.log("Admin Email Sent Successfully");

  } catch (error) {
    console.log("Admin Email Error:", error.message);
  }
};

exports.sendClientEmail = async (data) => {
  try {
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

    console.log("Client Email Sent Successfully");

  } catch (error) {
    console.log("Client Email Error:", error.message);
  }
};
