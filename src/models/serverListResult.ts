import Server from './server';

class ServerListResult {
  items?: Server[];

  constructor(data: Record<string, any> = {}) {
    this.items = (data.items || []).map((i: any) => new Server(i));
  }
}

export default ServerListResult;
