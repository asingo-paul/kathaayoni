#!/usr/bin/env node

// Quick EmailJS Setup for Kathaayoni Academy
// Your credentials: Public Key: service_021j93m, Service ID: service_021j93m

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function setupEmailJS() {
    console.log('🎓 EmailJS Setup for Kathaayoni Academy\n');
    
    console.log('✅ Your EmailJS credentials detected:');
    console.log('   Public Key: service_021j93m');
    console.log('   Service ID: service_021j93m\n');
    
    console.log('📋 Now you need to create templates in EmailJS dashboard:\n');
    
    console.log('1. Go to https://dashboard.emailjs.com/admin');
    console.log('2. Navigate to Email Templates');
    console.log('3. Create TWO templates:\n');
    
    // Get template IDs
    const mainTemplateId = await question('Enter your MAIN template ID (for receiving emails): ');
    const autoReplyTemplateId = await question('Enter your AUTO-REPLY template ID (optional, press Enter to skip): ');
    
    // Update config.js
    const configPath = path.join(__dirname, 'config.js');
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    // Replace template IDs
    configContent = configContent.replace('YOUR_TEMPLATE_ID', mainTemplateId);
    
    if (autoReplyTemplateId) {
        configContent = configContent.replace('YOUR_AUTO_REPLY_TEMPLATE_ID', autoReplyTemplateId);
    }
    
    fs.writeFileSync(configPath, configContent);
    
    console.log('\n✅ Configuration updated successfully!\n');
    
    // Generate template files for easy copying
    generateTemplateFiles(mainTemplateId, autoReplyTemplateId);
    
    console.log('📧 Template files generated:');
    console.log('   - main-template.html (copy to your main template)');
    console.log('   - auto-reply-template.html (copy to your auto-reply template)\n');
    
    console.log('🚀 Next steps:');
    console.log('1. Copy the template content from the generated files');
    console.log('2. Paste into your EmailJS templates');
    console.log('3. Test your contact form');
    console.log('4. Deploy your website\n');
    
    console.log('📚 For detailed instructions, see email-templates.md');
}

