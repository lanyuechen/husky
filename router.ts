import { Router } from "https://deno.land/x/oak/mod.ts";

import * as category from './service/category.ts';
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
  .delete('/category', category.remove)

export default router;