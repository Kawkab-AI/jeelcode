# جيل كود | JeelCode Website

A high-performance, bilingual (Arabic-English) single-page website for JeelCode - A B2B Academy specializing in AI, programming, and future skills training.

## 🎨 Design Features

- **Bilingual Support**: Seamless Arabic (RTL) and English (LTR) language switching
- **Modern Design**: Based on JeelCode brand identity with navy blue, cyan, pink, and orange color scheme
- **Responsive Layout**: Optimized for mobile, tablet, and desktop devices
- **Performance Optimized**: Fast loading with lazy loading, minification, and best practices
- **Smooth Animations**: Professional transitions and scroll effects
- **Accessibility**: WCAG compliant with semantic HTML and ARIA labels

## 📁 Project Structure

```
jeelcode/
├── index.html          # Main HTML file with all sections
├── styles.css          # Complete CSS styling with responsive design
├── script.js           # Interactive JavaScript functionality
└── README.md           # Documentation (this file)
```

## 🚀 Quick Start

### Local Development

1. **Open the website**:
   - Simply open `index.html` in your web browser
   - Or use a local server for better performance:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js
     npx serve
     
     # Using PHP
     php -S localhost:8000
     ```

2. **View in browser**:
   - Navigate to `http://localhost:8000`

### Deployment

#### Option 1: Netlify (Recommended)

1. Create a free account at [Netlify](https://www.netlify.com)
2. Drag and drop your `jeelcode` folder into Netlify
3. Your site will be live in seconds!

#### Option 2: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in the project directory
3. Follow the prompts

#### Option 3: GitHub Pages

1. Create a GitHub repository
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```
3. Enable GitHub Pages in repository settings

#### Option 4: Traditional Hosting

Upload all files via FTP to your web hosting provider.

## 🎯 Key Features

### 1. Language Toggle
- Click the language button (top-left/right) to switch between Arabic and English
- Language preference is saved in browser localStorage
- Keyboard shortcut: `Alt + L`

### 2. Smooth Navigation
- Fixed header with smooth scroll to sections
- Active link highlighting based on scroll position
- Mobile-friendly hamburger menu

### 3. Contact Form
- Functional form with validation
- Success/error notifications
- Easy to integrate with backend API

### 4. Learning Tracks
- 8 different program tracks displayed in cards
- Each track has:
  - Custom icon with gradient background
  - Bilingual title and description
  - Call-to-action button

### 5. Statistics Counter
- Animated counters that trigger on scroll
- Shows impressive metrics (30,000+ students, 6,000+ projects, etc.)

## ⚡ Performance Optimizations

### Already Implemented:

1. **CSS Optimization**:
   - CSS variables for consistent theming
   - Mobile-first responsive design
   - Efficient selectors and reduced specificity
   - CSS animations using transforms for better performance

2. **JavaScript Optimization**:
   - Vanilla JavaScript (no heavy frameworks)
   - Event delegation where appropriate
   - Throttled scroll events using requestAnimationFrame
   - Intersection Observer for lazy loading and animations
   - LocalStorage for language preference

3. **HTML Optimization**:
   - Semantic HTML5 elements
   - Proper heading hierarchy
   - Accessible ARIA labels
   - Optimized meta tags for SEO

### Additional Optimizations (Optional):

1. **Image Optimization**:
   ```bash
   # Use tools like ImageOptim, TinyPNG, or Squoosh
   # Convert images to WebP format for better compression
   ```

2. **Minification**:
   ```bash
   # CSS Minification
   npx clean-css-cli -o styles.min.css styles.css
   
   # JavaScript Minification
   npx terser script.js -o script.min.js --compress --mangle
   
   # HTML Minification
   npx html-minifier --input-dir . --output-dir ./dist --collapse-whitespace --remove-comments
   ```

3. **Enable Gzip/Brotli Compression**:
   - Add to `.htaccess` (Apache):
     ```apache
     <IfModule mod_deflate.c>
       AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
     </IfModule>
     ```

4. **Add Service Worker** (Progressive Web App):
   ```javascript
   // Create sw.js for offline functionality
   if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('/sw.js');
   }
   ```

## 🎨 Color Palette

```css
Primary Navy:     #1a1f4d
Secondary Navy:   #1e2a5e
Cyan:            #00d4ff
Cyan Light:      #26e7ff
Pink:            #ff1654
Pink Light:      #ff2d6f
Orange:          #ffa726
Orange Light:    #ffb84d
Blue:            #5b72e8
White:           #ffffff
```

## 🔧 Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --color-primary: #1a1f4d;
    --color-cyan: #00d4ff;
    --color-pink: #ED893D;
    /* ... other colors */
}
```

