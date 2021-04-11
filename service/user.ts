import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { Category, objectId } from '../db/index.ts';

export const profile = async (ctx: RouterContext) => {
  const data = await Category.find().toArray();
  const total = await Category.count();
  ctx.response.body = {
    success: true,
    data,
    total,
  };
}
