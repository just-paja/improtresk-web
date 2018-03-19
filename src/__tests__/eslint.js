import glob from 'glob';

import { CLIEngine } from 'eslint';

const engine = new CLIEngine({
  envs: ['node'],
  useEslintrc: true,
});

expect.extend({
  toHaveValidSyntax(path) {
    const report = engine.executeOnFiles([path]);
    const results = CLIEngine.getErrorResults(report.results);
    if (results.length === 0) {
      return { pass: true };
    }
    const formatter = engine.getFormatter();
    return {
      message: () => formatter(report.results),
      pass: false,
    };
  },
});

describe('ESLint', () => {
  const paths = glob.sync('./+(src)/**/*.+(js|jsx)');

  paths.forEach(path => it(`validates ${path}`, () => {
    expect(path).toHaveValidSyntax();
  }));
});
