/**
 * Google Apps Script for Toonifyit Contact Form
 * 
 * Setup Instructions:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code
 * 4. Deploy as Web App:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the deployment URL and paste it in contact.js
 * 
 * Features:
 * - Sends email to admin (you)
 * - Sends confirmation email to user
 * - Stores submission in Google Sheet
 */

// CONFIGURATION
const ADMIN_EMAIL = 'toonifyit.now@gmail.com'; // Your email
const SHEET_NAME = 'Contact Submissions'; // Name of sheet to store data
const ADMIN_EMAIL_SUBJECT = 'New Contact Form Submission - Toonifyit';
const USER_EMAIL_SUBJECT = 'Thank you for contacting Toonifyit';

/**
 * Handle POST request from contact form
 */
function doPost(e) {
  try {
    // Parse form data
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return createResponse(false, 'Missing required fields');
    }
    
    // Get or create sheet
    const sheet = getOrCreateSheet();
    
    // Add submission to sheet
    addSubmissionToSheet(sheet, data);
    
    // Send email to admin
    sendAdminEmail(data);
    
    // Send confirmation email to user
    sendUserEmail(data);
    
    return createResponse(true, 'Form submitted successfully');
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return createResponse(false, 'Server error: ' + error.toString());
  }
}

/**
 * Get or create the submissions sheet
 */
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    
    // Add headers
    const headers = ['Timestamp', 'Name', 'Email', 'Subject', 'Message', 'Status'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    
    // Set column widths
    sheet.setColumnWidth(1, 150); // Timestamp
    sheet.setColumnWidth(2, 150); // Name
    sheet.setColumnWidth(3, 200); // Email
    sheet.setColumnWidth(4, 250); // Subject
    sheet.setColumnWidth(5, 400); // Message
    sheet.setColumnWidth(6, 100); // Status
  }
  
  return sheet;
}

/**
 * Add submission to Google Sheet
 */
function addSubmissionToSheet(sheet, data) {
  const timestamp = new Date();
  const row = [
    timestamp,
    data.name,
    data.email,
    data.subject,
    data.message,
    'New'
  ];
  
  sheet.appendRow(row);
}

/**
 * Send email notification to admin
 */
function sendAdminEmail(data) {
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #007bff; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">New Contact Form Submission</h1>
      </div>
      
      <div style="padding: 30px; background: #f5f5f5;">
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-top: 0;">Contact Details</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                <a href="mailto:${data.email}" style="color: #007bff;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Subject:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.subject}</td>
            </tr>
          </table>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px;">
          <h2 style="color: #333; margin-top: 0;">Message</h2>
          <p style="line-height: 1.6; color: #555; white-space: pre-wrap;">${data.message}</p>
        </div>
      </div>
      
      <div style="background: #333; color: white; padding: 20px; text-align: center;">
        <p style="margin: 0; font-size: 12px;">
          This email was sent from your Toonifyit contact form.
          <br>
          Timestamp: ${new Date().toLocaleString()}
        </p>
      </div>
    </div>
  `;
  
  const plainBody = `
New Contact Form Submission

From: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
Timestamp: ${new Date().toLocaleString()}
  `;
  
  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: ADMIN_EMAIL_SUBJECT,
    body: plainBody,
    htmlBody: htmlBody,
    replyTo: data.email
  });
}

/**
 * Send confirmation email to user
 */
function sendUserEmail(data) {
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #007bff; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">Thank You for Contacting Us!</h1>
      </div>
      
      <div style="padding: 30px; background: #f5f5f5;">
        <div style="background: white; padding: 20px; border-radius: 8px;">
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Hi ${data.name},
          </p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Thank you for reaching out to Toonifyit! We've received your message and will get back to you within 24-48 hours.
          </p>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              <strong>Your submission:</strong>
            </p>
            <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">
              <strong>Subject:</strong> ${data.subject}
            </p>
            <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">
              <strong>Message:</strong><br>
              <span style="white-space: pre-wrap;">${data.message}</span>
            </p>
          </div>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            In the meantime, feel free to explore our 
            <a href="https://toonifyit.com/" style="color: #007bff; text-decoration: none;">JSON to TOON converter</a> 
            or read our 
            <a href="https://toonifyit.com/blogs.html" style="color: #007bff; text-decoration: none;">blog articles</a>.
          </p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Best regards,<br>
            <strong>The Toonifyit Team</strong>
          </p>
        </div>
      </div>
      
      <div style="background: #333; color: white; padding: 20px; text-align: center;">
        <p style="margin: 0; font-size: 12px;">
          This is an automated confirmation email from 
          <a href="https://toonifyit.com" style="color: #007bff; text-decoration: none;">toonifyit.com</a>
        </p>
        <p style="margin: 10px 0 0 0; font-size: 12px;">
          © ${new Date().getFullYear()} Toonifyit. All rights reserved.
        </p>
      </div>
    </div>
  `;
  
  const plainBody = `
Hi ${data.name},

Thank you for reaching out to Toonifyit! We've received your message and will get back to you within 24-48 hours.

Your submission:
Subject: ${data.subject}

Message:
${data.message}

In the meantime, feel free to explore our JSON to TOON converter at https://toonifyit.com/

Best regards,
The Toonifyit Team

---
This is an automated confirmation email from toonifyit.com
© ${new Date().getFullYear()} Toonifyit. All rights reserved.
  `;
  
  MailApp.sendEmail({
    to: data.email,
    subject: USER_EMAIL_SUBJECT,
    body: plainBody,
    htmlBody: htmlBody,
    replyTo: ADMIN_EMAIL
  });
}

/**
 * Create JSON response
 */
function createResponse(success, message) {
  return ContentService
    .createTextOutput(JSON.stringify({ success, message }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle GET request (for testing)
 */
function doGet() {
  return ContentService
    .createTextOutput('Toonifyit Contact Form API is running')
    .setMimeType(ContentService.MimeType.TEXT);
}
