
import { emailJsConfig } from '../config';

// This is a global declaration for the EmailJS library loaded from CDN
declare var emailjs: any;

interface EmailParams {
  to_name: string;
  to_email: string;
  qr_code_image_url: string;
}

/**
 * Sends a confirmation email using EmailJS.
 * @param params The parameters for the email template.
 */
export const sendConfirmationEmail = async (params: EmailParams): Promise<void> => {
  try {
    // Wait for emailjs to be available (it loads from CDN)
    let attempts = 0;
    while (typeof window !== 'undefined' && !(window as any).emailjs && attempts < 50) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }

    // Check if emailjs is available
    if (typeof window === 'undefined' || !(window as any).emailjs) {
      throw new Error('EmailJS library not loaded. Please refresh the page.');
    }

    const emailjsLib = (window as any).emailjs;
    
    // Initialize with public key
    emailjsLib.init(emailJsConfig.publicKey);

    await emailjsLib.send(
      emailJsConfig.serviceID, 
      emailJsConfig.templateID, 
      params
    );
  } catch (error: any) {
    // Only log errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to send email:', error);
    }
    
    // Mejor mensaje de error
    let errorMessage = 'Email could not be sent.';
    if (error?.text) {
      errorMessage = error.text;
    } else if (error?.message) {
      errorMessage = error.message;
    }
    
    throw new Error(errorMessage);
  }
};
