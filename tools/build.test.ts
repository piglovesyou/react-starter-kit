import path from 'path';
import {
  DEFAULT_TITLE,
  execa,
  killApp,
  TIEMOUT_BASE,
  verifyTitle,
  waitApp,
} from './lib/test-fns';

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
      const url = `http://localhost:${port}`;
      const cwd = path.resolve(__dirname, '..');
      execa('yarn', ['build', '--release'], { cwd });
      const app = startApp(cwd, port);
      await waitApp(url);
      await verifyTitle(url, DEFAULT_TITLE);
      await killApp(app);
    },
    TIEMOUT_BASE * 2,
  );
});
