import convict = require('convict');
import path from 'path';
import { appSchemaConfig } from '../config/app-schema.conf';
import dotenv from 'dotenv';
dotenv.config();

export default () => {
  const config = convict(appSchemaConfig);
  const env = config.get('env');
  config.loadFile([
    path.join(__dirname, `../../config/${env}.conf.json`),
    path.join(__dirname, '../../config/app.conf.json')
  ]);
  config.validate({ strict: true });

  return config;
};
