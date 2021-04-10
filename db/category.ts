import db, { ID } from './db.ts';

const COLLECTION = 'category';

interface Schema {
  _id: ID;
  name: string;
}

const C = db.collection<Schema>(COLLECTION);

export default C;