import assert from 'node:assert/strict';
import { estimate } from './calculator.mjs';
assert.deepEqual(estimate([10, 2], [5, 1], 1, 30, 20), { live: 4.5, upload: 1.125, total: 5.625, plan: 6.75 });
assert.equal(estimate([0, 1], [0, 1], 2, 30, 20).plan, 0);
assert.throws(() => estimate([1441, 1], [0, 1], 1, 30, 0), RangeError);
