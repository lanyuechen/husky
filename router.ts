import { Router } from "https://deno.land/x/oak/mod.ts";

import * as film from './service/film.ts';
import * as actor from './service/actor.ts';
import * as director from './service/director.ts';
import * as user from './service/user.ts';

import * as api from './service/api.ts';

import * as portalFilm from './service/portal/film.ts';

const router = new Router({
  prefix: '/api'
});

// 其他接口
router
  .get('/profile', api.profile)  // 个人信息
  .post('/login', api.login)     // 登录

// 用户管理
router
  .get('/user', user.list)
  .post('/user', user.create)
  .put('/user/:id', user.update)
  .delete('/user', user.remove)

// 电影资源管理
router
  .get('/film', film.list)
  .post('/film', film.create)
  .put('/film/:id', film.update)
  .delete('/film', film.remove)

// 演员资源管理
router
  .get('/actor', actor.list)
  .post('/actor', actor.create)
  .put('/actor/:id', actor.update)
  .delete('/actor', actor.remove)

// 导演资源管理
router
  .get('/director', director.list)
  .post('/director', director.create)
  .put('/director/:id', director.update)
  .delete('/director', director.remove)

// portal接口
router
  .get('/portal/film/search', portalFilm.search)    // 综合搜索
  .get('/portal/film/:id', portalFilm.detail)       // 电影详情

export default router;