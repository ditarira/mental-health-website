import emailjs from 'emailjs-com';

class EmailService {
  constructor() {
    this.serviceId = 'service_wo991hq';
    this.publicKey = 'W42E2JtVKWVg1M3t-';
    
    emailjs.init(this.publicKey);
  }

  async sendVerificationCode(userEmail, verificationCode, userName) {
    const templateParams = {
      to_email: userEmail,
      to_name: userName,
      verification_code: verificationCode,
      app_name: 'MindfulMe',
      message: `Welcome to MindfulMe! Your verification code is: ${verificationCode}`,
      from_name: 'MindfulMe Team'
    };

    try {
      const response = await emailjs.send(
        this.serviceId,
        'template_verification',
        templateParams
      );
      
      return { success: true, response };
    } catch (error) {
      console.error('Email send failed:', error);
      return { success: false, error: error.message };
    }
  }

  async sendPasswordReset(userEmail, resetCode, userName) {
    const templateParams = {
      to_email: userEmail,
      to_name: userName,
      reset_code: resetCode,
      app_name: 'MindfulMe',
      message: `Your password reset code is: ${resetCode}. This code expires in 10 minutes.`,
      from_name: 'MindfulMe Team'
    };

    try {
      const response = await emailjs.send(
        this.serviceId,
        'template_password_reset',
        templateParams
      );
      
      return { success: true, response };
    } catch (error) {
      console.error('Password reset email failed:', error);
      return { success: false, error: error.message };
    }
  }

  async sendSettingsChangeNotification(userEmail, userName, changedSetting) {
    const templateParams = {
      to_email: userEmail,
      to_name: userName,
      app_name: 'MindfulMe',
      setting_changed: changedSetting,
      message: `Your ${changedSetting} settings have been updated successfully.`,
      from_name: 'MindfulMe Team'
    };

    try {
      const response = await emailjs.send(
        this.serviceId,
        'template_settings_change',
        templateParams
      );
      
      return { success: true, response };
    } catch (error) {
      console.error('Settings change email failed:', error);
      return { success: false, error: error.message };
    }
  }

  generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}

export default new EmailService();
