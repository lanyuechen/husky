import db, { ID } from './db.ts';

const COLLECTION = 'user';

interface Schema {
  _id: ID;
  name: string;
  password: string;
}

const C = db.collection<Schema>(COLLECTION);

export default C;