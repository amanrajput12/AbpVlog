import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

export const Mailsend = async (email, mailsubject, mailtext) => {
  try {
    const accountemail = process.env.user;
    const password = process.env.pass;
    
    
    
    // Configure Nodemailer for Office 365 SMTP server
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com', // Office 365 SMTP server
      port: 587, // TLS port
      secure: false, // Use false for TLS (port 587)
      auth: {
        user: accountemail, // Your Office 365 email
        pass: password, // Your Office 365 email password
      },
      tls: {
        ciphers: 'SSLv3' // Add this to prevent certain TLS connection errors
      }
    });

    let info = await transporter.sendMail({
      from: accountemail, // Sender address
      to: email, // Recipient email address
      subject: mailsubject, // Subject line
      html: mailtext // Email content in HTML
    });

    console.log('Mail sent successfully:', info);
    return info;
  } catch (error) {
    console.log('Error sending mail:', error.message);
  }
};