function generateTemplateFiles(mainTemplateId, autoReplyTemplateId) {
    // Main template
    const mainTemplate = `
<!-- MAIN CONTACT TEMPLATE -->
<!-- Template ID: ${mainTemplateId} -->
<!-- Copy this entire content to your EmailJS main template -->

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
        }
        .label {
            font-weight: bold;
            color: #DC143C;
            min-width: 120px;
            margin-right: 10px;
        }
        .message-box {
            background: #e8f4fd;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #0066FF;
        }
        .footer {
            background: #f0f2f5;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎓 New Inquiry - Kathaayoni Academy</h1>
            <p>Contact Form Submission</p>
        </div>

        <div class="content">
            <div class="info-section">
                <h3>👤 Contact Information</h3>
                
                <div class="info-row">
                    <span class="label">Name:</span>
                    <span>{{from_name}}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">Email:</span>
                    <span><a href="mailto:{{from_email}}">{{from_email}}</a></span>
                </div>
                
                <div class="info-row">
                    <span class="label">Phone:</span>
                    <span>{{phone}}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">Inquiry Type:</span>
                    <span>{{inquiry_type}}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">Newsletter:</span>
                    <span>{{newsletter}}</span>
                </div>
            </div>

            <div class="message-box">
                <h3>💬 Message</h3>
                <p style="white-space: pre-wrap;">{{message}}</p>
            </div>

            <div style="text-align: center; margin: 25px 0;">
                <a href="mailto:{{reply_to}}?subject=Re: Your inquiry about {{inquiry_type}}" 
                   style="display: inline-block; padding: 12px 24px; background: #0066FF; color: white; text-decoration: none; border-radius: 6px;">
                    📧 Reply to {{from_name}}
                </a>
            </div>
        </div>

        <div class="footer">
            <p><strong>📅 Submitted:</strong> {{timestamp}}</p>
            <p><strong>🌐 Website:</strong> {{school_website}}</p>
            <p><strong>📧 Reply To:</strong> {{reply_to}}</p>
            <p><strong>🏫 School:</strong> {{school_name}}</p>
            <p><strong>📞 Phone:</strong> {{school_phone}}</p>
        </div>
    </div>
</body>
</html>
    `.trim();
    
    fs.writeFileSync('main-template.html', mainTemplate);
    
    // Auto-reply template (if provided)
    if (autoReplyTemplateId) {
        const autoReplyTemplate = `
<!-- AUTO-REPLY TEMPLATE -->
<!-- Template ID: ${autoReplyTemplateId} -->
<!-- Copy this entire content to your EmailJS auto-reply template -->

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
        .content {
            padding: 30px 20px;
        }
        .summary-box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #FFD700;
        }
        .next-steps {
            background: #e8f4fd;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #0066FF;
        }
        .contact-info {
            background: #fff8dc;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #FFD700;
        }
        .footer {
            background: #f0f2f5;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Thank You, {{user_name}}!</h1>
            <p>Your inquiry has been received successfully</p>
        </div>

        <div class="content">
            <div style="font-size: 18px; color: #0066FF; margin-bottom: 20px;">
                Dear {{user_name}},
            </div>

            <p>
                Thank you for your interest in <strong>Kathaayoni Academy</strong>! We have successfully received your 
                inquiry about <strong>{{inquiry_type}}</strong> and truly appreciate you taking the time to contact us.
            </p>

            <div class="summary-box">
                <h3>📋 Your Inquiry Summary</h3>
                <p><strong>Name:</strong> {{user_name}}</p>
                <p><strong>Email:</strong> {{user_email}}</p>
                <p><strong>Phone:</strong> {{user_phone}}</p>
                <p><strong>Inquiry Type:</strong> {{inquiry_type}}</p>
                <p><strong>Submitted:</strong> {{timestamp}}</p>
                <p><strong>Reference #:</strong> KA-{{submission_id}}</p>
            </div>

            <div class="next-steps">
                <h3>🚀 What Happens Next?</h3>
                <ul>
                    <li><strong>Response Time:</strong> We'll respond within <strong>{{response_time}}</strong></li>
                    <li><strong>Personal Attention:</strong> A member of our team will review your inquiry personally</li>
                    <li><strong>Detailed Information:</strong> We'll provide comprehensive answers to your questions</li>
                    <li><strong>Next Steps:</strong> If interested, we'll guide you through our process</li>
                </ul>
            </div>

            <div class="contact-info">
                <h3>📞 Contact Information</h3>
                <p><strong>📧 Email:</strong> {{school_email}}</p>
                <p><strong>📞 Phone:</strong> {{school_phone}}</p>
                <p><strong>🌐 Website:</strong> <a href="{{school_website}}">{{school_website}}</a></p>
                <p><strong>🕒 Office Hours:</strong> Monday - Friday, 8:00 AM - 5:00 PM</p>
            </div>

            <div style="margin: 25px 0;">
                <h3 style="color: #0066FF;">🎓 About Kathaayoni Academy</h3>
                <p>
                    Founded in {{school_founded}}, Kathaayoni Academy has been <strong>empowering minds and shaping futures</strong> 
                    for over {{years_of_excellence}} years. We provide quality education from Pre-Primary to Form 4.
                </p>
            </div>
        </div>

        <div class="footer">
            <p><strong>Kathaayoni Academy</strong> - Empowering Minds, Shaping Futures</p>
            <p>📧 {{school_email}} | 📞 {{school_phone}}</p>
            <p>🌐 {{school_website}}</p>
            <hr style="margin: 15px 0; border: none; border-top: 1px solid #ddd;">
            <p style="font-size: 11px; color: #999;">
                This is an automated response. Please do not reply to this email.<br>
                If you need immediate assistance, please call {{school_phone}}.
            </p>
        </div>
    </div>
</body>
</html>
        `.trim();
        
        fs.writeFileSync('auto-reply-template.html', autoReplyTemplate);
    }
}

async function main() {
    try {
        await setupEmailJS();
    } catch (error) {
        console.error('❌ Setup failed:', error.message);
    } finally {
        rl.close();
    }
}

if (require.main === module) {
    main();
}
`;

module.exports = { setupEmailJS };