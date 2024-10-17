/* eslint-disable no-console */
import chalk from 'chalk';

import { DependencyIssues } from '../validate.types';

import { lgProvider } from './validatePeerDependencies';

export function logDependencyIssues(
  pkg: string,
  {
    missingDependencies,
    missingDevDependencies,
    unusedDependencies,
    unusedDevDependencies,
    listedDevButUsedAsDependency,
    listedButOnlyUsedAsDev,
    isMissingPeers,
  }: DependencyIssues,
  verbose?: boolean,
) {
  unusedDependencies.length > 0 &&
    console.log(
      `${chalk.green(pkg)} does not use ${chalk.blueBright(
        unusedDependencies.join(', '),
      )}`,
    );

  unusedDevDependencies.length > 0 &&
    console.log(
      `${chalk.green(pkg)} does not use ${chalk.blueBright(
        unusedDevDependencies.join(', '),
      )} as devDependencies`,
    );

  if (Object.entries(missingDependencies).length > 0) {
    console.log(
      `${chalk.green(pkg)} is missing dependencies: ${chalk.redBright(
        Object.keys(missingDependencies).join(', '),
      )}`,
    );
    verbose && console.dir(missingDependencies);
  }

  if (Object.entries(missingDevDependencies).length > 0) {
    console.log(
      `${chalk.green(pkg)} is missing devDependencies: ${chalk.yellowBright(
        Object.keys(missingDevDependencies).join(', '),
      )}`,
    );
    verbose && console.dir(missingDevDependencies);
  }

  listedDevButUsedAsDependency.length > 0 &&
    console.log(
      `${chalk.green(
        pkg,
      )} lists these as devDependencies, but are used in source files: ${chalk.yellowBright(
        listedDevButUsedAsDependency.join(', '),
      )}`,
    );

  listedButOnlyUsedAsDev.length > 0 &&
    console.log(
      `${chalk.green(
        pkg,
      )} lists these as dependencies, but are only used in test files: ${chalk.yellowBright(
        listedButOnlyUsedAsDev.join(', '),
      )}`,
    );

  isMissingPeers &&
    console.log(
      `${chalk.green(pkg)} does not list ${chalk.greenBright(
        lgProvider,
      )} as a peer dependency.\n  Please fix this manually in ${chalk.gray(
        `${pkg}/package.json`,
      )}`,
    );
}
