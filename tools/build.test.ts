import path from 'path';
import waitOn from 'wait-on';
import fetch from 'node-fetch';
import assert from 'assert';
import { execa, killApp, success, timeoutBase } from './lib/test-fns';

async function verifyApp(port: number) {
  const expected = 'React Starter Kit - www.reactstarterkit.com';
  const url = `http://localhost:${port}`;
  await waitOn({
    resources: [url],
    timeout: timeoutBase,
  });
  const text = await fetch(url).then(r => r.text());
  const match = text.match(/<title.*?>(.+?)</);
  if (!match) throw new Error('Title text does not exist');

  const [, actual] = match;
  assert.strictEqual(actual, expected);
  success(`Verified app of port ${port}`);
}

const buildApp = (cwd: string) =>
  execa('yarn', ['build', '--release'], { cwd });

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
      await buildApp(cwd);
      const app = startApp(cwd, port);
      await verifyApp(port);
      await killApp(app);
    },
    timeoutBase * 2,
  );
});
