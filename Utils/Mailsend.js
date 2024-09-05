import nodemailer from 'nodemailer';
import dotenv from "dotenv"
dotenv.config()
export const Mailsend = async (email, mailsubject, mailtext) => {
  try {
    const accoutemail = process.env.user
    const password = process.env.pass
    const transporter = nodemailer.createTransport({
       
      host: 'smtpout.secureserver.net', // GoDaddy's SMTP server
      port: 465, // Secure port for SSL
      secure: true, // Use true for port 465
      auth: {
        user: accoutemail, // Your GoDaddy email
        pass: password, // Your GoDaddy email password
      },
    });

    let info = await transporter.sendMail({
      from: accoutemail, // sender address
      to: email, // list of receivers (should use the email parameter)
      subject: mailsubject, // subject line (should use the mailsubject parameter)
      html: mailtext
    });

    console.log('Mail sent successfully:', info);
    return info
  } catch (error) {
    console.log('Error sending mail:', error.message);
  }
};







