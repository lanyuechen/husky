import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { User as C, objectId } from '../db/index.ts';

export const list = async (ctx: RouterContext) => {
  const data = await C.find(
    {},
    { 
      projection: { password: false }
    }
  ).toArray();
  const total = await C.count();
  ctx.response.body = {
    success: true,
    data,
    total,
  };
}

export const create = async (ctx: RouterContext) => {
  const data = ctx.state.params;
  const insertId = await C.insertOne(data);
  ctx.response.body = {
    success: true,
    data: insertId
  };
}

export const update = async (ctx: RouterContext) => {
  const { id } = ctx.params;
  const data = ctx.state.params;
  const { modifiedCount } = await C.updateOne(
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
  const count = await C.deleteMany(data);
  ctx.response.body = {
    success: true,
    data: count,
  };
}
