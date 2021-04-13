import db, { ID } from './db.ts';

const COLLECTION = 'actor';

interface Schema {
  _id: ID;
  name: string;                 // 演员姓名
  desc: string;                 // 简介
}

const C = db.collection<Schema>(COLLECTION);

export default C;