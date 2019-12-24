import express from 'express';
import RouterInterface from '../_shared/router.interface';
import ActionViewInterface from '../_shared/action-view.interface';
import HomeController from './home.controller.class';
const router = express.Router();

export default class HomeRouter implements RouterInterface {
  private router: express.Router = router;

  constructor() {
    this.initRouter();
  }

  public getRouter(): express.Router {
    return this.router;
  }

  private initRouter(): void {
    const homeController = new HomeController();
    this.router.get(
      '/',
      (request: express.Request, response: express.Response) => {
        const homeRes: ActionViewInterface = homeController.IndexActionView();
        response.render(homeRes.view, homeRes.params);
      }
    );
  }
}
