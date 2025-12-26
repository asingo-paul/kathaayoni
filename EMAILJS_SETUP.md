# 📧 EmailJS Setup Guide for Kathaayoni Academy

This guide will help you set up EmailJS to make the contact form work with your Gmail SMTP configuration.

## 🚀 Quick Setup Steps

### 1. **Create EmailJS Account**
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. **Add Email Service (Gmail)**
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Select **Gmail**
4. Click **Connect Account** and authorize with your Gmail account (`practicheck@gmail.com`)
5. Name your service (e.g., "kathaayoni-gmail")
6. Copy the **Service ID** (you'll need this later)

### 3. **Create Email Template**
1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Use this template content:

```html
Subject: New Contact Form Submission - {{inquiry_type}}

From: {{from_name}} <{{from_email}}>
Phone: {{phone}}
Inquiry Type: {{inquiry_type}}
Newsletter Subscription: {{newsletter}}

Message:
{{message}}

---
Submitted on: {{timestamp}}
Reply to: {{reply_to}}

This message was sent from the Kathaayoni Academy website contact form.
```

4. Set template variables:
   - `from_name` - Sender's name
   - `from_email` - Sender's email
   - `phone` - Phone number
   - `inquiry_type` - Type of inquiry
   - `message` - Message content
   - `newsletter` - Newsletter subscription
   - `timestamp` - Submission time
   - `reply_to` - Reply email

5. Save and copy the **Template ID**

### 4. **Get Public Key**
1. Go to **Account** → **General**
2. Copy your **Public Key**

### 5. **Update Website Code**

Replace the placeholders in `script.js`:

```javascript
// Replace these with your actual EmailJS credentials
emailjs.init('YOUR_PUBLIC_KEY');           // Your EmailJS Public Key

const response = await emailjs.send(
    'YOUR_SERVICE_ID',    // Your Gmail Service ID
    'YOUR_TEMPLATE_ID',   // Your Template ID
    templateParams
);
```

### 6. **Test the Contact Form**
1. Open your website
2. Fill out the contact form
3. Submit and check your Gmail inbox
4. Verify the email is received correctly

## 🔧 Advanced Configuration

### **Custom Email Template (HTML)**
For a more professional email, use this HTML template:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #DC143C, #0066FF); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .info-row { margin: 10px 0; }
        .label { font-weight: bold; color: #DC143C; }
        .message-box { background: #f9f9f9; padding: 15px; border-left: 4px solid #0066FF; margin: 15px 0; }
        .footer { background: #f0f2f5; padding: 15px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <h2>🎓 New Inquiry - Kathaayoni Academy</h2>
    </div>
    
    <div class="content">
        <div class="info-row">
            <span class="label">Name:</span> {{from_name}}
        </div>
        <div class="info-row">
            <span class="label">Email:</span> {{from_email}}
        </div>
        <div class="info-row">
            <span class="label">Phone:</span> {{phone}}
        </div>
        <div class="info-row">
            <span class="label">Inquiry Type:</span> {{inquiry_type}}
        </div>
        <div class="info-row">
            <span class="label">Newsletter:</span> {{newsletter}}
        </div>
        
        <div class="message-box">
            <div class="label">Message:</div>
            <p>{{message}}</p>
        </div>
    </div>
    
    <div class="footer">
        <p>Submitted on {{timestamp}} via Kathaayoni Academy website</p>
        <p>📧 Reply to: {{reply_to}}</p>
    </div>
</body>
</html>
```

### **Auto-Reply Template**
Create a second template for auto-replies to visitors:

```html
Subject: Thank you for contacting Kathaayoni Academy

Dear {{from_name}},

Thank you for your inquiry about {{inquiry_type}}. We have received your message and will respond within 24 hours during business days.

Your inquiry details:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}
- Inquiry Type: {{inquiry_type}}

If you have urgent questions, please call us at +254 123 456 789.

Best regards,
Kathaayoni Academy Team

---
This is an automated response. Please do not reply to this email.
Visit our website: https://yourusername.github.io/kathaayoni
```

## 🔒 Security Best Practices

### **EmailJS Security Settings**
1. In EmailJS dashboard, go to **Security**
2. Add your website domain to **Allowed Origins**:
   - `https://yourusername.github.io`
   - `http://localhost:3000` (for development)
3. Enable **Template Guard** to prevent template tampering
4. Set **Rate Limiting** to prevent spam (e.g., 10 emails per hour per IP)

### **Environment Variables (Optional)**
For additional security, you can use environment variables:

```javascript
// In your script.js, you can check for environment
const EMAILJS_CONFIG = {
    publicKey: process.env.EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
    serviceId: process.env.EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
    templateId: process.env.EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
};
```

## 📊 Monitoring & Analytics

### **EmailJS Dashboard**
Monitor your email sending in the EmailJS dashboard:
- **Usage Statistics** - Track email volume
- **Error Logs** - Debug failed sends
- **Rate Limits** - Monitor usage limits

### **Google Analytics Integration**
Track form submissions in Google Analytics:

```javascript
// Add this to your form success handler
if (typeof gtag !== 'undefined') {
    gtag('event', 'form_submit', {
        event_category: 'Contact',
        event_label: formData.inquiry_type || 'General',
        value: 1
    });
}
```

## 🚨 Troubleshooting

### **Common Issues**

#### **Emails Not Sending**
1. Check EmailJS dashboard for error logs
2. Verify Service ID and Template ID are correct
3. Ensure Gmail account is properly connected
4. Check browser console for JavaScript errors

#### **Emails Going to Spam**
1. Add your domain to Gmail's trusted senders
2. Use a professional email template
3. Avoid spam trigger words in subject/content
4. Set up SPF/DKIM records (advanced)

#### **Rate Limit Exceeded**
1. Check EmailJS usage in dashboard
2. Upgrade to paid plan if needed
3. Implement client-side rate limiting
4. Add CAPTCHA for additional protection

### **Testing Checklist**
- [ ] EmailJS service connected to Gmail
- [ ] Template created with all variables
- [ ] Public key, Service ID, and Template ID updated in code
- [ ] Website domain added to allowed origins
- [ ] Test email sent successfully
- [ ] Email received in correct inbox
- [ ] Auto-reply working (if configured)
- [ ] Form validation working properly
- [ ] Loading states and error handling working

## 📞 Support

### **EmailJS Support**
- **Documentation:** [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- **Support:** [https://www.emailjs.com/support/](https://www.emailjs.com/support/)

### **Gmail SMTP Settings** (Reference)
Your current configuration from `.env`:
- **Host:** smtp.gmail.com
- **Port:** 587
- **TLS:** Enabled
- **Username:** practicheck@gmail.com
- **Password:** vcdmzgporwclfryq (App Password)

## 🎉 Success!

Once configured, your contact form will:
- ✅ Send emails directly to `info@kathaayoniacademy.edu`
- ✅ Include all form data in a professional format
- ✅ Provide real-time validation and feedback
- ✅ Work without any server-side code
- ✅ Be secure and spam-protected
- ✅ Track submissions for analytics

Your Kathaayoni Academy website now has a fully functional contact system! 📧🎓