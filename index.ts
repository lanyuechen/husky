import { Application, helpers } from "https://deno.land/x/oak/mod.ts";
import router from './router.ts';

const app = new Application();

app.addEventListener("error", (e) => {
  // Will log the thrown error to the console.
  console.log('[error]', e.error);
});

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// cors
app.use(async (ctx, next) => {
  await next();
  ctx.response.headers.set('Access-Control-Allow-Origin', 'http://localhost:8765');
});

// 参数解析
app.use(async (ctx, next) => {
  ctx.state.params = helpers.getQuery(ctx) || {};
  if (ctx.request.hasBody) {
    const body = await ctx.request.body({ type: 'json' }).value;
    Object.assign(ctx.state.params, body);
  }
  await next();
})

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8765 });