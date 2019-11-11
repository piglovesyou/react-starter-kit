import path from 'path';
import {
  DEFAULT_TITLE,
  execa,
  killApp,
  TIEMOUT_BASE,
  verifyTitle,
  waitApp,
} from './lib/test-fns';

describe('yarn serve', () => {
  it(
    'serve the App',
    async () => {
      const port = 3033;
      const url = `http://localhost:${port}`;
      const cwd = path.resolve(__dirname, '..');
      await execa('yarn', ['build', '--release'], { cwd });
      const app = execa('yarn', ['serve'], {
        cwd,
        env: { PORT: String(port) },
      });
      await waitApp(url);
      await verifyTitle(url, DEFAULT_TITLE);
      await killApp(app);
    },
    TIEMOUT_BASE * 2,
  );
});
