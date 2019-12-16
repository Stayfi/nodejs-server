import 'mocha';
import { assert } from 'chai';
import request from 'supertest';
import Server from '../server/server.class';
import { appEnvironment } from '../shared/app-environment.enum';
import { ServerOptionsInterface } from '../server/server.interface';

describe('#Home test', function() {
  const serverOptions: ServerOptionsInterface = { env: appEnvironment.TEST,port: 3001 };
  const serverTest = new Server(serverOptions);
  serverTest.initServer();

  it('Should / return status 200', async function() {
    const res = await request(serverTest.app).get('/');
    assert.equal(res.status, 200);
  });

  it('Should / return is html', async function() {
    const res = await request(serverTest.app).get('/');
    assert.equal(res.type, 'text/html');
  });
});
