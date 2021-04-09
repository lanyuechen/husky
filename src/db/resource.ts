import db, { ID } from './db.ts';

const COLLECTION = 'resource';

interface SourceSchema {
  url: string;          // 资源链接（在线观看）
  active: boolean;      // 资源是否可用
  ut: number;           // 资源更新时间
}

interface Schema {
  _id: ID;
  category: ID;                 // 资源分类id
  name: string;                 // 资源名称
  desc: string;                 // 资源简介
  source: SourceSchema[];       // 资源列表
}

const C = db.collection<Schema>(COLLECTION);

export default C;