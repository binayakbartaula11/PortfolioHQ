# Portfolio Setup & Deployment Guide 📋

This document provides comprehensive instructions for setting up, configuring, and deploying the portfolio website.

## 🚀 Getting Started

Follow these steps to set up and run the portfolio locally or deploy it for the world to see:

### 1. Clone the Repository
```bash
git clone https://github.com/binayakbartaula11/PortfolioHQ.git
```

### 2. Navigate to the Project Directory
```bash
cd PortfolioHQ
```

### 3. Configure EmailJS Securely

> **⚠️ SECURITY WARNING:** Never expose your EmailJS Service ID, Template ID, or Private Key in frontend code. These credentials can be misused to send unauthorized emails on your behalf, potentially leading to spam, quota exhaustion, and reputation damage.

#### Secure Implementation Options:

##### Option 1: Backend Server (Recommended)
- Create a backend API endpoint (Node.js, Django, etc.) that securely stores your EmailJS credentials
- Your frontend sends email requests to this backend, which then forwards them to EmailJS
- Example backend endpoint (Node.js/Express):
  ```javascript
  // Backend server code (NEVER expose this in frontend)
  const express = require('express');
  const emailjs = require('@emailjs/nodejs');
  const app = express();
  
  app.post('/api/send-email', async (req, res) => {
    try {
      const { name, email, message } = req.body;
      
      // EmailJS credentials stored securely on server
      const result = await emailjs.send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        { name, email, message },
        { publicKey: process.env.EMAILJS_PUBLIC_KEY, privateKey: process.env.EMAILJS_PRIVATE_KEY }
      );
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send email' });
    }
  });
  ```

##### Option 2: Serverless Function
- Use Vercel Functions, Netlify Functions, or Firebase Cloud Functions
- Store credentials as environment variables in your serverless platform
- Example (Vercel Function):
  ```javascript
  // api/send-email.js (Vercel Function)
  const emailjs = require('@emailjs/nodejs');
  
  export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
      const { name, email, message } = req.body;
      
      const result = await emailjs.send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        { name, email, message },
        { publicKey: process.env.EMAILJS_PUBLIC_KEY, privateKey: process.env.EMAILJS_PRIVATE_KEY }
      );
      
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send email' });
    }
  }
  ```

