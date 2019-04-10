import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import config from "./config";
import router from "./routes";

const app = new Koa();

app.use(
  bodyParser({
    onerror(_, ctx) {
      ctx.throw("body parse error", 422);
    }
  })
);

app.use(router.routes());

const { PORT } = config;

app.listen(PORT);

console.log(`Server started at port ${PORT}`);
