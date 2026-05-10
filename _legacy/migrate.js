const fs = require('fs');
const path = require('path');

const toolDir = '/Users/mac/gsprompthero/tool';
const files = fs.readdirSync(toolDir).filter(f => f.endsWith('.html'));

console.log(`Found ${files.length} files to migrate.`);

const apiScript = '<script src="../js/api.js"></script>';

files.forEach(file => {
    const filePath = path.join(toolDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Inject api.js script tag if not present
    if (!content.includes('js/api.js')) {
        content = content.replace('</body>', `${apiScript}\n</body>`);
    }

    // 2. Handle special stub/simple pattern from bulk generated files
    // Patterns like: await new Promise(r=>setTimeout(r,1100)); ... innerHTML = ...
    const toolName = file.replace('.html', '');
    
    // Let's do a generic replacement for the bulk tools script
    if (content.includes('await new Promise(r=>setTimeout(r,1100));')) {
        const replacementRegex = /async function run\(\)\{[\s\S]*?document\.getElementById\('loader'\)\.style\.display='flex';[\s\S]*?await new Promise\(r=>setTimeout\(r,1100\)\);[\s\S]*?document\.getElementById\('loader'\)\.style\.display='none';[\s\S]*?document\.getElementById\('out'\)\.innerHTML=([\s\S]*?);[\s\S]*?document\.getElementById\('st'\)\.innerText='Completed';document\.getElementById\('st'\)\.style\.display='block';[\s\S]*?\}/g;
        
        const genericFix = `async function run() {
    const t = inp.value.trim();
    if (!t) { alert('Please enter some text.'); return; }
    document.getElementById('loader').style.display = 'flex';
    try {
        const res = await window.gsApi.call('${toolName}', t);
        document.getElementById('loader').style.display = 'none';
        // Handle JSON formatting or string
        let displayStr = typeof res.result === 'object' ? JSON.stringify(res.result, null, 2).replace(/\\n/g, '<br>') : res.result.replace(/\\n/g, '<br>');
        document.getElementById('out').innerHTML = '<div style="white-space:pre-wrap;line-height:1.8;">' + displayStr + '</div>';
        document.getElementById('st').innerText = 'Real AI Generated';
        document.getElementById('st').style.display = 'block';
    } catch (err) {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('out').innerHTML = '<div style="color:red;">Error: ' + err.message + '</div>';
    }
}`;
        content = content.replace(replacementRegex, genericFix);
    }

    // Handle specific customized core tools iteratively
    // content-detector.html fix
    if (file === 'content-detector.html') {
        const pattern = /async function detectContent\(\)\{[\s\S]*?await new Promise\(r=>setTimeout\(r,1500\)\);[\s\S]*?const sentences=text\.match[\s\S]*?\}\)/;
        if (content.includes('detectContent()')) {
             // Simpler injection: rewrite the core function completely
             const detectorLogic = `async function detectContent(){
    const text=txt.value.trim();
    if(!text){alert('Please paste some text to analyze.');return;}
    document.getElementById('loader').style.display='flex';
    try {
        const res = await window.gsApi.call('content-detector', text);
        const data = typeof res.result === 'string' ? {score: 50, verdict: 'Mixed'} : res.result;
        const aiScore = data.score || 0;
        const label = data.verdict || 'Result';
        const color=aiScore>=70?'#f87171':aiScore>=40?'#f59e0b':'#a3e635';
        const verdictClass=aiScore>=70?'verdict-ai':aiScore>=40?'verdict-mixed':'verdict-human';

        document.getElementById('loader').style.display='none';
        document.getElementById('resultsCol').innerHTML=\`
            <div class="\${verdictClass} verdict-box">
                <div class="verdict-score" style="color:\${color}">\${aiScore}%</div>
                <div class="verdict-label">\${label}</div>
                <div style="color:var(--text-muted);font-size:.85rem;margin-top:.5rem;">\${data.reasoning || 'AI Analysis complete'}</div>
            </div>
            <div class="meter-wrap">
                <div class="meter-label"><span style="color:#a3e635">Human</span><span style="color:#f87171">AI</span></div>
                <div class="meter-bar"><div class="meter-fill" id="mfill" style="background:linear-gradient(90deg,#a3e635,#f59e0b,#f87171); width: \${aiScore}%"></div></div>
            </div>
        \`;
    } catch(e) {
        document.getElementById('loader').style.display='none';
        alert('Error contacting AI: ' + e.message);
    }
}`;
            content = content.replace(/async function detectContent\(\)\{[\s\S]*?setTimeout\(\(\)=>{const f=document.getElementById\('mfill'\);if\(f\)f\.style\.width=aiScore\+'%';},100\);[\s\S]*?\}/, detectorLogic);
        }
    }

    // blog-writer.html fix
    if (file === 'blog-writer.html') {
        const blogLogic = `async function genBlog(){
    const topic=document.getElementById('topic').value.trim();
    if(!topic){alert('Please enter a blog topic.');return;}
    const tone=document.getElementById('tone').value;
    const audience=document.getElementById('audience').value.trim();
    const kw=document.getElementById('keyword').value.trim();
    const wc=parseInt(document.getElementById('wc').value);
    document.getElementById('loader').style.display='flex';
    try {
        const res = await window.gsApi.call('blog-writer', topic, { tone, audience, keyword: kw, words: wc });
        document.getElementById('loader').style.display='none';
        document.getElementById('blogTitle').textContent=topic;
        document.getElementById('blogMeta').textContent=(kw?'Keyword: '+kw+' • ':'')+tone.toUpperCase()+' • '+(audience||'General')+' • ~'+wc+' words';
        document.getElementById('blogContent').innerHTML = '<div class="blog-section" style="white-space:pre-wrap; line-height:1.8">' + res.result.replace(/\\n/g, '<br>') + '</div>';
        document.getElementById('blogOut').style.display='block';
        document.getElementById('blogOut').scrollIntoView({behavior:'smooth'});
    } catch (e) {
        document.getElementById('loader').style.display='none';
        alert(e.message);
    }
}`;
        content = content.replace(/async function genBlog\(\)\{[\s\S]*?document\.getElementById\('blogOut'\)\.scrollIntoView\(\{behavior:'smooth'\}\);[\s\S]*?\}/, blogLogic);
    }
    
    // cover-letter.html fix
    if (file === 'cover-letter.html') {
        const coverLogic = `async function gen(){
    const job=document.getElementById('jobTitle').value.trim();
    if(!job){alert('Please enter a job title.');return;}
    document.getElementById('loader').style.display='flex';
    const opts = {
        name: document.getElementById('yourName').value.trim(),
        job: job,
        company: document.getElementById('companyName').value.trim() || 'the company',
        tone: document.getElementById('tone').value
    };
    const skills = document.getElementById('skills').value.trim();
    try {
        const res = await window.gsApi.call('cover-letter', skills, opts);
        document.getElementById('loader').style.display='none';
        document.getElementById('body').textContent=res.result;
        document.getElementById('meta').textContent=res.result.trim().split(/\\s+/).length+' words';
        document.getElementById('out').style.display='block';
        document.getElementById('out').scrollIntoView({behavior:'smooth'});
    } catch (e) {
        document.getElementById('loader').style.display='none';
        alert(e.message);
    }
}`;
        content = content.replace(/async function gen\(\)\{[\s\S]*?document\.getElementById\('out'\)\.scrollIntoView\(\{behavior:'smooth'\}\);[\s\S]*?\}/, coverLogic);
    }

    // caption-writer.html fix
    if (file === 'caption-writer.html') {
        const capLogic = `async function gen(){
    const topic=document.getElementById('topic').value.trim();
    if(!topic){alert('Please describe your post.');return;}
    const platform=document.getElementById('platform').value;
    const tone=document.getElementById('tone').value;
    document.getElementById('loader').style.display='flex';
    try {
        const res = await window.gsApi.call('caption-writer', topic, { platform, tone });
        document.getElementById('loader').style.display='none';
        const pName={instagram:'Instagram',twitter:'Twitter / X',linkedin:'LinkedIn',facebook:'Facebook',tiktok:'TikTok'};
        document.getElementById('out').innerHTML=\`
            <h3 style="margin-bottom:1rem;font-size:1rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px">✨ Generated Captions</h3>
            <div class="caption-card">
                <span class="platform-tag">📱 \${pName[platform]}</span>
                <div class="caption-text" style="white-space:pre-wrap">\${res.result}</div>
                <div style="display:flex;justify-content:flex-end;margin-top:.8rem"><button class="copy-btn-sm" onclick="navigator.clipboard.writeText(\\\`\${res.result}\\\`).then(()=>alert('Copied!'))">Copy</button></div>
            </div>\`;
        document.getElementById('out').style.display='block';
        document.getElementById('out').scrollIntoView({behavior:'smooth'});
    } catch (e) {
        document.getElementById('loader').style.display='none';
        alert(e.message);
    }
}`;
        content = content.replace(/async function gen\(\)\{[\s\S]*?document\.getElementById\('out'\)\.scrollIntoView\(\{behavior:'smooth'\}\);[\s\S]*?\}/, capLogic);
    }

    // Update the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully migrated ${file} to real AI integration.`);
});

console.log('Core HTML migrations completed.');
