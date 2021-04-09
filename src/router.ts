import { Router } from "https://deno.land/x/oak/mod.ts";

import * as category from './service/category.ts';

const router = new Router();
router
  .get('/category', category.insert)
  .post('/category', category.insert)


export default router;