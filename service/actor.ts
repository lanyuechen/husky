import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { Actor, objectId } from '../db/index.ts';

export const list = async (ctx: RouterContext) => {
  const data = await Actor.find().toArray();
  const total = await Actor.count();
  ctx.response.body = {
    success: true,
    data,
    total,
  };
}

export const create = async (ctx: RouterContext) => {
  const data = ctx.state.params;
  const insertId = await Actor.insertOne(data);
  ctx.response.body = {
    success: true,
    data: insertId
  };
}

export const update = async (ctx: RouterContext) => {
  const { id } = ctx.params;
  const data = ctx.state.params;
  const { modifiedCount } = await Actor.updateOne(
    { _id: objectId(id as string) },
    { $set: data }
  );
  ctx.response.body = {
    success: true,
    data: modifiedCount
  };
}

export const remove = async (ctx: RouterContext) => {
  const { ids } = ctx.state.params;
  const data = {
    _id: {
      $in: ids.map(objectId)
    }
  };
  const count = await Actor.deleteMany(data);
  ctx.response.body = {
    success: true,
    data: count,
  };
}

