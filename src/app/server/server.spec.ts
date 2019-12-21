import 'mocha';
import { assert } from 'chai';
import * as sinon from 'sinon';
import request from 'supertest';
import Server from './server.class';
import { appEnvironment } from '../shared/app-environment.enum';
import { ServerOptionsInterface, ServerInterface } from './server.interface';
import config from '../../config/config';

const sandbox = sinon.createSandbox();

describe('#Server config test', function () {
  let serverConsoleLogStub: sinon.SinonStub<[any?, ...any[]], void>;
  beforeEach(function () {
    serverConsoleLogStub = sinon.stub(console, 'log');
  });

  it('Should default port setted to 3000', async function () {
    const serverAppOptions = getServerAppOptions();
    const serverTest: Server = getInitializedServer(serverAppOptions);
    assert.equal(serverTest.options.port, 3000);
  });

  it(`Should views_path be set to 'src/app' when not PROD_ENV`, async function () {
    const serverAppOptions = getServerAppOptions();
    const serverTest: Server = getInitializedServer(serverAppOptions);
    const views_path = serverTest['getViewPath']();
    assert.equal(views_path, 'src/app');
  });

  it(`Should views_path be set to 'dist/app' when Production mode`, async function () {
    sandbox.stub(process, 'env').value({ NODE_ENV: appEnvironment.PROD });
    const serverAppOptions = getServerAppOptions();
    const serverTest: Server = getInitializedServer(serverAppOptions);
    const views_path = serverTest['getViewPath']();
    assert.equal(views_path, 'dist/app');
  });

  it(`Should console.log('√ Logger enabled') when logger enabled`, async function () {
    sandbox.stub(process, 'env').value({ LOGGER: true });
    const serverAppOptions = getServerAppOptions();
    const serverTest: Server = getInitializedServer(serverAppOptions);
    const loggerEnabled = serverTest['loggerInformation']();
    // @ts-ignore
    assert.isTrue(console.log.calledWith('\x1b[33m%s\x1b[0m', '√ Logger enabled'));
    assert.isTrue(loggerEnabled);
  });

  it(`Should NO console.log('√ Logger enabled') when logger isabled`, async function () {
    sandbox.stub(process, 'env').value({ LOGGER: false });
    const serverAppOptions = getServerAppOptions();
    const serverTest: Server = getInitializedServer(serverAppOptions);
    const loggerEnabled = serverTest['loggerInformation']();
    // @ts-ignore
    assert.isFalse(console.log.calledWith('\x1b[33m%s\x1b[0m', '√ Logger enabled'));
    assert.isFalse(loggerEnabled);
  });
  
  it(`Should console.log('√ Staging mode') when staging environment`, async function () {
    sandbox.stub(process, 'env').value({ NODE_ENV: appEnvironment.STAGING });
    const serverAppOptions = getServerAppOptions();
    const serverTest: Server = getInitializedServer(serverAppOptions);
    serverTest['nodeEnvInformation']();
    // @ts-ignore
    assert.isTrue(console.log.calledWith('\x1b[36m%s\x1b[0m', '√ Staging mode'));
  });
  
  it(`Should console.log('√ Production mode') when production environment`, async function () {
    sandbox.stub(process, 'env').value({ NODE_ENV: appEnvironment.PROD });
    const serverAppOptions = getServerAppOptions();
    const serverTest: Server = getInitializedServer(serverAppOptions);
    serverTest['nodeEnvInformation']();
    // @ts-ignore
    assert.isTrue(console.log.calledWith('\x1b[36m%s\x1b[0m', '√ Production mode'));
  });
  
  it(`When started, should index return status 200`, async function () {
    sandbox.stub(process, 'env').value({ NODE_ENV: appEnvironment.TEST });
    const serverAppOptions = getServerAppOptions();
    const serverTest: Server = getInitializedServer(serverAppOptions);
    serverTest.start();
    const res = await request(
      `http://localhost:${serverTest.options.port}`
    ).get('/');
    assert.equal(res.status, 200);
    serverTest.stop();
  });

  afterEach(function () {
    serverConsoleLogStub.restore();
  });
});

function getInitializedServer(options: ServerOptionsInterface): Server {
  const serverTest = new Server(options);
  serverTest.initServer();
  return serverTest;
}

function getServerAppOptions(): ServerOptionsInterface {
  const appConfig = config();
  const serverAppOptions: ServerOptionsInterface = {
    env: appConfig.get('env') as appEnvironment,
    logger: {
      enabled: appConfig.get('logger')
    },
    port: appConfig.get('port')
  };

  return serverAppOptions;
}