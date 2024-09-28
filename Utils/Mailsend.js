import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

export const Mailsend = async (email, mailsubject, mailtext) => {
  try {
    const accountemail = process.env.user;
    const password = process.env.pass;
    
    
    
   
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587, 
      secure: false, // Use false for TLS (port 587)
      auth: {
        user: accountemail, 
        pass: password, 
      }
    });

    let info = await transporter.sendMail({
      from: "bhomi.ade@bae.org.in", // Sender address
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
