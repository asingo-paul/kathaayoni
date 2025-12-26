# 📧 EmailJS Templates for Kathaayoni Academy

## 🎯 Template Setup Guide

### **Step 1: Create Main Contact Template**
1. Go to EmailJS Dashboard → **Email Templates**
2. Click **Create New Template**
3. Name it: `Kathaayoni Contact Form`
4. Copy the template below

### **Step 2: Create Auto-Reply Template**
1. Create another template
2. Name it: `Kathaayoni Auto Reply`
3. Copy the auto-reply template below

---

## 📨 **Main Contact Form Template**

### **Template Settings:**
- **Template Name:** `Kathaayoni Contact Form`
- **From Name:** `{{from_name}}`
- **From Email:** `{{from_email}}`
- **To Email:** `info@kathaayoniacademy.edu` (or your school email)
- **Reply To:** `{{reply_to}}`

### **Subject Line:**
```
🎓 New {{inquiry_type}} Inquiry from {{from_name}} - Kathaayoni Academy
```

### **Email Content (HTML):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #DC143C, #0066FF);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .header p {
            margin: 5px 0 0 0;
            opacity: 0.9;
        }
        .content {
            padding: 30px 20px;
        }
        .info-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #0066FF;
        }
        .info-row {
            display: flex;
            margin: 12px 0;
            align-items: flex-start;
        }
        .label {
            font-weight: bold;
            color: #DC143C;
            min-width: 120px;
            margin-right: 10px;
        }
        .value {
            flex: 1;
            word-break: break-word;
        }
        .message-box {
            background: #e8f4fd;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #0066FF;
        }
        .message-box h3 {
            margin: 0 0 15px 0;
            color: #0066FF;
        }
        .message-content {
            white-space: pre-wrap;
            line-height: 1.6;
        }
        .priority-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
        }
        .priority-high { background: #ffebee; color: #c62828; }
        .priority-medium { background: #fff3e0; color: #ef6c00; }
        .priority-low { background: #e8f5e8; color: #2e7d32; }
        .footer {
            background: #f0f2f5;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #eee;
        }
        .action-buttons {
            text-align: center;
            margin: 25px 0;
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            margin: 0 10px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            text-align: center;
        }
        .btn-primary {
            background: #0066FF;
            color: white;
        }
        .btn-secondary {
            background: #DC143C;
            color: white;
        }
        .stats {
            display: flex;
            justify-content: space-around;
            margin: 20px 0;
            text-align: center;
        }
        .stat-item {
            flex: 1;
        }
        .stat-number {
            font-size: 18px;
            font-weight: bold;
            color: #0066FF;
        }
        .stat-label {
            font-size: 12px;
            color: #666;
            text-transform: uppercase;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>🎓 New Inquiry Received</h1>
            <p>Kathaayoni Academy Contact Form</p>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Priority Badge -->
            <div style="margin-bottom: 20px;">
                <span class="priority-badge priority-{{priority_level}}">
                    {{inquiry_type}} Inquiry
                </span>
            </div>

            <!-- Contact Information -->
            <div class="info-section">
                <h3 style="margin: 0 0 15px 0; color: #0066FF;">👤 Contact Information</h3>
                
                <div class="info-row">
                    <span class="label">Full Name:</span>
                    <span class="value">{{from_name}}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">Email Address:</span>
                    <span class="value">
                        <a href="mailto:{{from_email}}" style="color: #0066FF;">{{from_email}}</a>
                    </span>
                </div>
                
                <div class="info-row">
                    <span class="label">Phone Number:</span>
                    <span class="value">
                        {{#if phone}}
                            <a href="tel:{{phone}}" style="color: #0066FF;">{{phone}}</a>
                        {{else}}
                            Not provided
                        {{/if}}
                    </span>
                </div>
                
                <div class="info-row">
                    <span class="label">Inquiry Type:</span>
                    <span class="value">{{inquiry_type}}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">Newsletter:</span>
                    <span class="value">
                        {{#if newsletter_subscription}}
                            ✅ Yes, subscribed
                        {{else}}
                            ❌ No subscription
                        {{/if}}
                    </span>
                </div>
            </div>

            <!-- Message -->
            <div class="message-box">
                <h3>💬 Message Content</h3>
                <div class="message-content">{{message}}</div>
            </div>

            <!-- Quick Actions -->
            <div class="action-buttons">
                <a href="mailto:{{reply_to}}?subject=Re: Your inquiry about {{inquiry_type}}" class="btn btn-primary">
                    📧 Reply to {{from_name}}
                </a>
                <a href="tel:{{phone}}" class="btn btn-secondary">
                    📞 Call {{from_name}}
                </a>
            </div>

            <!-- Submission Stats -->
            <div class="stats">
                <div class="stat-item">
                    <div class="stat-number">{{submission_number}}</div>
                    <div class="stat-label">Inquiry #</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">{{response_time}}</div>
                    <div class="stat-label">Target Response</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">{{day_of_week}}</div>
                    <div class="stat-label">Day Received</div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>📅 Submitted:</strong> {{timestamp}}</p>
            <p><strong>🌐 Source:</strong> {{school_website}}</p>
            <p><strong>📧 Reply To:</strong> {{reply_to}}</p>
            <p><strong>🏫 School:</strong> {{school_name}}</p>
            <p><strong>📞 School Phone:</strong> {{school_phone}}</p>
            <hr style="margin: 15px 0; border: none; border-top: 1px solid #ddd;">
            <p style="font-size: 11px; color: #999;">
                This email was automatically generated from the {{school_name}} website contact form.
                <br>Please respond within {{response_time}} during business hours.
            </p>
        </div>
    </div>
</body>
</html>
```

---

## 🤖 **Auto-Reply Template**

### **Template Settings:**
- **Template Name:** `Kathaayoni Auto Reply`
- **From Name:** `Kathaayoni Academy`
- **From Email:** `info@kathaayoniacademy.edu`
- **To Email:** `{{user_email}}`
- **Reply To:** `info@kathaayoniacademy.edu`

### **Subject Line:**
```
✅ Thank you for contacting Kathaayoni Academy - We'll respond within {{response_time}}
```

### **Auto-Reply Content (HTML):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You - Kathaayoni Academy</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #FFD700, #0066FF);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .content {
            padding: 30px 20px;
        }
        .greeting {
            font-size: 18px;
            color: #0066FF;
            margin-bottom: 20px;
        }
        .summary-box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #FFD700;
        }
        .summary-box h3 {
            margin: 0 0 15px 0;
            color: #DC143C;
        }
        .info-row {
            display: flex;
            margin: 8px 0;
        }
        .label {
            font-weight: bold;
            min-width: 100px;
            color: #666;
        }
        .value {
            flex: 1;
        }
        .next-steps {
            background: #e8f4fd;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #0066FF;
        }
        .next-steps h3 {
            margin: 0 0 15px 0;
            color: #0066FF;
        }
        .next-steps ul {
            margin: 0;
            padding-left: 20px;
        }
        .next-steps li {
            margin: 8px 0;
        }
        .contact-info {
            background: #fff8dc;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #FFD700;
        }
        .contact-info h3 {
            margin: 0 0 15px 0;
            color: #DC143C;
        }
        .contact-method {
            display: flex;
            align-items: center;
            margin: 10px 0;
        }
        .contact-method i {
            width: 20px;
            margin-right: 10px;
            color: #0066FF;
        }
        .footer {
            background: #f0f2f5;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #eee;
        }
        .social-links {
            text-align: center;
            margin: 20px 0;
        }
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            padding: 8px 16px;
            background: #0066FF;
            color: white;
            text-decoration: none;
            border-radius: 20px;
            font-size: 12px;
        }
        .urgent-notice {
            background: #ffebee;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #DC143C;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>✅ Thank You, {{user_name}}!</h1>
            <p>Your inquiry has been received successfully</p>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Personal Greeting -->
            <div class="greeting">
                Dear {{user_name}},
            </div>

            <p>
                Thank you for your interest in <strong>Kathaayoni Academy</strong>! We have successfully received your 
                inquiry about <strong>{{inquiry_type}}</strong> and truly appreciate you taking the time to contact us.
            </p>

            <!-- Inquiry Summary -->
            <div class="summary-box">
                <h3>📋 Your Inquiry Summary</h3>
                
                <div class="info-row">
                    <span class="label">Name:</span>
                    <span class="value">{{user_name}}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">Email:</span>
                    <span class="value">{{user_email}}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">Phone:</span>
                    <span class="value">{{user_phone}}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">Inquiry Type:</span>
                    <span class="value">{{inquiry_type}}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">Submitted:</span>
                    <span class="value">{{timestamp}}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">Reference #:</span>
                    <span class="value">KA-{{submission_id}}</span>
                </div>
            </div>

            <!-- Next Steps -->
            <div class="next-steps">
                <h3>🚀 What Happens Next?</h3>
                <ul>
                    <li><strong>Response Time:</strong> We'll respond within <strong>{{response_time}}</strong> during business hours</li>
                    <li><strong>Personal Attention:</strong> A member of our admissions team will review your inquiry personally</li>
                    <li><strong>Detailed Information:</strong> We'll provide comprehensive answers to all your questions</li>
                    <li><strong>Next Steps:</strong> If interested, we'll guide you through our admission process</li>
                    {{#if newsletter_subscription}}
                    <li><strong>Newsletter:</strong> You'll receive our monthly newsletter with school updates</li>
                    {{/if}}
                </ul>
            </div>

            <!-- Urgent Inquiries -->
            {{#if is_urgent}}
            <div class="urgent-notice">
                <strong>🚨 Urgent Inquiry Detected</strong><br>
                For immediate assistance, please call us at <strong>{{school_phone}}</strong>
            </div>
            {{/if}}

            <!-- Contact Information -->
            <div class="contact-info">
                <h3>📞 Contact Information</h3>
                
                <div class="contact-method">
                    <span>📧</span>
                    <span><strong>Email:</strong> {{school_email}}</span>
                </div>
                
                <div class="contact-method">
                    <span>📞</span>
                    <span><strong>Phone:</strong> {{school_phone}}</span>
                </div>
                
                <div class="contact-method">
                    <span>📍</span>
                    <span><strong>Address:</strong> {{school_address}}</span>
                </div>
                
                <div class="contact-method">
                    <span>🌐</span>
                    <span><strong>Website:</strong> <a href="{{school_website}}" style="color: #0066FF;">{{school_website}}</a></span>
                </div>
                
                <div class="contact-method">
                    <span>🕒</span>
                    <span><strong>Office Hours:</strong> Monday - Friday, 8:00 AM - 5:00 PM</span>
                </div>
            </div>

            <!-- About Kathaayoni Academy -->
            <div style="margin: 25px 0;">
                <h3 style="color: #0066FF;">🎓 About Kathaayoni Academy</h3>
                <p>
                    Founded in {{school_founded}}, Kathaayoni Academy has been <strong>empowering minds and shaping futures</strong> 
                    for over {{years_of_excellence}} years. We provide quality education from Pre-Primary to Form 4, 
                    focusing on academic excellence, character development, and holistic growth.
                </p>
                
                <p><strong>Why Choose Kathaayoni Academy?</strong></p>
                <ul>
                    <li>✅ Experienced and qualified teachers</li>
                    <li>✅ Modern facilities and learning resources</li>
                    <li>✅ Small class sizes for personalized attention</li>
                    <li>✅ Strong academic track record</li>
                    <li>✅ Comprehensive extracurricular programs</li>
                    <li>✅ Safe and nurturing environment</li>
                </ul>
            </div>

            <!-- Social Media Links -->
            <div class="social-links">
                <a href="{{facebook_url}}">📘 Facebook</a>
                <a href="{{twitter_url}}">🐦 Twitter</a>
                <a href="{{instagram_url}}">📸 Instagram</a>
                <a href="{{linkedin_url}}">💼 LinkedIn</a>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>Kathaayoni Academy</strong> - Empowering Minds, Shaping Futures</p>
            <p>📧 {{school_email}} | 📞 {{school_phone}} | 🌐 {{school_website}}</p>
            <p>📍 {{school_address}}</p>
            <hr style="margin: 15px 0; border: none; border-top: 1px solid #ddd;">
            <p style="font-size: 11px; color: #999;">
                This is an automated response. Please do not reply to this email.<br>
                If you need immediate assistance, please call {{school_phone}} or visit our website.
            </p>
        </div>
    </div>
</body>
</html>
```

---

## 🔧 **Template Variables (Placeholders)**

### **Available Placeholders:**

#### **Contact Information**
- `{{from_name}}` - Sender's full name
- `{{user_name}}` - Same as from_name (for auto-reply)
- `{{from_email}}` - Sender's email address
- `{{user_email}}` - Same as from_email (for auto-reply)
- `{{phone}}` - Phone number (if provided)
- `{{user_phone}}` - Same as phone (for auto-reply)
- `{{reply_to}}` - Reply-to email address

#### **Inquiry Details**
- `{{inquiry_type}}` - Type of inquiry (Admission, Fees, etc.)
- `{{message}}` - The actual message content
- `{{newsletter}}` - Newsletter subscription (Yes/No)
- `{{newsletter_subscription}}` - Boolean for conditional display

#### **School Information**
- `{{school_name}}` - Kathaayoni Academy
- `{{school_email}}` - info@kathaayoniacademy.edu
- `{{school_phone}}` - +254 123 456 789
- `{{school_website}}` - Your website URL
- `{{school_address}}` - School physical address
- `{{school_founded}}` - 1985
- `{{years_of_excellence}}` - Calculated years

#### **Submission Details**
- `{{timestamp}}` - When the form was submitted
- `{{submission_id}}` - Unique submission ID
- `{{submission_number}}` - Sequential number
- `{{response_time}}` - "24 hours during business days"
- `{{day_of_week}}` - Day when submitted

#### **Social Media**
- `{{facebook_url}}` - Facebook page URL
- `{{twitter_url}}` - Twitter profile URL
- `{{instagram_url}}` - Instagram profile URL
- `{{linkedin_url}}` - LinkedIn page URL

#### **Conditional Variables**
- `{{#if newsletter_subscription}}...{{/if}}` - Show if subscribed
- `{{#if phone}}...{{else}}...{{/if}}` - Show if phone provided
- `{{#if is_urgent}}...{{/if}}` - Show for urgent inquiries

---

## 🎨 **Customization Tips**

### **1. Colors & Branding**
```css
/* Update these colors in the CSS */
.header { background: linear-gradient(135deg, #DC143C, #0066FF); }
.label { color: #DC143C; }
.info-section { border-left: 4px solid #0066FF; }
```

### **2. Add Your Logo**
```html
<!-- Add this to the header section -->
<img src="YOUR_LOGO_URL" alt="Kathaayoni Academy" style="max-width: 150px; margin-bottom: 10px;">
```

### **3. Custom Conditional Logic**
```html
<!-- Show different content based on inquiry type -->
{{#if inquiry_type === 'admission'}}
    <p>Thank you for your interest in joining Kathaayoni Academy!</p>
{{else}}
    <p>Thank you for contacting Kathaayoni Academy!</p>
{{/if}}
```

### **4. Priority Levels**
```javascript
// Add this to your email service
templateParams.priority_level = formData.inquiry_type === 'admission' ? 'high' : 'medium';
```

---

## 📋 **Setup Checklist**

- [ ] Copy main template to EmailJS
- [ ] Copy auto-reply template to EmailJS  
- [ ] Update template IDs in config.js
- [ ] Test both templates
- [ ] Customize colors and branding
- [ ] Add your school logo
- [ ] Update social media links
- [ ] Test conditional logic
- [ ] Verify all placeholders work

Your EmailJS templates are now ready for professional email communication! 🎓✨