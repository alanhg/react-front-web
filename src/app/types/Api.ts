export class BaseApi {
  basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  getFileName = (res) => {
    const disposition = res.headers['content-disposition'];
    if (disposition) {
      return disposition.split('filename=')[1].split(';')[0].replace(/^"|"$/g, '');
    }
    return null;
  };
}

