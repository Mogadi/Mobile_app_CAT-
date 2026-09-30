const { spawn } = require('child_process');
const path = require('path');

const child = spawn('npx', ['expo', 'start', '--tunnel'], {
  cwd: path.join(__dirname, '..'),
  shell: true,
  stdio: 'inherit',
  env: {
    ...process.env,
    EXPO_UNSTABLE_TUNNEL_V2: '1',
  },
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
