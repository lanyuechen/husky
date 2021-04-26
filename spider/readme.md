## Spider

### Selector

| 属性 | 类型 | 描述 | 默认值 | 是否必须 |
| ---- | ---- | ---- | ---- | ---- |
| selector | string | CSS选择器 | - | 是 |
| key | string | 存储数据的key | - | 否 |
| type | string | [类型](#类型) | text | 否 |
| sub | boolean | 是否进入子页面进行抓取 | false | 否 |
| children | Selector[] | 子选择器 | - | 否 |

> 一般情况，如果`selector.children`不为空，则通过`selector.selector`选择器获取到的元素应该为数组。

#### 类型

| 属性值 | 描述 |
| ---- | ---- |
| text | 文本类型，通过`node.innerHTML`获取值 |
| attr:key | 属性类型，通过`node.getAttribute(key)`获取值 |
| page:selector | 页面类型，获取到的对应属性值