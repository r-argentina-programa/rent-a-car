import fs from 'fs';
import dotenv from 'dotenv';

export function overrideEnv(envFilePath) {
  const envConfig = dotenv.parse(fs.readFileSync(envFilePath));
  Object.keys(envConfig).forEach((k) => {
    process.env[k] = envConfig[k];
  });
}
