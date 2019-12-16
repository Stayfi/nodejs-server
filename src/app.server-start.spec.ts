import 'mocha';
import { assert } from 'chai';
import request from 'supertest';
import treeKill from 'tree-kill';

export default function serverStartTests() {
  describe('#Start: Server start test ', function() {
    const serverTestPort = 3003;
    const serverTestLoggerPort = 3004;
    const serverTestProductionDisabledPort = 3005;
    const serverTestProductionEnabledPort = 3006;
    let serverTestToBeKill: any;

    it(`Start Server should log on console 'Server is running on port ${serverTestPort}'`, function(done) {
      this.timeout(7000);
      this.slow(5000);
      let goDone = true;
      const serverTest = getServerRunning(serverTestPort, 'prod');
      serverTestToBeKill = serverTest;

      serverTest.stdout.on('data', function(data: {}) {
        if (
          typeof data === 'string' &&
          data.indexOf(`Server is running on port ${serverTestPort}`) >= 0 &&
          goDone
        ) {
          goDone = false;
          return done();
        }
      });
    });

    it(`When started, should http://localhost:${serverTestPort} return status 200`, async function() {
      const res = await request(`http://localhost:${serverTestPort}`).get('/');

      assert.equal(res.status, 200);
    });

    it('Server should be killed', function(done) {
      this.slow(500);

      treeKill(serverTestToBeKill.pid, 'SIGTERM', done);
    });

    it(`Start Server without logger should not log 'Logger enabled'`, function(done) {
      this.timeout(7000);
      this.slow(5000);
      const serverTestLoggerDisabled = getServerRunning(serverTestLoggerPort, 'prod');

      serverTestLoggerDisabled.stdout.on('data', function(data: {}) {
        if (typeof data === 'string' && data.indexOf(`Logger enabled`) >= 0) {
          assert.fail('Logger enabled', '', 'Logger not disabled');
        }
        if (
          typeof data === 'string' &&
          data.indexOf(`Server is running on port ${serverTestLoggerPort}`) >= 0
        ) {
          treeKill(serverTestLoggerDisabled.pid, 'SIGTERM', done);
        }
      });
    });

    it(`Start:dev should not log 'Production mode'`, function(done) {
      this.timeout(7000);
      this.slow(5000);
      const serverTestProductionDisabled = getServerRunning(serverTestProductionDisabledPort, 'dev');

      serverTestProductionDisabled.stdout.on('data', function(data: {}) {
        if (typeof data === 'string' && data.indexOf(`Production mode`) >= 0) {
          assert.fail('Production mode', '', 'Production mode activated');
        }
        if (
          typeof data === 'string' &&
          data.indexOf(`Server is running on port ${serverTestProductionDisabledPort}`) >= 0
        ) {
          treeKill(serverTestProductionDisabled.pid, 'SIGTERM', done);
        }
      });
    });

    it(`Start:prod should log 'Production mode'`, function(done) {
      this.timeout(7000);
      this.slow(5000);
      let isDone = false;
      setTimeout(function() { if (!isDone) done(new Error('Production mode test: Timeout')); }, 6500);
      const serverTestProductionEnabled = getServerRunning(serverTestProductionEnabledPort, 'prod');
      let isProduction = false;

      serverTestProductionEnabled.stdout.on('data', function(data: {}) {
        if (typeof data === 'string' && data.indexOf(`Production mode`) >= 0) {
          isProduction = true;
        }
        if (
          typeof data === 'string' &&
          data.indexOf(`Server is running on port ${serverTestProductionEnabledPort}`) >= 0
        ) {
          assert.isTrue(isProduction);
          isDone = true;
          treeKill(serverTestProductionEnabled.pid, 'SIGTERM', done);
        }
      });
    });

  });
}

function getServerRunning(port: number, env: string) {
  const NPM_CMD: string = getNpmCmd();
  const serverRunning = require('child_process').spawn(NPM_CMD, [
    'run', `start:${env}`, '--',
    '--port', port
  ]);
  serverRunning.stdout.setEncoding('utf8');
  serverRunning.stderr.setEncoding('utf8');

  return serverRunning;
}
function getNpmCmd(): string {
  let NPM_CMD: string = 'npm';
  if (process.platform === 'win32') {
    NPM_CMD = 'npm.cmd';
  }
  return NPM_CMD;
}