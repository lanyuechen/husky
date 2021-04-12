import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { createHash } from "https://deno.land/std@0.92.0/hash/mod.ts";
import { User } from '../db/index.ts';

const SALT = '!3#WX_+$a&xT@';

const hashPwd = (password: string) => {
  const hash = createHash("sha256");
  hash.update(SALT + password);
  return hash.toString();
}

export const profile = async (ctx: RouterContext) => {
  const token = ctx.cookies.get('token');
  const data = await User.findOne({token});

  // ctx.response.body = data;

  ctx.response.body = {
    _id: '0',
    name: 'admin',
    access: 'admin'
  };
}

export const login = async (ctx: RouterContext) => {
  const { username, password } = ctx.state.params;
  const hashPassword = hashPwd(password);
  const data = await User.findOne(
    { username, password: hashPassword },
    { 
      projection: { password: false }
    },
  );

  // ctx.response.body = data;

  ctx.response.body = {
    _id: '0',
    name: 'admin',
    access: 'admin'
  };
}
