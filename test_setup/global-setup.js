const { execSync } = require('child_process');
const { join } = require('path');
const { upAll, exec } = require('docker-compose');
const isPortReachable = require('is-port-reachable');
const dotenv = require('dotenv');

module.exports = async () => {
  console.time('global-setup');
  dotenv.config({ path: '.env.test' });

  const isDBReachable = await isPortReachable(process.env.POSTGRES_PORT);
  // 1
  if (isDBReachable) {
    console.log('DB already started');
  } else {
    console.log('\nStarting up dependencies please wait...\n');
    // 2
    await upAll({
      cwd: join(__dirname),
      log: true
    });

    await exec('postgres', ['sh', '-c', 'until pg_isready ; do sleep 1; done'], {
      cwd: join(__dirname)
    });
    // 3
    console.log('Running migrations...');
    execSync('npx sequelize db:migrate');

    // 4
    console.log('Seeding the db...');
    execSync('npx sequelize db:seed:all');
  }

  console.timeEnd('global-setup');
};
