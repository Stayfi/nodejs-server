import 'mocha';
import { assert } from 'chai';
import { serverApp, serverAppStarted } from './app';

export default function appServerStartTest() {
  describe('#AppStart:  App Server tests ', function () {
    it('App Server should be an object', async function () {
      assert.equal(typeof serverApp, 'object');
    });
  
    it('App Server started', async function () {
      assert.isTrue(serverAppStarted);
    });

    serverApp.stop();
  });
};