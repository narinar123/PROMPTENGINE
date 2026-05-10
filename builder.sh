#!/bin/bash
export HOME=/Users/mac/gsprompthero
export BUN_INSTALL=/Users/mac/gsprompthero/.bun
cd /Users/mac/gsprompthero
/usr/local/bin/bun build ./src/app/page.js --outfile=./bundle.js --external react --external react-dom --external framer-motion --external lucide-react
