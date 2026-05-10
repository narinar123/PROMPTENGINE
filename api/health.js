export default function handler(req, res) {
  res.status(200).json({ status: 'operational', platform: 'vercel-serverless', timestamp: Date.now() });
}
