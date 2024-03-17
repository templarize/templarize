// This code is a sample file.
import { test } from 'vitest';

function add(a: number, b: number): number {
  return a + b;
}

test('adds two numbers', ({ expect }) => {
  expect(add(1, 2)).toBe(3);
});
