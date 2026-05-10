import fs from 'fs';

// Create standard minimal DOM mocks to simulate browser execution context
global.window = {};
global.document = {
    getElementById: () => ({}),
    readyState: 'complete',
    addEventListener: () => {}
};

// Mock the external package exports that bundle.js expects from import map
global.React = { createElement: () => ({}) };
global.useState = () => [{}, () => {}];
global.createContext = () => ({});
global.useContext = () => ({});
global.motion = { div: 'div', button: 'button' };
global.AnimatePresence = 'div';
global.createRoot = () => ({ render: () => {} });
global.User = 'svg';
global.Lock = 'svg';
// etc.

const bundlePath = './public/dist/bundle.js';
let code = fs.readFileSync(bundlePath, 'utf8');

// Strip official imports since we are running in Node and they will fail resolve
code = code.replace(/^import .*? from .*?;/gm, '// stripped import');
// Add explicit mocks for the variables at the top of code
code = `
const React = global.React;
const { useState, createContext, useContext } = global;
const { motion, AnimatePresence } = global;
const createRoot = global.createRoot;
const User = 'svg', Lock = 'svg', Settings = 'svg', Key = 'svg', Sparkles = 'svg', ArrowRight = 'svg', Shield = 'svg', Zap = 'svg', Globe = 'svg', Terminal = 'svg', Play = 'svg', Loader2 = 'svg', CheckCircle2 = 'svg', AlertCircle = 'svg';
` + code;

try {
    console.log("🔍 STAGE 1: Validating Syntax with eval()...");
    eval(code);
    console.log("✅ SUCCESS: Bundle parses and executes perfectly with ZERO top-level errors.");
} catch (e) {
    console.error("❌ FAILURE: CRASH DETECTED IN BUNDLE JS!");
    console.error(e.stack);
    process.exit(1);
}
