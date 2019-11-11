import assert from 'assert';
import _execa from 'execa';
import fetch from 'node-fetch';
import terminate from 'terminate';
import i from 'log-symbols';
import waitOn from 'wait-on';

export const DEFAULT_TITLE = 'React Starter Kit - www.reactstarterkit.com';
export const TIEMOUT_BASE = 60 * 1000;

export function success(...args: string[]) {
  return console.info('\n', i.success, ...args);
}

export function info(...args: string[]) {
  return console.info('\n', i.info, ...args);
}

export function execa(command: string, args: string[], opts?: _execa.Options) {
  return _execa(command, args, { stdout: process.stdout, ...opts });
}

export async function verifyTitle(url: string, expected: string) {
  const text = await fetch(url).then(r => r.text());
  const match = text.match(/<title.*?>(.+?)</);
  if (!match) throw new Error('Title text does not exist');

  const [, actual] = match;
  assert.strictEqual(actual, expected);
}

export async function waitApp(url: string) {
  await waitOn({
    resources: [url],
    timeout: TIEMOUT_BASE,
  });
}

export async function killApp(app: _execa.ExecaChildProcess) {
  info(`Terminating app ${app.pid}...`);
  await new Promise((resolve, reject) => {
    terminate(app.pid, (err?: any) => {
      if (err) return reject(err);
      return resolve();
    });
  });
  success(`App ${app.pid} was terminated`);
}
