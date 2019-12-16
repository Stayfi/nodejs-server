import 'mocha';
import appServerStartTest from './app.start.spec';
import environmentsServerconfigTests from './app.environments-server-options.spec';
import getServerOptionsFromArgsTests from './app.server-options-args.spec';
import serverStartTests from './app.server-start.spec';

describe('#App:', function() {

  appServerStartTest();

  environmentsServerconfigTests();

  getServerOptionsFromArgsTests();

  serverStartTests()

});

