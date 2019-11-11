import path from 'path';
import { readFile, writeFile } from './lib/fs';
import {
  killApp,
  TIEMOUT_BASE,
  execa,
  DEFAULT_TITLE,
  waitApp,
  verifyTitle,
} from './lib/test-fns';

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
      const url = `http://localhost:${port}`;
      const cwd = path.resolve(__dirname, '..');
      const app = startApp(cwd, port);
      await waitApp(url);
      await verifyTitle(url, DEFAULT_TITLE);
      await killApp(app);
    },
    TIEMOUT_BASE * 2,
  );

  it(
    'does Hot Module Reload',
    async () => {
      // TODO: Abort when any of files is changed

      const sourcePath = 'src/routes/index.tsx';
      const cwd = path.resolve(__dirname, '..');
      const file = path.join(cwd, sourcePath);

      const modifyTitle = async () => {
        const content = await readFile(file);
        await writeFile(
          file,
          content.replace(/www.reactstarterkit.com/g, 'yeah.com'),
        );
      };

      const resetTitle = () => execa('git', ['checkout', sourcePath], { cwd });

      const port = 3033;
      const url = `http://localhost:${port}`;
      const app = startApp(cwd, port);
      await waitApp(url);
      await modifyTitle();
      await new Promise(resolve => setTimeout(resolve, 3 * 1000));
      await verifyTitle(
        url,
        DEFAULT_TITLE.replace(/www.reactstarterkit.com/g, 'yeah.com'),
      );
      await killApp(app);
      await resetTitle();
    },
    TIEMOUT_BASE * 2,
  );
});
