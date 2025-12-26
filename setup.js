#!/usr/bin/env node

// Setup script for Kathaayoni Academy website
// This script helps configure EmailJS and other settings

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
    console.log('\n🚀 Setting up EmailJS for Kathaayoni Academy\n');
    
    console.log('Please visit https://www.emailjs.com/ and create an account if you haven\'t already.');
    console.log('Then follow these steps:\n');
    
    console.log('1. Add Gmail service in EmailJS dashboard');
    console.log('2. Create an email template');
    console.log('3. Get your Public Key from Account settings\n');
    
    const publicKey = await question('Enter your EmailJS Public Key: ');
    const serviceId = await question('Enter your EmailJS Service ID: ');
    const templateId = await question('Enter your EmailJS Template ID: ');
    const autoReplyTemplateId = await question('Enter your Auto-Reply Template ID (optional, press Enter to skip): ');
    
    // Update config.js
    const configPath = path.join(__dirname, 'config.js');
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    configContent = configContent.replace('YOUR_PUBLIC_KEY', publicKey);
    configContent = configContent.replace('YOUR_SERVICE_ID', serviceId);
    configContent = configContent.replace('YOUR_TEMPLATE_ID', templateId);
    
    if (autoReplyTemplateId) {
        configContent = configContent.replace('YOUR_AUTO_REPLY_TEMPLATE_ID', autoReplyTemplateId);
    }
    
    fs.writeFileSync(configPath, configContent);
    
    console.log('\n✅ EmailJS configuration updated in config.js');
}

async function setupSchoolInfo() {
    console.log('\n🏫 Setting up school information\n');
    
    const schoolName = await question('School name (default: Kathaayoni Academy): ') || 'Kathaayoni Academy';
    const schoolEmail = await question('School email (default: info@kathaayoniacademy.edu): ') || 'info@kathaayoniacademy.edu';
    const schoolPhone = await question('School phone (default: +254 123 456 789): ') || '+254 123 456 789';
    const schoolWebsite = await question('School website URL: ');
    
    // Update config.js
    const configPath = path.join(__dirname, 'config.js');
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    configContent = configContent.replace('Kathaayoni Academy', schoolName);
    configContent = configContent.replace('paulajnr287@gmail.com', schoolEmail);
    configContent = configContent.replace('+254 717473314', schoolPhone);
    
    if (schoolWebsite) {
        configContent = configContent.replace('https://yourusername.github.io/kathaayoni', schoolWebsite);
    }
    
    fs.writeFileSync(configPath, configContent);
    
    console.log('\n✅ School information updated in config.js');
}

async function setupGitHubPages() {
    console.log('\n🌐 Setting up GitHub Pages\n');
    
    const githubUsername = await question('Enter your GitHub username: ');
    const repositoryName = await question('Enter repository name (default: kathaayoni): ') || 'kathaayoni';
    
    const websiteUrl = `https://${githubUsername}.github.io/${repositoryName}`;
    
    // Update README.md
    const readmePath = path.join(__dirname, 'README.md');
    let readmeContent = fs.readFileSync(readmePath, 'utf8');
    
    readmeContent = readmeContent.replace(/yourusername/g, githubUsername);
    readmeContent = readmeContent.replace(/kathaayoni/g, repositoryName);
    
    fs.writeFileSync(readmePath, readmeContent);
    
    // Update package.json
    const packagePath = path.join(__dirname, 'package.json');
    let packageContent = fs.readFileSync(packagePath, 'utf8');
    
    packageContent = packageContent.replace(/asingo-paul/g, githubUsername);
    packageContent = packageContent.replace(/kathaayoni/g, repositoryName);
    
    fs.writeFileSync(packagePath, packageContent);
    
    // Update config.js
    const configPath = path.join(__dirname, 'config.js');
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    configContent = configContent.replace('https://asingo-paul.github.io/kathaayoni', websiteUrl);
    
    fs.writeFileSync(configPath, configContent);
    
    console.log(`\n✅ GitHub Pages configuration updated`);
    console.log(`📍 Your website will be available at: ${websiteUrl}`);
}

async function setupAnalytics() {
    console.log('\n📊 Setting up Google Analytics (optional)\n');
    
    const enableAnalytics = await question('Do you want to set up Google Analytics? (y/n): ');
    
    if (enableAnalytics.toLowerCase() === 'y') {
        const gaId = await question('Enter your Google Analytics Measurement ID (GA4): ');
        
        // Update config.js
        const configPath = path.join(__dirname, 'config.js');
        let configContent = fs.readFileSync(configPath, 'utf8');
        
        configContent = configContent.replace('GA_MEASUREMENT_ID', gaId);
        
        fs.writeFileSync(configPath, configContent);
        
        // Add GA script to HTML
        const htmlPath = path.join(__dirname, 'index.html');
        let htmlContent = fs.readFileSync(htmlPath, 'utf8');
        
        const gaScript = `
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
    </script>`;
        
        htmlContent = htmlContent.replace('</head>', `${gaScript}\n</head>`);
        fs.writeFileSync(htmlPath, htmlContent);
        
        console.log('\n✅ Google Analytics configured');
    }
}

async function generateEmailTemplate() {
    console.log('\n📧 Generating EmailJS template\n');
    
    const template = `
Subject: New Contact Form Submission - {{inquiry_type}}

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
        <h2>🎓 New Inquiry - {{school_name}}</h2>
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
        <p>Submitted on {{timestamp}} via {{school_name}} website</p>
        <p>📧 Reply to: {{reply_to}}</p>
        <p>📞 School Phone: {{school_phone}}</p>
    </div>
</body>
</html>
    `;
    
    fs.writeFileSync('emailjs-template.html', template.trim());
    console.log('✅ Email template saved to emailjs-template.html');
    console.log('📋 Copy this template content to your EmailJS template editor');
}

async function main() {
    console.log('🎓 Welcome to Kathaayoni Academy Website Setup!\n');
    
    try {
        await setupSchoolInfo();
        await setupGitHubPages();
        await setupEmailJS();
        await setupAnalytics();
        await generateEmailTemplate();
        
        console.log('\n🎉 Setup completed successfully!\n');
        console.log('Next steps:');
        console.log('1. 📧 Copy the email template from emailjs-template.html to EmailJS');
        console.log('2. 🚀 Commit and push your changes to GitHub');
        console.log('3. 🌐 Enable GitHub Pages in your repository settings');
        console.log('4. 🧪 Test the contact form on your live website\n');
        
        console.log('📚 For detailed instructions, see:');
        console.log('   - EMAILJS_SETUP.md for EmailJS configuration');
        console.log('   - DEPLOYMENT.md for deployment guide');
        console.log('   - README.md for general information\n');
        
    } catch (error) {
        console.error('❌ Setup failed:', error.message);
    } finally {
        rl.close();
    }
}

// Run setup if called directly
if (require.main === module) {
    main();
}

module.exports = { setupEmailJS, setupSchoolInfo, setupGitHubPages, setupAnalytics };