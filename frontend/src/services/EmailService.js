// src/services/EmailService.js
import emailjs from '@emailjs/browser';

class EmailService {
  constructor() {
    // Your EmailJS credentials
    this.serviceId = 'service_wo991hq';
    this.publicKey = 'W42E2JtVKWVg1M3t-';
    
    // Initialize EmailJS
    emailjs.init(this.publicKey);
  }

  // Send verification code for registration
  async sendVerificationCode(userEmail, verificationCode, userName) {
    const templateParams = {
      to_email: userEmail,
      to_name: userName,
      verification_code: verificationCode,
      from_name: 'MindfulMe Team',
      app_name: 'MindfulMe',
      message: 'Welcome to MindfulMe! Please verify your account with this code: ' + verificationCode,
      subject: 'Verify Your MindfulMe Account'
    };

    try {
      const response = await emailjs.send(
        this.serviceId,
        'template_verification', // Template for verification
        templateParams
      );
      
      console.log('✅ Verification email sent:', response);
      return { success: true, response };
    } catch (error) {
      console.error('❌ Verification email failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Send password reset code
  async sendPasswordResetCode(userEmail, resetCode, userName) {
    const templateParams = {
      to_email: userEmail,
      to_name: userName,
      reset_code: resetCode,
      from_name: 'MindfulMe Team',
      app_name: 'MindfulMe',
      message: 'Your password reset code is: ' + resetCode + '. This code expires in 10 minutes.',
      subject: 'Reset Your MindfulMe Password'
    };

    try {
      const response = await emailjs.send(
        this.serviceId,
        'template_password_reset', // Template for password reset
        templateParams
      );
      
      console.log('✅ Password reset email sent:', response);
      return { success: true, response };
    } catch (error) {
      console.error('❌ Password reset email failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Test email configuration (use sparingly - counts toward your limit!)
  async testEmailConfiguration(testEmail, testType = 'verification') {
    if (testType === 'verification') {
      const testCode = this.generateVerificationCode();
      return await this.sendVerificationCode(testEmail, testCode, 'Test User');
    } else if (testType === 'reset') {
      const testCode = this.generateResetCode();
      return await this.sendPasswordResetCode(testEmail, testCode, 'Test User');
    }
  }

  // Generate random 6-digit verification code
  generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Generate random 5-digit reset code
  generateResetCode() {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  // Get remaining email quota info (for display purposes)
  getQuotaInfo() {
    return {
      plan: 'Free',
      limit: 200,
      note: 'Limited to 200 emails per month'
    };
  }
}

export default new EmailService();
