export default class Spider {
  entry: string;

  constructor(entry: string) {
    this.entry = entry;
  }

  run() {
    this.loopUrl(this.entry, (url) => this.scraper(url));
  }

  async scraper(url: string) {
    const res = await this.fetchDom(url);
    console.log('res', res);
  }

  async fetchDom(url: string) {
    const res = await fetch(url);
    return res.text();
  }

  loopUrl(url: string, fn: (url: string) => void) {
    const m = url.match(/\[(\d+)-(\d+)\:?(\d*)\]/);
    if (!m) {
      return fn(url);
    }
    for (let i = parseInt(m[1]); i <= parseInt(m[2]); i += (parseInt(m[3]) || 1)) {
      this.loopUrl(url.substring(m.index as number + m[0].length), (subUrl) => {
        fn(`${url.substring(0, m.index)}${i}${subUrl}`);
      });
    }
  }
}

// const spider = new Spider('https://www.baidu.com/page/[1-3]/section/[2-5]');
const spider = new Spider('https://movie.douban.com/review/best/?start=[20-20:20]');

spider.run();