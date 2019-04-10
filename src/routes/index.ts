import * as Router from "koa-router";

const router = new Router();

router.get("root", "/", async (ctx, next) => {
  ctx.body = "hello world";
  await next();
});

export default router;
