import emailjs from "@emailjs/browser";

class EmailService {
  constructor() {
    // Replace these with your EmailJS credentials
    this.serviceId = "service_wo991hq";
    this.publicKey = "W42E2JtVKWVg1M3t-";
    
    // Initialize EmailJS
    emailjs.init(this.publicKey);
  }

  // Send verification code for registration
  async sendVerificationCode(userEmail, verificationCode, userName) {
    const templateParams = {
      email: userEmail,
      to_name: userName,
      verification_code: verificationCode,
      app_name: "MindfulMe",
      message: `Welcome to MindfulMe! Your verification code is: ${verificationCode}`
    };

    try {
      const response = await emailjs.send(
        this.serviceId,
        "template_verification",
        templateParams
      );
      
      console.log("✅ Verification email sent:", response);
      return { success: true, response };
    } catch (error) {
      console.error("❌ Email send failed:", error);
      return { success: false, error: error.message };
    }
  }

  // Send password reset code
  async sendPasswordReset(userEmail, resetCode, userName) {
    const templateParams = {
      email: userEmail,
      to_name: userName,
      reset_code: resetCode,
      app_name: "MindfulMe",
      message: `Your password reset code is: ${resetCode}. This code expires in 10 minutes.`
    };

    try {
      const response = await emailjs.send(
        this.serviceId,
        "template_password_reset",
        templateParams
      );
      
      console.log("✅ Password reset email sent:", response);
      return { success: true, response };
    } catch (error) {
      console.error("❌ Password reset email failed:", error);
      return { success: false, error: error.message };
    }
  }

  // Send settings change notification
  async sendSettingsChangeNotification(userEmail, userName, changedSetting) {
    const templateParams = {
      email: userEmail,
      to_name: userName,
      app_name: "MindfulMe",
      setting_changed: changedSetting,
      message: `Your ${changedSetting} settings have been updated successfully.`
    };

    try {
      const response = await emailjs.send(
        this.serviceId,
        "template_settings",
        templateParams
      );
      
      console.log("✅ Settings change email sent:", response);
      return { success: true, response };
    } catch (error) {
      console.error("❌ Settings change email failed:", error);
      return { success: false, error: error.message };
    }
  }

  // Generate random verification code
  generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}

export default new EmailService();