##### Option 3: If You Must Use Frontend (Not Recommended)
- Create an account at [EmailJS](https://www.emailjs.com/)
- In your EmailJS dashboard:
  - Set up domain restrictions to limit API usage to your domain only
  - Monitor usage for unusual activity
- Update the configuration in `js/config.js`:
  ```javascript
  const config = {
      emailjs: {
          // Only use the public key in frontend code
          PUBLIC_KEY: 'your_public_key'
      }
  };
  ```
- Modify the contact form submission to use only the public key:
  ```javascript
  // Frontend code
  emailjs.sendForm(
    'YOUR_SERVICE_ID', // This will be visible in source code
    'YOUR_TEMPLATE_ID', // This will be visible in source code
    formElement,
    config.emailjs.PUBLIC_KEY
  )
  ```

### 4. Run the Website Locally
- Open `index.html` in your browser, or:
  ```bash
  python -m http.server 8000
  # or
  npx serve
  ```

## 🌐 Comprehensive Deployment Guide

### Option A: GitHub Pages Deployment

#### 1. GitHub Pages Setup
- **Repository Organization:**
  - Place `index.html` at the root.
  - Organize assets into clearly labeled folders (e.g., `css`, `js`, `images`).
  - Include a README.md for documentation.
- **Enabling GitHub Pages:**
  - Go to your repository's Settings > Pages.
  - Set the source branch to `main` (or `master`).
  - Save settings to trigger the build.
  - GitHub will provide a URL like `username.github.io/repository-name`.

#### 2. Custom Domain Registration (.com.np)
- **Registration:**
  - Visit [register.com.np](https://register.com.np/).
  - Complete the registration, including identity verification (Nepali citizenship ID may be required).
  - Approval typically takes 24-48 hours.
- **Domain Management:**
  - After approval, access your domain control panel.
  - Note the nameservers provided for integration.

#### 3. Cloudflare DNS Integration
- **Account Setup:**
  - Create an account at [Cloudflare](https://www.cloudflare.com/).
  - Add your domain (e.g., binayakbartaula.com.np).
- **Nameserver and DNS Configuration:**
  - Replace default nameservers with Cloudflare's nameservers in your registrar panel.
  - Create A records pointing to GitHub Pages' IP addresses:
    ```
    185.199.108.153
    185.199.109.153
    185.199.110.153
    185.199.111.153
    ```
  - Create a CNAME record for the root domain pointing to `binayakbartaula.github.io`.
- **SSL/TLS:**
  - In Cloudflare's SSL/TLS settings, set encryption to "Full" or "Full (strict)".
  - Enable "Always Use HTTPS" and consider enabling HSTS.

#### 4. Connecting GitHub Pages with Your Custom Domain
- **Configure in GitHub:**
  - Under Settings > Pages, enter your custom domain (e.g., binayakbartaula.com.np).
  - Save settings to generate a CNAME file automatically.
  - Ensure "Enforce HTTPS" is selected for secure access.
- **Verification:**
  - Confirm the existence and content of the CNAME file in the repository.
  - Use tools like [whatsmydns.net](https://www.whatsmydns.net/) to verify DNS propagation.

### Option B: Netlify Deployment

#### 1. Netlify Setup
- **Create a Netlify Account:**
  - Sign up at [Netlify](https://www.netlify.com/) (free tier available).
  - You can use GitHub, GitLab, or email to create an account.

#### 2. Deploy Your Site
- **Method 1: Connect to Git Repository (Recommended):**
  - From Netlify dashboard, click "New site from Git".
  - Select your Git provider (GitHub, GitLab, or Bitbucket).
  - Authorize Netlify to access your repositories.
  - Select your portfolio repository.
  - Configure build settings (for static HTML, usually no build command is needed):
    - Build command: (leave blank for static HTML site)
    - Publish directory: (usually blank or "/" for root)
  - Click "Deploy site".
  
- **Method 2: Manual Deploy (Drag and Drop):**
  - From Netlify dashboard, go to the "Sites" section.
  - Drag and drop your entire project folder onto the designated area.
  - Netlify will automatically upload and deploy your site.

#### 3. Configure Environment Variables
- Navigate to Site settings > Build & deploy > Environment.
- Add your EmailJS credentials as environment variables:
  ```
  EMAILJS_SERVICE_ID=your_service_id
  EMAILJS_TEMPLATE_ID=your_template_id
  EMAILJS_PUBLIC_KEY=your_public_key
  EMAILJS_PRIVATE_KEY=your_private_key
  ```

#### 4. Set Up Netlify Functions (Optional, for EmailJS Backend Implementation)
- Create a `netlify.toml` file in your project root:
  ```toml
  [build]
    functions = "netlify/functions"
  ```
- Create a directory structure: `/netlify/functions/send-email.js`
- Implement your EmailJS function:
  ```javascript
  // netlify/functions/send-email.js
  const emailjs = require('@emailjs/nodejs');

  exports.handler = async function(event, context) {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }
    
    try {
      const payload = JSON.parse(event.body);
      const { name, email, message } = payload;
      
      const result = await emailjs.send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        { name, email, message },
        { publicKey: process.env.EMAILJS_PUBLIC_KEY, privateKey: process.env.EMAILJS_PRIVATE_KEY }
      );
      
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to send email' })
      };
    }
  };
  ```
- Install dependencies:
  ```bash
  npm init -y
  npm install @emailjs/nodejs
  ```
- Update your contact form JavaScript to use the Netlify function:
  ```javascript
  // Contact form submission
  document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        body: JSON.stringify({ name, email, message }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('Message sent successfully!');
        this.reset();
      } else {
        alert('Error sending message. Please try again.');
      }
    } catch (error) {
      alert('Error sending message. Please try again.');
      console.error(error);
    }
  });
  ```

#### 5. Custom Domain Setup
- **Add Your Custom Domain:**
  - Go to Site settings > Domain management > Add custom domain.
  - Enter your domain name (e.g., binayakbartaula.com.np).
  - Verify domain ownership through DNS configuration.

- **DNS Configuration:**
  - Option 1: Use Netlify DNS (Recommended for simplicity)
    - Update your domain's nameservers to Netlify's nameservers (provided during setup).
  - Option 2: Keep your current DNS provider (e.g., Cloudflare)
    - Add a CNAME record pointing to your Netlify site URL.
    - Example: `CNAME @ your-site-name.netlify.app`

- **SSL/HTTPS Setup:**
  - Netlify automatically provides SSL certificates through Let's Encrypt.
  - Enable "Force HTTPS" in site settings for secure connections.

### Option C: Vercel Deployment

#### 1. Vercel Setup
- **Create a Vercel Account:**
  - Sign up at [Vercel](https://vercel.com/) (free tier available).
  - You can use GitHub, GitLab, Bitbucket, or email to create an account.

#### 2. Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

#### 3. Deploy Your Site
- **Method 1: Connect to Git Repository (Recommended):**
  - From Vercel dashboard, click "New Project".
  - Import your Git repository.
  - Configure project settings:
    - Framework Preset: Other
    - Root Directory: ./
    - Build Command: (leave blank for static HTML site)
    - Output Directory: ./
  - Click "Deploy".

- **Method 2: Using Vercel CLI:**
  - Navigate to your project directory.
  - Run the command:
    ```bash
    vercel login
    vercel
    ```
  - Follow the prompts to configure your deployment.

#### 4. Configure Environment Variables
- In the Vercel dashboard, go to your project.
- Navigate to Settings > Environment Variables.
- Add your EmailJS credentials:
  ```
  EMAILJS_SERVICE_ID=your_service_id
  EMAILJS_TEMPLATE_ID=your_template_id
  EMAILJS_PUBLIC_KEY=your_public_key
  EMAILJS_PRIVATE_KEY=your_private_key
  ```

#### 5. Set Up API Routes (Optional, for EmailJS Backend Implementation)
- Create an `api` directory in your project root.
- Create a file `api/send-email.js`:
  ```javascript
  // api/send-email.js
  const emailjs = require('@emailjs/nodejs');

  export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
      const { name, email, message } = req.body;
      
      const result = await emailjs.send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        { name, email, message },
        { publicKey: process.env.EMAILJS_PUBLIC_KEY, privateKey: process.env.EMAILJS_PRIVATE_KEY }
      );
      
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to send email' });
    }
  }
  ```
- Install dependencies:
  ```bash
  npm init -y
  npm install @emailjs/nodejs
  ```
- Update your contact form JavaScript to use the API route:
  ```javascript
  // Contact form submission
  document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: JSON.stringify({ name, email, message }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('Message sent successfully!');
        this.reset();
      } else {
        alert('Error sending message. Please try again.');
      }
    } catch (error) {
      alert('Error sending message. Please try again.');
      console.error(error);
    }
  });
  ```

#### 6. Custom Domain Setup
- **Add Your Custom Domain:**
  - From your project in the Vercel dashboard, go to Settings > Domains.
  - Add your domain name (e.g., binayakbartaula.com.np).

- **DNS Configuration:**
  - Option 1: Use Vercel DNS (Simplest approach)
    - Update your domain's nameservers to Vercel's nameservers (provided during setup).
  - Option 2: Keep your current DNS provider (e.g., Cloudflare)
    - Add a CNAME record pointing to `cname.vercel-dns.com`.

- **SSL/HTTPS Setup:**
  - Vercel automatically provides SSL certificates.
  - HTTPS is enabled by default for all Vercel deployments.

### 5. Post-Deployment Optimization

#### Monitoring and Analytics
- **Cloudflare Analytics:** For real-time traffic and performance monitoring.
- **Google Analytics:** For deeper insights into user behavior.
- **Netlify Analytics/Vercel Analytics:** Platform-specific analytics if using these providers.

#### Performance Optimization
- **Cache Configuration:**
  - Configure caching headers for static assets.
  - Set up Cloudflare's cache rules if using Cloudflare.
  - Use `cache-control` headers for optimal browser caching.
  
- **Asset Optimization:**
  - Compress and optimize images with tools like [TinyPNG](https://tinypng.com/).
  - Minify CSS and JavaScript files.
  - Use modern image formats like WebP with fallbacks.

- **CDN Benefits:**
  - Both Netlify and Vercel provide global CDN distribution automatically.
  - Cloudflare provides additional edge caching if configured.

## 🔒 Advanced Security Measures

- **Environment Variable Management:** Prevents unauthorized access to sensitive data.
- **EmailJS Security:** 
  - **Backend Implementation:** EmailJS credentials are stored securely on a backend server or serverless function, never exposed in frontend code.
  - **Domain Restrictions:** API usage is restricted to specific domains to prevent abuse.
  - **Usage Monitoring:** Regular monitoring of email sending activity to detect unauthorized use.
- **XSS Mitigation & CSP:** Incorporates robust security policies to safeguard user data.
- **Secure Linking Practices:** All external links are verified to maintain a secure user experience.

## 🤝 Contributing

I welcome contributions and collaborations! To contribute:
1. **Fork the Repository**
2. **Create a Feature Branch:**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit Your Changes:**
   ```bash
   git commit -m 'Add an Amazing Feature'
   ```
4. **Push and Open a Pull Request:**
   ```bash
   git push origin feature/AmazingFeature
   ```
Your input and improvements are vital to the growth and evolution of this project.

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Deployment Issues
- **GitHub Pages Not Updating:**
  - Ensure your repository's content meets GitHub Pages' requirements
  - Check if there are any build errors in the Actions tab
  - Try triggering a new build by making a small change and committing

- **Netlify/Vercel Build Failures:**
  - Check build logs for specific error messages
  - Verify that your project structure matches the build configuration
  - Ensure all dependencies are properly declared if using build commands

#### DNS Configuration Problems
- **Custom Domain Not Working:**
  - Verify DNS propagation using [whatsmydns.net](https://www.whatsmydns.net/)
  - Ensure nameservers are correctly set at your domain registrar
  - Check that A records and CNAME are correctly configured
  - Wait up to 48 hours for DNS changes to fully propagate

#### EmailJS Integration
- **Contact Form Not Sending Emails:**
  - Check browser console for any JavaScript errors
  - Verify that your EmailJS credentials are correct
  - If using a backend implementation, check server logs for errors
  - Test API keys manually using the EmailJS test tools
  - Verify that environment variables are correctly set in your deployment platform

#### SSL/HTTPS Issues
- **SSL Certificate Not Working:**
  - For GitHub Pages: Ensure "Enforce HTTPS" is checked
  - For Netlify: Check SSL/TLS certificate settings
  - For Vercel: SSL should be automatic, but verify domain configuration
  - For Cloudflare: Verify SSL/TLS mode is set to "Full" or "Full (strict)"

### Support Resources
- GitHub Pages Documentation: [https://docs.github.com/en/pages](https://docs.github.com/en/pages)
- Netlify Support: [https://docs.netlify.com](https://docs.netlify.com)
- Vercel Documentation: [https://vercel.com/docs](https://vercel.com/docs)
- Cloudflare Support: [https://support.cloudflare.com](https://support.cloudflare.com)
- EmailJS Documentation: [https://www.emailjs.com/docs](https://www.emailjs.com/docs)
