import { test } from 'node:test';
import assert from 'node:assert';

test('basic test', () => {
  assert.strictEqual(2 + 2, 4);
});

test('string test', () => {
  assert.strictEqual('hello', 'hello');
});

test('boolean test', () => {
  assert.strictEqual(true, true);
});
