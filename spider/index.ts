// deno-lint-ignore-file
import { DOMParser, HTMLDocument, Element } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

type Selector = {
  selector: string;
  type?: string;
  key?: string;
  sub?: boolean;
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
    this.loop(this.entry, async (url) => {
      const res = await this.fetch(url, this.selector);
      console.log('>>>', res);
    });
  }

  loop(url: string, fn: (url: string) => void) {
    const m = url.match(/\[(\d+)-(\d+)\:?(\d*)\]/);
    if (!m) {
      return fn(url);
    }
    for (let i = parseInt(m[1]); i <= parseInt(m[2]); i += (parseInt(m[3]) || 1)) {
      this.loop(url.substring(m.index as number + m[0].length), (subUrl) => {
        fn(`${url.substring(0, m.index)}${i}${subUrl}`);
      });
    }
  }

  async fetch(url: string, selector: Selector) {
    // 获取页面xml字符串
    const xml = await fetch(url).then(res => res.text());
    // 字符串xml转换为dom对象
    const dom = new DOMParser().parseFromString(xml, 'text/html');
    // 通过选择器获取数据
    return this.getData(dom, selector);
  }

  async getData(dom: HTMLDocument | Element | null, selector: Selector) {
    if (!dom) {
      return null;
    }

    if (selector.children?.length) {
      const nodes = [...dom.querySelectorAll(selector.selector)];

      if (selector.sub) {
        const url = this.getValue(dom, selector);
        if (!url) {
          return null;
        }
        const data: any = {};
        for (let d of selector.children as Selector[]) {
          data[d.key as string] = await this.fetch(url, d);
        }
        return data;
      }

      return Promise.all(nodes.map(async (node) => {
        const data: any = {};
        for (let d of selector.children as Selector[]) {
          data[d.key as string] = await this.getData(node as HTMLDocument, d);
        }
        return data;
      }));
    }

    return this.getValue(dom, selector);
  }

  getValue(dom: HTMLDocument | Element, selector: Selector) {
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
}
