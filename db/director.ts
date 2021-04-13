import db, { ID } from './db.ts';

const COLLECTION = 'director';

interface Schema {
  _id: ID;
  name: string;                 // 导演姓名
  desc: string;                 // 简介
}

const C = db.collection<Schema>(COLLECTION);

export default C;