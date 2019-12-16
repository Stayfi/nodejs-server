import 'mocha';
import { assert } from 'chai';
import * as sinon from 'sinon';
import { appEnvironment } from './app/shared/app-environment.enum';
import config from './config/config';

const sandbox = sinon.createSandbox();

export default function getServerOptionsFromArgsTests() {
  describe('#Params: Get server options from params test', function () {
/*    it('Without args should return default server options from env file', async function () {
      const serverTestOptions = appInc.getServerOptionsFromArgs({}, []);
      assert.isEmpty(serverTestOptions);
    });

    it('Without args port 3001 should return server options port 3001', async function () {
      const serverTestOptions = appInc.getServerOptionsFromArgs({}, ['-p', '3001']);
      assert.equal(serverTestOptions.port, 3001);
    });

    it('Args port not number should not be setted', async function () {
      const serverTestOptions = appInc.getServerOptionsFromArgs({}, ['-p', 'string']);
      assert.isEmpty(serverTestOptions);
    });

    it('Args port 0 should not be setted', async function () {
      const serverTestOptions = appInc.getServerOptionsFromArgs({}, ['-p', '0']);
      assert.isEmpty(serverTestOptions);
    });

    it('Args port negative should not be setted', async function () {
      const serverTestOptions = appInc.getServerOptionsFromArgs({}, ['-p', '-3']);
      assert.isEmpty(serverTestOptions);
    });

    it('With args logger.enabled: true should return server options logger enabled', async function () {
      const serverTestOptions = appInc.getServerOptionsFromArgs({}, ['-l', 'true']);
      assert.isTrue(serverTestOptions.logger!.enabled);
    });

    it('With args logger.enabled: false should return server options logger disabled', async function () {
      const serverTestOptions = appInc.getServerOptionsFromArgs({}, ['-l', 'false']);
      assert.isFalse(serverTestOptions.logger!.enabled);
    });

    it('With args test should return server options test environment', async function () {
      const serverTestOptions = appInc.getServerOptionsFromArgs({}, ['--test']);
      assert.equal(serverTestOptions.env, appEnvironment.TEST);
    });

    it('With args production should return server options production environment', async function () {
      const serverTestOptions = appInc.getServerOptionsFromArgs({}, ['--production']);
      assert.equal(serverTestOptions.env, appEnvironment.PROD);
    });
*/
  });
}