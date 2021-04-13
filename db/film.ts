import db, { ID } from './db.ts';

const COLLECTION = 'film';

export interface Schema {
  _id: ID;
  name: string;                 // 资源名称
  desc: string;                 // 资源简介
}

const C = db.collection<Schema>(COLLECTION);

export default C;