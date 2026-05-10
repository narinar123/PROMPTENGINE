import https from 'https';
import fs from 'fs';

console.log("⏳ Initiating direct network fetch of Babel Compiler core...");

const file = fs.createWriteStream("babel_standalone.js");
const request = https.get("https://unpkg.com/@babel/standalone@7.23.9/babel.min.js", function(response) {
  if (response.statusCode !== 200) {
      console.error("❌ Failed to fetch Babel standalone:", response.statusCode);
      process.exit(1);
  }
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log("✅ Babel Compiler Core successfully installed locally at './babel_standalone.js'");
  });
});

request.on('error', (err) => {
  console.error("❌ Fetch failed:", err.message);
});
