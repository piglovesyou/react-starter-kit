import path from 'path';
import { execa, killApp, timeoutBase, verifyApp } from './lib/test-fns';

describe('yarn serve', () => {
  it(
    'serve the App',
    async () => {
      const port = 3033;
      const cwd = path.resolve(__dirname, '..');
      await execa('yarn', ['build', '--release'], { cwd });
      const app = execa('yarn', ['serve'], {
        cwd,
        env: { PORT: String(port) },
      });
      await verifyApp(port);
      await killApp(app);
    },
    timeoutBase * 2,
  );
});
