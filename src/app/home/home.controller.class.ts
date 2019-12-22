import ActionViewInterface from '../_shared/actionView.interface';

export default class HomeController {
  public IndexActionView(): ActionViewInterface {
    const viewParams: ActionViewInterface = {
      view: 'home/views/home.njk',
      params: { title: 'Server Node.js' }
    };
    return viewParams;
  }
}
