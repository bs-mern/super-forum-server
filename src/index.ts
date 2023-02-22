import express from "express";
import { createServer } from "http";
import { Redis } from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { createConnection } from "typeorm";

require("dotenv").config();

const main = async () => {
  const redis = new Redis({
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  });

  const RedisStore = connectRedis(session);
  const redisStore = new RedisStore({ client: redis });

  const app = express();
  const router = express.Router();

  await createConnection();

  app.use(
    session({
      store: redisStore,
      name: process.env.COOKIE_NAME,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
      },
    } as any)
  );

  app.use(router);

  router.get("/", (req, res) => {
    let reqSession: any = req.session;
    if (!reqSession.userId) {
      reqSession!.userId = req.query.userId;
      console.log("Userid is set");
      reqSession.loadedCount = 0;
    } else {
      reqSession.loadedCount = Number(reqSession.loadedCount) + 1;
    }
    res.send(
      `userId: ${reqSession.userId}, loadedCount: ${reqSession.loadedCount}`
    );
  });

  const server = createServer(app);

  server.listen({ port: 8000 }, () => {
    console.log("Our server is running!");
  });
};

main();
