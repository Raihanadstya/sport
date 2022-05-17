module.exports = {
  apps: [
    {
      name: "tim",
      script: "./build/server.js",
      exec_mode: "cluster",
      instances: "max",
      env_production: {
        PORT: 3333,
        HOST: "0.0.0.0",
        NODE_ENV: "development",
        APP_KEY: "LVOkLnE8DTLl_Vn0tD6EEjbfkBSXpN7O",
        DRIVE_DISK: "local",
        SESSION_DRIVER: "cookie",
        CACHE_VIEWS: "false",
        DB_CONNECTION: "mysql",
        MYSQL_HOST: "localhost",
        MYSQL_PORT: 3306,
        MYSQL_USER: "root",
        MYSQL_PASSWORD: "wecandobigtogether",
        MYSQL_DB_NAME: "gosports_tim",
      },
    },
  ],
  deploy: {
    production: {
      user: "root",
      host: "68.183.186.249",
      path: "/root/tim-service",
      repo: "git@github.com:go-sport-indonesia/tim-service.git",
      ref: "origin/main",
      key: "~/.ssh/id_rsa",
      "post-deploy": `
      npm i; 
      node ace build;  
      echo 'PORT: 3333' >> ./build/.env;
      echo 'HOST: 0.0.0.0' >> ./build/.env;
      echo 'NODE_ENV: development' >> ./build/.env;
      echo 'APP_KEY: LVOkLnE8DTLl_Vn0tD6EEjbfkBSXpN7O' >> ./build/.env;
      echo 'DRIVE_DISK: local' >> ./build/.env;
      echo 'SESSION_DRIVER: cookie' >> ./build/.env;
      echo 'CACHE_VIEWS: false' >> ./build/.env;
      echo 'DB_CONNECTION: mysql' >> ./build/.env;
      echo 'MYSQL_HOST: localhost' >> ./build/.env;
      echo 'MYSQL_PORT:330' >> ./build/.env;
      echo 'MYSQL_USER: root' >> ./build/.env;
      echo 'MYSQL_PASSWORD: wecandobigtogether' >> ./build/.env;
      echo 'MYSQL_DB_NAME: gosports_tim' >> ./build/.env;
      pm2 reload ecosystem.config.js
      `,
    },
  },
};
