// https://deno.land/x/mongo@v0.22.0

import db from './db.ts';

const COLLECTION = 'demo';

interface Schema {
  _id: { $oid: string };
  username: string;
  password: string;
}

const C = db.collection<Schema>(COLLECTION);

export default C;