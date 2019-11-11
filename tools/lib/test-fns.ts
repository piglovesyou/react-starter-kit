import assert from 'assert';
import _execa from 'execa';
import fetch from 'node-fetch';
import terminate from 'terminate';
import i from 'log-symbols';
import waitOn from 'wait-on';

export const timeoutBase = 3 * 60 * 1000;

export const success = (...args: string[]) =>
  console.info('\n', i.success, ...args);
export const info = (...args: string[]) => console.info('\n', i.info, ...args);

export const execa = (command: string, args: string[], opts?: _execa.Options) =>
  _execa(command, args, { stdout: process.stdout, ...opts });

export async function verifyApp(port: number) {
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

export const killApp = async (app: _execa.ExecaChildProcess) => {
  info(`Terminating app ${app.pid}...`);
  await new Promise((resolve, reject) => {
    terminate(app.pid, (err?: any) => {
      if (err) return reject(err);
      return resolve();
    });
  });
  success(`App ${app.pid} was terminated`);
};
