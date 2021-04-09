import { RouterContext } from "https://deno.land/x/oak/mod.ts";

import { Category } from '../db/index.ts'

export const insert = async (ctx: RouterContext) => {
  const insertId = await Category.insertOne({
    name: 'test'
  });
  ctx.response.body = insertId;
}
