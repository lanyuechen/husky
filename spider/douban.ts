import Spider from './index.ts';

const spider = new Spider('https://movie.douban.com/top250?start=[0:0:25]', {
  selector: '.grid_view .item',
  children: [
    {
      selector: '.info .title:first-child',
      key: 'title',
    },
    {
      selector: '.info .hd a',
      key: 'info',
      type: 'attr:href',
      sub: true,
      children: [
        {
          selector: '[property="v:summary"]',
          key: 'desc',
        }
      ]
    },
    {
      selector: '.rating_num',
      key: 'rate',
    }
  ]
});

spider.run();