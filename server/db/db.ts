import { MongoClient } from "https://deno.land/x/mongo@v0.22.0/mod.ts";

const DB_NAME = 'husky';

const client = new MongoClient();
await client.connect("mongodb://127.0.0.1:27017");

const db = client.database(DB_NAME);

export interface ID {
  $oid: string
}

export default db;