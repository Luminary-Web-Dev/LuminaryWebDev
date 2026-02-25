# Luminary Restaurant - Netlify & Decap CMS Setup

## Project Update

I've integrated Decap CMS and configured the Netlify backend for the Luminary project. All CMS configuration files, content JSON files, and the dynamic content loader have been added. Since Maria previously attempted to launch the site on Netlify, she'll need to complete the deployment by enabling Netlify Identity and Git Gateway in the site dashboard (see steps below). Once configured, the client will have full access to edit all website content through the CMS admin panel.

## ⚠️ IMPORTANT: Do Not Launch on Netlify Until the Website Looks Exactly Like the Wireframe

Launching prematurely will waste the 300 free monthly build credits.

## Setup Instructions

### 1. Deploy to Netlify

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [Netlify](https://app.netlify.com) and sign up/login
3. Click "Add new site" → "Import an existing project"
4. Connect your Git repository
5. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: `.` (root)
6. Click "Deploy site"

### 2. Enable Netlify Identity

1. In your Netlify site dashboard, go to "Identity"
2. Click "Enable Identity"
3. Under "Registration preferences", select "Invite only"
4. Under "External providers", you can optionally enable Google/GitHub login
5. **⚠️ CRITICAL:** Go to "Settings and usage" → scroll to "Git Gateway" → click "Enable Git Gateway"
   - **Without Git Gateway enabled, the CMS cannot save changes!**

### 3. Invite Users

1. In the Identity tab, click "Invite users"
2. Enter the email address of your client
3. They will receive an invitation email to set up their account

### How to Add More Users to Manage Content

To give additional people access to edit content through the CMS:

1. Go to your Netlify site dashboard
2. Click on the "Identity" tab
3. Click "Invite users"
4. Enter the email address of the person you want to add
5. Click "Send"
6. They will receive an invitation email with a link to create their account
7. Once they accept and create a password, they can log in at `https://your-site-name.netlify.app/admin/`

Note: All invited users will have full editing access to all content sections.

### 4. Access the CMS

- Your client can access the CMS at: `https://your-site-name.netlify.app/admin/`
- They'll need to log in with their Netlify Identity credentials

## What Your Client Can Edit

### Homepage
- Hero section title and description
- Our Story paragraph and video
- Chef Philosophy paragraph and video

### About Page
- Our Story section (3 paragraphs, video, and image)
- Chef Philosophy section (3 paragraphs, video, and image)

### Events Page
- Private Dining section (3 paragraphs, image, and video)
- Event Hosting section (3 paragraphs, image, and video)

### Menu
- Appetizers (items, prices, descriptions, category image)
- Signature Plates (items, prices, descriptions, category image)
- Desserts (items, prices, descriptions, category image)
- Beverages (items, prices, descriptions, category image)
- Cocktails (items, prices, descriptions, category image)

## How to Edit Content

1. Go to `https://your-site-name.netlify.app/admin/`
2. Log in with Netlify Identity
3. Select the collection you want to edit (Homepage, About Page, Events Page, or Menu)
4. Click on the specific section to edit
5. Make your changes
6. Click "Save" (this creates a draft)
7. Click "Publish" → "Publish now" to make changes live

## Media Files

- Images and videos can be uploaded directly through the CMS
- They will be stored in the `/images` folder
- Supported formats: JPG, PNG, GIF, MP4, WebM

## How Content Works

### Current Content Preservation
- All existing content remains unchanged until edited through the CMS
- Content is stored in JSON files in the `/content` folder with the same text currently on the site
- The `cms-loader.js` file reads these JSON files and displays them on the website
- Original hardcoded HTML acts as a fallback if JSON files fail to load

### Content Flow
```
Client edits CMS → Updates JSON files → Git commit → Netlify deploys → Site updates
```

## Notes

- The 2-step reservation form and confirmation page are configured for Netlify Forms detection
- Form submissions will appear in your Netlify dashboard under "Forms"
- Changes are saved to your Git repository automatically
- Each publish creates a new commit
- The site will rebuild automatically after publishing changes
- Changes typically appear within 1-2 minutes
- Nothing changes on the live site until the client actively edits through the CMS
