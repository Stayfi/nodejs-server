import Server from './app/server/server.class';
import { appEnvironment } from './app/shared/app-environment.enum';
import { ServerOptionsInterface } from './app/server/server.interface';
import config from './config/config';
const appConfig = config();

const serverAppOptions: ServerOptionsInterface = {
  env: appConfig.get('env') as appEnvironment,
  logger: {
    enabled: appConfig.get('logger')
  },
  port: appConfig.get('port')
};

const serverApp = new Server(serverAppOptions);

const serverAppStarted = serverApp.start();

export { serverAppStarted, serverApp, serverAppOptions };
