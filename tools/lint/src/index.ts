const { spawn } = require('child_process');
const path = require('path');
const { Command } = require('commander');
const rootDir = process.cwd();
const eslintConfig = path.resolve(__dirname, '../config/eslint.config.js');
const prettierConfig = path.resolve(__dirname, '../config/prettier.config.js');
const npmPkgLintConfig = path.resolve(
  __dirname,
  '../config/npmpackagejsonlintrc.config.js',
);

const esLintExtensions = ['js', 'ts', 'tsx'];
const prettierExtensions = [...esLintExtensions, 'mjs', 'json', 'md', 'yml'];

const cli = new Command()
  .option('-f, --fix', 'fix linting errors', false)
  .option('-p, --prettierOnly', 'run prettier only', false)
  .option('-e, --eslintOnly', 'run eslint only', false)
  .parse(process.argv);

const { fix, prettierOnly, eslintOnly } = cli.opts();

// If prettierOnly or eslintOnly is true, run only that linter
if (prettierOnly || eslintOnly) {
  if (prettierOnly) {
    prettier();
  } else {
    eslint();
  }
  process.exit(0);
}

// Otherwise, run all linters
eslint();
prettier();
npmPkgJsonLint();

function eslint() {
  spawn(
    'eslint',
    [
      '--config',
      eslintConfig,
      `${rootDir}/**/*.{${esLintExtensions.join(',')}}`,
      fix ? '--fix' : '--no-fix',
    ],
    {
      stdio: 'inherit',
    },
  );
}

function prettier() {
  spawn(
    'prettier',
    [
      fix ? '--write' : '--check',
      '--config',
      prettierConfig,
      `${rootDir}/**/*.{${prettierExtensions.join(',')}}`,
    ],
    {
      stdio: 'inherit',
    },
  );
}

function npmPkgJsonLint() {
  spawn('npmPkgJsonLint', ['--configFile', npmPkgLintConfig, rootDir], {
    stdio: 'inherit',
  });
}
