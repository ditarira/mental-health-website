import emailjs from '@emailjs/browser';

class EmailService {
  constructor() {
    // EmailJS Configuration (from Login.js)
    this.serviceId = 'service_124ityi';
    this.publicKey = 'oFTP-7JkGYa9jCIZK';
    
    // Template IDs
    this.templates = {
      verification: 'template_g324dl9',  // For registration verification
      passwordReset: 'template_obyjj06'
    };
  }

  // Generate 6-digit verification code
  generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Send verification code for registration
  async sendVerificationCode(email, code, userName) {
    try {
      console.log('📧 Sending verification code to:', email);
      
      const templateParams = {
        to_email: email,           // To match your template
        user_name: userName,       // User's name
        verification_code: code,   // 6-digit code
        email: email              // Backup field
      };

      console.log('📧 Template params:', templateParams);

      const result = await emailjs.send(
        this.serviceId,
        this.templates.verification,
        templateParams,
        this.publicKey
      );

      console.log('✅ Verification email sent successfully:', result);
      return { success: true, result };

    } catch (error) {
      console.error('❌ Email send failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Send welcome email after successful registration
  async sendWelcomeEmail(email, firstName) {
    try {
      console.log('📧 Sending welcome email to:', email);

      const templateParams = {
        to_email: email,
        user_name: firstName,
        email: email
      };

      const result = await emailjs.send(
        this.serviceId,
        this.templates.welcome,
        templateParams,
        this.publicKey
      );

      console.log('✅ Welcome email sent successfully:', result);
      return { success: true, result };

    } catch (error) {
      console.error('❌ Welcome email failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Send password reset code (used in Login.js)
  async sendPasswordResetCode(email, code, userName = 'User') {
    try {
      console.log('📧 Sending password reset code to:', email);

      const templateParams = {
        to_email: email,
        to_name: userName,
        code: code,
        email: email
      };

      const result = await emailjs.send(
        this.serviceId,
        this.templates.passwordReset,
        templateParams,
        this.publicKey
      );

      console.log('✅ Password reset email sent successfully:', result);
      return { success: true, result };

    } catch (error) {
      console.error('❌ Password reset email failed:', error);
      return { success: false, error: error.message };
    }
  }
}

// Export singleton instance
export default new EmailService();