# Node.js Express Server

version: 'v1.0.0'

[![Build Status](https://travis-ci.org/Stayfi/nodejs-server.svg?branch=develop)](https://travis-ci.org/Stayfi/nodejs-server)
[![Coverage Status](https://coveralls.io/repos/github/Stayfi/nodejs-server/badge.svg?branch=develop)](https://coveralls.io/github/Stayfi/nodejs-server?branch=develop)

## Description

Node.js server with express framework, craftsmanship way:

- Clean project structure

- Tests Driven Development

- Test Coverage

- Copy/paste detection

## Project structure

./config: Application config files (json)

./scripts: Scripts used by package.json

./src: Application source code

./src/app/home: Home component (api, controller, router, views and tests)

./src/app/server: Server class

./src/app/shared: Shared code (interface, enum, ...)

./src/app/views: Global template views (nunjuks)

./src/config: Config initialization

./src/app.ts: Application bootstrap

.env: Environment variables

![Test results](https://github.com/Stayfi/nodejs-server/raw/master/img/nodejs-server-project-structure.png)

## Technologies

### Denpendencies

#### Express

https://expressjs.com/

"Fast, unopinionated, minimalist web framework for Node.js"

#### Nunjuks

https://mozilla.github.io/nunjucks/

"A rich and powerful templating language for JavaScript."

#### Convict

https://github.com/mozilla/node-convict

Featureful configuration management library for Node.js

First, we set a config schema: "/src/config/app-schema.conf.ts"

```javascript
import { appEnvironment } from '../app/shared/app-environment.enum';

export const appSchemaConfig = {
  env: {
    doc: 'The applicaton environment.',
    format: ([
      'development',
      'test',
      'staging',
      'production'
    ] as unknown) as appEnvironment,
    default: appEnvironment.DEV,
    env: 'NODE_ENV',
    arg: 'node-env'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port'
  },
  logger: {
    doc: 'Logger enabled.',
    format: 'Boolean',
    default: false,
    env: 'LOGGER',
    arg: 'logger'
  }
};
```

Then, we initialized our application configuration according the environment: "/src/config/config.ts"

```javascript
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
```

#### Morgan

https://github.com/expressjs/morgan

"HTTP request logger middleware for node.js"

### Development dependencies

#### Mocha

https://mochajs.org/

"Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases. Hosted on GitHub."

#### Mocha Tags

Adding tags to mocha, so we can filter our test with grep and run mocha only on targetted tests.

Tags can be setted in mocha functions "describe", or "it".

```javascript
describe('#AppStart:  App Server tests ', function() {
  it('App Server should be an object', async function() {
    assert.equal(typeof serverApp, 'object');
  });
});
```

This will run only tests tagged with "#AppStart" :

```bash
npm run test -- --grep "#AppStart"
```

#### Chai

https://www.chaijs.com/

"Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework."

#### Sinon

https://sinonjs.org/

"Standalone test spies, stubs and mocks for JavaScript.
Works with any unit testing framework."

With sinon, we can create sanbox and stub functions like "console.log", "env" variables :

```javascript
const sandbox = sinon.createSandbox();
sandbox.stub(process, 'env').value({ NODE_ENV: appEnvToTest });
// tests with stubbed NODE_ENV
sandbox.restore();
```

```javascript
let serverConsoleLogStub: sinon.SinonStub<[any?, ...any[]], void>;
serverConsoleLogStub = sinon.stub(console, 'log');
// tests with stubbed console.log()
serverConsoleLogStub.restore();
```

#### Supertest

https://github.com/visionmedia/supertest

"🕷Super-agent driven library for testing node.js HTTP servers using a fluent API."

```javascript
const res = await request(`http://localhost:${serverTestPort}`).get('/');
assert.equal(res.status, 200);
```

#### Tree-kill

https://github.com/pkrumins/node-tree-kill

"kill trees of processes"

In tests, we need to kill started server :

```javascript
it('Server should be killed', function(done) {
  this.slow(500);

  treeKill(serverTestToBeKill.pid, 'SIGTERM', done);
});
```

#### Nyc && Istanbul

Running test and generate report about code covered by tests.

packages.json > "scripts" :

```json
    "coverage": "nyc npm test && nyc report --reporter=html",
```

#### jscpd (JS Copy/paste detector)

https://github.com/kucherenko/jscpd

"Copy/paste detector for programming source code."

#### Concurrently

Concurrently run more than one commands with labels and custom color.

packages.json > "scripts" :

```json
    "dev": "concurrently -k -n \"Build,Start\" -p \"[{name}]\" -c \"blue,green\" \"npm:build:dev\" \"npm:start:dev\"",
```

Running concurrently "npm:build:dev" and "npm:start:dev" with labels "Build" and "Start" and colors "blue" and "green".

#### nodemon

https://nodemon.io/

"Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development."

#### Tslint

https://palantir.github.io/tslint/

"TSLint is an extensible static analysis tool that checks TypeScript code for readability, maintainability, and functionality errors. It is widely supported across modern editors & build systems and can be customized with your own lint rules, configurations, and formatters."

### Prettier

https://prettier.io/

"An opinionated code formatter"

tslint.json:

```json
  "rulesDirectory": [
    "tslint-config-prettier",
    "tslint-config-security",
    "tslint-mocha",
    "tslint-plugin-prettier"
  ],
  "rules": {
    "prettier": true,
```

## Clone the project in your workspace

```bash
    $ git clone https://github.com/Stayfi/nodejs-server.git
```

## Install

### Dev installation

Go to the project directory and do

```bash
    $ npm run install:dev
```

### Production installation

Go to the project directory and do

```bash
    $ npm run install:prod
```

## Set environments

Create file into ".env"

```bash
LOGGER=true
PORT=3000
```

Or edit file "./config/{node_env}.conf.json"

```json
{
  "logger": true,
  "port": 3000
}
```

## Start the project

### Dev running

```bash
    $ npm run dev
```

Open your browser to : http://localhost:3000

### Prod running

```bash
    $ npm run start
```

Open your browser to : http://localhost:8080

### Arguments

- --node-env : ["development", "test", "staging", "production"]
- --port : number
- --logger : boolean

## Running tests

```bash
    $ npm run test
```

![Test results](https://github.com/Stayfi/nodejs-server/raw/master/img/test_result.png)

## Running coverage

```bash
    $ npm run coverage
```

![Coverage results](https://github.com/Stayfi/nodejs-server/raw/master/img/coverage_result.png)

## Running copy/paste detection

```bash
    $ npm run jscpd
```

![Jscpd results](https://github.com/Stayfi/nodejs-server/raw/master/img/jscpd_result.png)

## Running tslint

```bash
    $ npm run tslint
```

With fix :

```bash
    $ npm run tslint:fix
```

## Clean the project

It remove all folders generated by build, test and coverage.

```bash
    $ npm run clean
```

## Package.json scripts

- "assets:dist": copy assets to dist folder (nunjunks views)

- "coveralls": send coverage report to https://coveralls.io

- "install:dev": install all dependencies and dev dependencies

- "build:dev": run "assets:dist" and typescript compiler with watching

- "start:dev": running nodemon to monitor dist/app.js

- "install:prod": install only dependencies without dev dependencies
