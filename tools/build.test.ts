import path from 'path';
import { execa, killApp, timeoutBase, verifyApp } from './lib/test-fns';

const startApp = (cwd: string, port: number) =>
  execa('node', ['build/server.js'], {
    cwd,
    env: { PORT: String(port) },
  });

describe('yarn build', () => {
  it(
    'builds the App that launches',
    async () => {
      const port = 3033;
      const cwd = path.resolve(__dirname, '..');
      execa('yarn', ['build', '--release'], { cwd });
      const app = startApp(cwd, port);
      await verifyApp(port);
      await killApp(app);
    },
    timeoutBase * 2,
  );
});
