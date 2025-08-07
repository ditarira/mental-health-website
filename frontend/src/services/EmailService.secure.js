import emailjs from 'emailjs-com';

class EmailService {
  constructor() {
    // Use environment variables for better security (optional)
    this.serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_wo991hq';
    this.publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'W42E2JtVKWVg1M3t-';
    
    // Initialize EmailJS
    emailjs.init(this.publicKey);
    
    console.log('✅ EmailJS initialized with Service ID:', this.serviceId);
  }

  // Send verification code for registration
  async sendVerificationCode(userEmail, verificationCode, userName) {
    const templateParams = {
      to_email: userEmail,
      to_name: userName,
      verification_code: verificationCode,
      app_name: 'MindfulMe',
      message: Welcome to MindfulMe! Your verification code is: ,
      from_name: 'MindfulMe Team'
    };

    try {
      console.log('📧 Sending verification email to:', userEmail);
      
      const response = await emailjs.send(
        this.serviceId,
        'template_verification',
        templateParams
      );
      
      console.log('✅ Verification email sent successfully:', response);
      return { success: true, response };
    } catch (error) {
      console.error('❌ Email send failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Send password reset code
  async sendPasswordReset(userEmail, resetCode, userName) {
    const templateParams = {
      to_email: userEmail,
      to_name: userName,
      reset_code: resetCode,
      app_name: 'MindfulMe',
      message: Your password reset code is: . This code expires in 10 minutes.,
      from_name: 'MindfulMe Team'
    };

    try {
      console.log('🔑 Sending password reset email to:', userEmail);
      
      const response = await emailjs.send(
        this.serviceId,
        'template_password_reset',
        templateParams
      );
      
      console.log('✅ Password reset email sent successfully:', response);
      return { success: true, response };
    } catch (error) {
      console.error('❌ Password reset email failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Send settings change notification
  async sendSettingsChangeNotification(userEmail, userName, changedSetting) {
    const templateParams = {
      to_email: userEmail,
      to_name: userName,
      app_name: 'MindfulMe',
      setting_changed: changedSetting,
      message: Your  settings have been updated successfully.,
      from_name: 'MindfulMe Team'
    };

    try {
      console.log('⚙️ Sending settings change notification to:', userEmail);
      
      const response = await emailjs.send(
        this.serviceId,
        'template_settings_change',
        templateParams
      );
      
      console.log('✅ Settings change email sent successfully:', response);
      return { success: true, response };
    } catch (error) {
      console.error('❌ Settings change email failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Generate random verification code
  generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}

export default new EmailService();
