import GenerateOtp from "../utils/generate_otp";
import transporter from "../config/emailTransponder";

export class EmailService {
  static async sendOtp(email: string,otp:number) {
    return await transporter.sendMail({
      from: `"Task Manager" <${process.env.EMAIL || 'noreply@yourdomain.com'}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}. It will expire in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Email Verification</h2>
          <p>Your OTP code is:</p>
          <h1 style="color: #4CAF50; letter-spacing: 5px;">${otp}</h1>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
      `,
    });
  }
}
