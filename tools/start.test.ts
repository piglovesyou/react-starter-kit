import path from 'path';
import { killApp, timeoutBase, verifyApp, execa } from './lib/test-fns';

const startApp = (cwd: string, port: number) =>
  execa('yarn', ['start', '--silent'], {
    cwd,
    env: { PORT: String(port) },
  });

describe('yarn start', () => {
  it(
    'launches the App',
    async () => {
      const port = 3033;
      const cwd = path.resolve(__dirname, '..');
      const app = startApp(cwd, port);
      await verifyApp(port);
      await killApp(app);
    },
    timeoutBase * 2,
  );
});
