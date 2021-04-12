import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { Film, objectId } from '../../db/index.ts';

export const search = async (ctx: RouterContext) => {
  const { keyword } = ctx.state.params;

  const data = await Film.find({
    name: { $regex: keyword }
  }).toArray();
  const total = await Film.count();

  ctx.response.body = {
    success: true,
    data,
    total,
  };
}

export const detail = async (ctx: RouterContext) => {
  const { id } = ctx.params;

  const data = await Film.findOne({_id: objectId(id as string)});

  ctx.response.body = {
    success: true,
    data,
  };
}
