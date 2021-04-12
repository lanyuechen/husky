import { Router } from "https://deno.land/x/oak/mod.ts";

import * as category from './service/category.ts';
import * as resource from './service/resource.ts';
import * as user from './service/user.ts';

const router = new Router({
  prefix: '/api'
});

router
  .get('/profile', user.profile)
  .post('/login', user.login)

router
  .get('/category', category.list)
  .post('/category', category.create)
  .put('/category/:id', category.update)
  .delete('/category', category.remove)   // 批量移除

router
  .get('/resource', resource.list)
  .post('/resource', resource.create)
  .put('/resource/:id', resource.update)
  .delete('/resource', resource.remove)   // 批量移除

export default router;