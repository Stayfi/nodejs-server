import 'mocha';
import { assert } from 'chai';
import * as sinon from 'sinon';
import request from 'supertest';
import Server from '../../server/server.class';
import { appEnvironment } from '../../shared/app-environment.enum';
import { ServerOptionsInterface } from '../../server/server.interface';

describe('#Home Api test', function() {
  const serverOptions: ServerOptionsInterface = { env: appEnvironment.TEST, port: 3002 };
  const serverTest = new Server(serverOptions);
  serverTest.initServer();

  it('Should /api return status 200', async function() {
    const res = await request(serverTest.app).get('/api');
    assert.equal(res.status, 200);
  });

  it('Should /api return json', async function() {
    const res = await request(serverTest.app).get('/api');
    assert.equal(res.type, 'application/json');
  });

  it('Should /api return {api: true}', async function() {
    const res = await request(serverTest.app).get('/api');
    assert.isTrue(res.body.api);
  });

});
