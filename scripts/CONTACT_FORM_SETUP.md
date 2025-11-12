# Contact Form Integration Guide

## Overview
This guide explains how to set up the Google Apps Script backend for the Toonifyit contact form.

## Features
✅ Sends email notification to admin (you)
✅ Sends confirmation email to user
✅ Stores all submissions in Google Sheet
✅ Includes timestamp and status tracking
✅ Beautiful HTML email templates

---

## Setup Instructions

### Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Toonifyit Contact Form Submissions" (or any name you prefer)

### Step 2: Open Apps Script Editor
1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Copy the entire code from `/scripts/contact-form-script.gs`
4. Paste it into the Apps Script editor

### Step 3: Configure Settings
In the script, update the following constants if needed:

```javascript
const ADMIN_EMAIL = 'toonifyit.now@gmail.com'; // Your email
const SHEET_NAME = 'Contact Submissions'; // Sheet name
```

### Step 4: Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Select **Web app**
4. Fill in the settings:
   - **Description**: "Toonifyit Contact Form API"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. Review and authorize permissions:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Project Name] (unsafe)**
   - Click **Allow**
7. **Copy the Web App URL** (it will look like: `https://script.google.com/macros/s/[DEPLOYMENT_ID]/exec`)

### Step 5: Update Contact Form JavaScript
1. Open `/js/contact.js`
2. Find this line (around line 97):
   ```javascript
   const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_DEPLOYMENT_URL';
   ```
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_DEPLOYMENT_URL'` with your actual deployment URL:
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/[YOUR_DEPLOYMENT_ID]/exec';
   ```
4. Save the file

### Step 6: Test the Form
1. Visit your contact page: `https://toonifyit.com/contact.html`
2. Fill out the form with test data
3. Click "Send Message"
4. Verify:
   - ✅ You receive an email at `toonifyit.now@gmail.com`
   - ✅ Test user receives a confirmation email
   - ✅ Data appears in Google Sheet

---

## Google Sheet Structure

The script automatically creates a sheet with the following columns:

| Timestamp | Name | Email | Subject | Message | Status |
|-----------|------|-------|---------|---------|--------|
| 2025-01-20 10:30 AM | John Doe | john@example.com | Question about TOON | Hi, I have a question... | New |

### Column Descriptions:
- **Timestamp**: When the form was submitted
- **Name**: User's name
- **Email**: User's email address
- **Subject**: Email subject line
- **Message**: Full message content
- **Status**: "New" by default (you can manually update this to "Replied", "Resolved", etc.)

---

## Email Templates

### Admin Email (sent to you)
- **Subject**: "New Contact Form Submission - Toonifyit"
- **Content**: Formatted HTML with contact details and message
- **Reply-To**: User's email address (so you can reply directly)

### User Confirmation Email
- **Subject**: "Thank you for contacting Toonifyit"
- **Content**: Professional HTML template with:
  - Thank you message
  - Submission confirmation
  - Links to website resources
  - Expected response time (24-48 hours)

---

## Troubleshooting

### Issue: "Authorization required" error
**Solution**: Make sure you've authorized the script with your Google account (Step 4, point 6)

### Issue: Emails not being sent
**Solution**: 
1. Check Gmail's spam/junk folder
2. Verify `ADMIN_EMAIL` is correct in the script
3. Make sure the user entered a valid email address

### Issue: Data not appearing in sheet
**Solution**:
1. Check the sheet name matches `SHEET_NAME` in the script
2. Make sure the Google Sheet and Apps Script are in the same Google account
3. Check Apps Script execution logs: View → Logs

### Issue: Form submission timeout
**Solution**:
1. The script uses `mode: 'no-cors'` which is required for Google Apps Script
2. With no-cors, we can't read the response, so we assume success if no error is thrown
3. If you need response validation, consider using a different backend (Node.js/Express)

---

## Advanced Configuration

### Change Email Subjects
Edit these constants in the script:
```javascript
const ADMIN_EMAIL_SUBJECT = 'New Contact Form Submission - Toonifyit';
const USER_EMAIL_SUBJECT = 'Thank you for contacting Toonifyit';
```

### Customize Email Templates
The HTML email templates are in the `sendAdminEmail()` and `sendUserEmail()` functions. You can customize:
- Colors (change `#007bff` to your brand color)
- Text content
- Footer information

### Add Auto-Reply Rules
You can add logic to send different confirmation emails based on the subject:
```javascript
if (data.subject.toLowerCase().includes('urgent')) {
  // Send urgent email template
} else {
  // Send standard confirmation
}
```

---

## Security & Privacy

✅ **No data stored on frontend**: Form data is sent directly to Google
✅ **HTTPS encryption**: All data transmission is encrypted
✅ **Access control**: Only you can access the Google Sheet and Apps Script
✅ **Email validation**: Basic email format validation prevents spam
✅ **Rate limiting**: Google Apps Script has built-in rate limits

---

## Updating the Script

If you need to update the script after deployment:

1. Make changes in the Apps Script editor
2. Click **Deploy** → **Manage deployments**
3. Click the pencil icon ✏️ next to your active deployment
4. Click **Deploy**
5. The URL remains the same - no need to update contact.js

---

## Alternative Backend Options

If you prefer not to use Google Apps Script, you can integrate:
- **Formspree** (https://formspree.io)
- **EmailJS** (https://www.emailjs.com)
- **Netlify Forms** (if hosted on Netlify)
- **Custom Node.js API** (requires server hosting)

---

## Support

If you encounter issues:
1. Check the Apps Script execution logs: **View** → **Executions**
2. Verify all setup steps were completed
3. Test with a simple console.log() to ensure the script is being called

---

## License
This script is part of the Toonifyit project and is free to use and modify.
