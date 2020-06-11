import { initRootUser } from '../service/service.user';
import initMysql from '../database';

(async () => {
  await initMysql();
  await initRootUser();
  process.exit(0);
})();
