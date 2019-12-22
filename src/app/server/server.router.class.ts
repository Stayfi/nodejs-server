import express from 'express';
import RouterInterface from '../_shared/router.interface';
import HomeRouter from '../home/home.router.class';
import HomeApiRouter from '../home/api/home.api.router.class';
const router = express.Router();

export default class ServerRouter implements RouterInterface {
  private router: express.Router = router;

  constructor() {
    this.initRouter();
  }

  public getRouter(): express.Router {
    return this.router;
  }

  private initRouter(): void {
    this.router.use('/', new HomeRouter().getRouter());
    this.router.use('/api', new HomeApiRouter().getRouter());
  }
}
