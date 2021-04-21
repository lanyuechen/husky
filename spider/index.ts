// deno-lint-ignore-file
import { DOMParser, HTMLDocument } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

type Selector = {
  selector: string;
  type?: string;
  key?: string;
  children?: Selector[];
}

export default class Spider {
  entry: string;
  selector: Selector;

  constructor(entry: string, selector: Selector) {
    this.entry = entry;
    this.selector = selector;
  }

  run() {
    this.loopUrl(this.entry, (url) => this.scraper(url));
  }

  async scraper(url: string) {
    // 获取页面xml字符串
    const xml = await this.fetchDom(url);
    // 字符串xml转换为dom对象
    const dom = this.xml2Dom(xml);

    const data = this.getData(dom, this.selector);
    
    console.log('res', data);
  }

  async fetchDom(url: string) {
    const res = await fetch(url);
    return res.text();
  }

  xml2Dom(str: string) {
    return new DOMParser().parseFromString(str, "text/html");
  }

  getData(dom: HTMLDocument | null, selector: Selector) {
    if (!dom) {
      return null;
    }

    if (!selector.children?.length) {
      const type = selector.type || 'text';
      const node = dom.querySelector(selector.selector);
      if (!node) {
        return null;
      }
      if (type.includes('attr:')) {
        const attr = type.substring(5).trim();
        return node.getAttribute(attr);
      }
      return node.innerHTML;
    }

    return Array.from(dom.querySelectorAll(selector.selector)).map(node => {
      const data: any = {};
      selector.children?.forEach((d: Selector) => {
        data[d.key as string] = this.getData(node as HTMLDocument, d)
      });
      return data;
    });
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
const spider = new Spider('https://movie.douban.com/review/best/?start=[20-20:20]', {
  selector: '[data-cid]',
  children: [
    {
      selector: '.main-hd > .name',
      key: 'user',
      type: 'text',
    },
    {
      selector: '.subject-img img',
      key: 'image',
      type: 'attr:src',
    },
    {
      selector: '.main-bd',
      key: 'info',
      children: [
        {
          selector: 'h2 > a',
          key: 'title',
        },
      ],
    },
  ]
});

spider.run();