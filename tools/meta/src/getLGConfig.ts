import fs from 'fs';
import path from 'path';

export interface LGConfig {
  scopes: Record<string, string>;
}

export const getLGConfig = (): LGConfig => {
  const rootDir = process.cwd();
  const lgConfigPath = path.resolve(rootDir, 'lg.json');

  // Check if an lg.json exists
  if (!fs.existsSync(lgConfigPath)) {
    throw new Error('`lg.json` config file not found');
  }

  const lgConfig = JSON.parse(fs.readFileSync(lgConfigPath, 'utf-8'));
  return lgConfig as LGConfig;
};
