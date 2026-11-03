import nodemailer from 'nodemailer';
import pug from 'pug';
import { htmlToText } from 'html-to-text';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const urlPath = fileURLToPath(import.meta.url);
const __dirname = dirname(urlPath);

export default class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Satyam Pandey <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    //send the actual email
    // 1) render the html based on a pug template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      },
    );
    // 2) define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    if (process.env.NODE_ENV === 'production') {
      if (!process.env.BREVO_API_KEY) throw new Error('BREVO_API_KEY is not configured');
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: { name: 'Satyam Pandey', email: process.env.EMAIL_FROM },
          to: [{ email: this.to }],
          subject,
          htmlContent: html,
          textContent: mailOptions.text,
        }),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) {
        // Do not log API responses that might contain personal data or credentials.
        throw new Error(`Brevo email request failed (HTTP ${response.status})`);
      }
    } else {
      await this.newTransport().sendMail(mailOptions);
    }
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Raahsta family!');
  }

  async sendPasswordRest() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid only for 10 minutes)',
    );
  }
}
