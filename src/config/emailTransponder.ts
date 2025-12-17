import nodemailer from 'nodemailer';
import env from './env_config';
const transporter = nodemailer.createTransport({
  host: env.email_clr,
  port: Number(env.email_port),
  secure: Number(env.email_port) === 465,
  auth: {
    user: env.email,
    pass: env.email_password,
  },
  tls: {
    rejectUnauthorized: false,
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  rateLimit: 10,
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email server not ready:", error);
  } else {
    console.log("✅ Email server ready for sending messages");
  }
});

export default transporter;