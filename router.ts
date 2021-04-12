import { Router } from "https://deno.land/x/oak/mod.ts";

import * as film from './service/film.ts';
import * as user from './service/user.ts';

const router = new Router({
  prefix: '/api'
});

// 用户相关接口
router
  .get('/profile', user.profile)  // 个人信息
  .post('/login', user.login)     // 登录

// 电影资源管理
router
  .get('/film', film.list)
  .post('/film', film.create)
  .put('/film/:id', film.update)
  .delete('/film', film.remove)

export default router;