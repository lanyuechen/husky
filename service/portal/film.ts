import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { Film, objectId } from '../../db/index.ts';

export const search = async (ctx: RouterContext) => {
  const { keyword } = ctx.state.params;

  const data = await Film.find().toArray();
  const total = await Film.count();
  ctx.response.body = {
    success: true,
    data,
    total,
  };
}
