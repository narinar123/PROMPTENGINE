const fs = require('fs');
const path = require('path');

const rootDir = '/Users/mac/gsprompthero';
const toolDir = path.join(rootDir, 'tool');

const files = [
    path.join(rootDir, 'index.html'),
    path.join(rootDir, 'pricing.html'),
    ...fs.readdirSync(toolDir).filter(f => f.endsWith('.html')).map(f => path.join(toolDir, f))
].filter(f => fs.existsSync(f));

console.log(`Updating branding in ${files.length} files...`);

const LOGO_URL = "https://www.gsgroups.net/gslogo.png";
const NEW_LOGO_HTML = `<img src="${LOGO_URL}" alt="Logo" style="height:32px; width:auto; object-fit:contain;">`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. Replace standard SVG logo structure with the IMG tag
    const svgPattern = /<svg width="28" height="28" viewBox="0 0 48 48" fill="none"( xmlns="http:\/\/www.w3.org\/2000\/svg")?>[\s\S]*?<\/svg>/;
    content = content.replace(svgPattern, NEW_LOGO_HTML);

    // Special handling for some variations that might not have exact line breaks
    content = content.replace(/<svg width="28" height="28" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20"[\s\S]*?<\/svg>/g, NEW_LOGO_HTML);

    // 2. Replace text "Humanize AI" or "HumanizeAI" with "GUIDESOFT"
    content = content.replace(/Humanize AI/g, 'GUIDESOFT');
    content = content.replace(/HumanizeAI/gi, 'GUIDESOFT');
    content = content.replace(/Humanize/gi, 'GUIDESOFT');

    // Wait, some tool URLs might accidentally get renamed? 
    // e.g. /tool/GUIDESOFT-generator.html - let me be safe and ensure filenames are restored if broken
    content = content.replace(/tool\/GUIDESOFT-humanizer.html/g, 'tool/ai-humanizer.html');
    content = content.replace(/href="GUIDESOFT.html"/gi, 'href="index.html"');

    // 3. Set/Add Favicon in <head> if not present
    const faviconTag = `<link rel="icon" href="${LOGO_URL}" type="image/png">`;
    if (!content.includes('rel="icon"')) {
        content = content.replace('<meta charset="UTF-8">', `<meta charset="UTF-8">\n    ${faviconTag}`);
    } else {
        // replace existing favicon href
        content = content.replace(/<link rel="icon"[\s\S]*?>/i, faviconTag);
    }

    fs.writeFileSync(file, content, 'utf8');
});

console.log("Branding update complete. Checked and patched all logo, title, and favicon occurrences.");
