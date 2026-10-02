import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import process from 'node:process';
import theme from './theme';

// styled-components silently renders nothing for a theme key that doesn't
// exist, so check every `theme.a.b.c` reference in the source resolves.

const SRC = join(process.cwd(), 'src');

const sourceFiles = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(jsx?|tsx?)$/.test(name) && !/\.test\./.test(name) ? [path] : [];
  });

const themeReferences = () =>
  sourceFiles(SRC).flatMap((file) =>
    [...readFileSync(file, 'utf8').matchAll(/\btheme\.([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*)/g)].map(
      (match) => ({ file: relative(process.cwd(), file), key: match[1] })
    )
  );

const resolves = (key) =>
  key.split('.').reduce((node, part) => (node != null && part in Object(node) ? node[part] : undefined), theme) !==
  undefined;

describe('theme', () => {
  it('finds theme references to check', () => {
    expect(themeReferences().length).toBeGreaterThan(50);
  });

  it('defines every key the components use', () => {
    const missing = themeReferences()
      .filter(({ key }) => !resolves(key))
      .map(({ file, key }) => `${file}: theme.${key}`);
    expect(missing).toEqual([]);
  });
});
