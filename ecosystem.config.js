module.exports = {
  apps: [
    {
      name: "tim",
      script: "./build/server.js",
      exec_mode: "cluster",
      instances: "max",
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
      "post-deploy":
        "npm i; node ace build; echo 'PORT=4000' >> ./build/.env; echo 'HOST=0.0.0.0' >> ./build/.env; echo 'NODE_ENV=development' >> ./build/.env; echo 'APP_KEY=LVOkLnE8DTLl_Vn0tD6EEjbfkBSXpN7O' >> ./build/.env; echo 'DRIVE_DISK=local' >> ./build/.env; echo 'SESSION_DRIVER=cookie' >> ./build/.env; echo 'CACHE_VIEWS=false' >> ./build/.env; echo 'DB_CONNECTION=mysql' >> ./build/.env; echo 'MYSQL_HOST=localhost' >> ./build/.env;echo 'MYSQL_PORT=3306' >> ./build/.env; echo 'MYSQL_USER=root' >> ./build/.env; echo 'MYSQL_PASSWORD=wecandobigtogether' >> ./build/.env; echo 'MYSQL_DB_NAME=gosports_tim' >> ./build/.env; pm2 reload ecosystem.config.js",
    },
  },
};
