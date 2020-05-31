import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import router from './routes';
import initMysql from './database';

(async () => {
  await initMysql();

  const app = express();
  // 静态资源托管
  app.use('/', express.static(path.resolve(__dirname, '../static/public')));
  // 解析json请求数据
  app.use(bodyParser.json());
  // 解析urlencoded请求数据
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  router(app);

  const port = process.env.PORT || 80;
  app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`);
  });
})();
