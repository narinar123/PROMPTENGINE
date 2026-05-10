import http from 'http';

async function findPort() {
  const testPorts = [3000, 3001, 5000, 5173, 8000, 8081, 8082, 9000];
  for (const port of testPorts) {
    try {
      await new Promise((resolve, reject) => {
        const s = http.createServer().listen(port, '127.0.0.1', () => {
          console.log(`SUCCESS: Port ${port} is allowed!`);
          s.close();
          resolve(true);
        });
        s.on('error', reject);
      });
      break;
    } catch (e) {
      console.log(`FAIL: Port ${port} - ${e.code}`);
    }
  }
}
findPort();
