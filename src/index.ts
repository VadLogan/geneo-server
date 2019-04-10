import * as Koa from "koa";
import config from "./config";

const app = new Koa();

const { PORT } = config;

app.listen(PORT);

console.log(`Server started at port ${PORT}`);