### Adding New Tracks

1. Copy a track card in `index.html`
2. Update the content and icon
3. Choose an icon color class (orange, cyan, pink, or blue)

### Modifying Content

All content is bilingual using this structure:

```html
<span class="text-ar">النص العربي</span>
<span class="text-en">English Text</span>
```

## 📱 Browser Support

- Chrome/Edge: Latest 2 versions ✅
- Firefox: Latest 2 versions ✅
- Safari: Latest 2 versions ✅
- Mobile browsers: iOS Safari, Chrome Mobile ✅

## 🔍 SEO Checklist

- ✅ Meta descriptions in both languages
- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy (H1 → H2 → H3)
- ✅ Alt text for images
- ✅ Fast loading speed
- ✅ Mobile-responsive design
- ✅ HTTPS (when deployed)
- ⬜ Add `robots.txt`
- ⬜ Add `sitemap.xml`
- ⬜ Set up Google Analytics
- ⬜ Configure Open Graph tags

## 📞 Contact Integration

To connect the contact form to a backend:

1. **Using EmailJS** (Free):
   ```javascript
   // In script.js, replace the form submission with:
   emailjs.send("service_id", "template_id", formData)
   ```

2. **Using FormSpree**:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

3. **Custom API**:
   ```javascript
   // In script.js, update the fetch call:
   await fetch('https://your-api.com/contact', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(formData)
   });
   ```

## 🧪 Testing

1. **Lighthouse Audit**:
   - Open Chrome DevTools → Lighthouse
   - Run audit for Performance, Accessibility, SEO
   - Target: All scores above 90

2. **Responsive Testing**:
   - Test on multiple devices and screen sizes
   - Use browser DevTools device emulation

3. **Cross-browser Testing**:
   - Test on Chrome, Firefox, Safari, Edge
   - Check mobile browsers (iOS Safari, Chrome Mobile)

4. **Accessibility Testing**:
   - Use WAVE browser extension
   - Test keyboard navigation
   - Test with screen reader

## 📈 Performance Metrics (Target)

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Total Page Size: < 500KB (without images)
- Lighthouse Performance Score: > 90
- Lighthouse Accessibility Score: > 95

## 🆘 Troubleshooting

### Fonts not loading
- Check internet connection
- Verify Google Fonts CDN is accessible
- Consider self-hosting fonts for better performance

### Language toggle not working
- Clear browser localStorage
- Check browser console for JavaScript errors
- Ensure script.js is loaded correctly

### Animations not smooth
- Check if hardware acceleration is enabled in browser
- Disable animations for users with motion sensitivity
- Test on different devices

## 📄 License

© 2025 JeelCode. All rights reserved.

## 👥 Credits

- **Design**: Based on JeelCode brand guidelines
- **Fonts**: Tajawal, Cairo (Arabic) | Poppins (English)
- **Icons**: Material Design Icons (embedded as SVG)
- **Development**: High-performance vanilla JavaScript implementation

## 📧 Support

For questions or support, contact:
- Email: barmaja@jeelcode.com
- Website: jeelcode.com
- Instagram: @jeelc0de

---

**Built with ❤️ for the future generation of programmers and innovators.**
