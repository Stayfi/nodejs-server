export default class HomeApiController {
  public IndexActionJson(): JSON {
    const res: JSON = ({ api: true } as any) as JSON;
    return res;
  }
}
