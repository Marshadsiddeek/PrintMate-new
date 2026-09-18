PRINTMATE WEBSITE - QUICK SETUP

FILES
- index.html
- script.js
- assets/images/ (all supplied images)

HOW TO ADD A NEW PORTFOLIO IMAGE
1. Upload the image into assets/images/
2. Open script.js
3. Find PORTFOLIO_ITEMS near the top
4. Add a line like:
   { src: 'assets/images/my-new-job.jpg', title: 'My New Job', category: 'prints' },
5. Save and upload script.js

Available categories:
- business
- gifts
- signage
- prints

IMPORTANT ABOUT "UPLOAD FROM THE WEBSITE"
This is a static HTML/JS site. JavaScript alone cannot permanently save a new image
onto your hosting server after a browser upload. For a real admin upload panel, you
need a backend/CMS (for example Firebase, Supabase, WordPress, etc.).

NOTES
- Keep file/folder letter case exact on Linux hosting.
- This version uses assets/images/Logo.png (capital L) to match the supplied file.
- Tailwind CSS, Font Awesome and Google Fonts are loaded from CDNs, so internet
  access is required for those styles/icons/fonts.
