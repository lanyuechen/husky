import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { Resource, objectId } from '../db/index.ts';

export const list = async (ctx: RouterContext) => {
  const data = await Resource.find().toArray();
  const total = await Resource.count();
  ctx.response.body = {
    success: true,
    data,
    total,
  };
}

export const create = async (ctx: RouterContext) => {
  const data = ctx.state.params;
  const insertId = await Resource.insertOne(data);
  ctx.response.body = insertId;
}

export const update = async (ctx: RouterContext) => {
  const { id } = ctx.params;
  const data = ctx.state.params;
  const { modifiedCount } = await Resource.updateOne(
    { _id: objectId(id as string) },
    { $set: data }
  );
  ctx.response.body = modifiedCount;
}

export const remove = async (ctx: RouterContext) => {
  const { ids } = ctx.state.params;
  const data = {
    _id: {
      $in: ids.map(objectId)
    }
  };
  const count = await Resource.deleteMany(data);
  ctx.response.body = count;
}

