import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as pg from "pg";
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
app.use(router.allowedMethods());

const { PORT, DB } = config;
const { Pool, Client } = pg;

const pool = new Pool({
  connectionString: DB
});

pool.query("SELECT NOW()", async (err, res) => {
  console.log(err, res, "pool");
  await pool.end();
});

const client = new Client({
  connectionString: DB
});

const pgsl = (async () => {
  await client.connect();
})();

client.query("SELECT NOW()", async (err, res) => {
  console.log(err, res, "client");
  await client.end();
});

app.listen(PORT);

console.log(`Server started at port ${PORT}`);
