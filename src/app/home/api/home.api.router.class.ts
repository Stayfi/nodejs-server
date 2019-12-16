import express from 'express';
import RouterInterface from '../../shared/router.interface';
import HomeApiController from './home.api.controller';
const router = express.Router();

export default class HomeApiRouter implements RouterInterface {
  private router: express.Router = router;

  constructor() {
    this.initRouter();
  }

  public getRouter(): express.Router {
    return this.router;
  }

  private initRouter(): void {
    const homeApiController = new HomeApiController();
    this.router.get(
      '/',
      (request: express.Request, response: express.Response) => {
        const homeApiRes = homeApiController.IndexActionJson();
        response.json(homeApiRes);
      }
    );
  }
}
