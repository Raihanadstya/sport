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
        "npm i; node ace build; node ace migration:run; echo 'PORT=4000' >> .env; echo 'HOST=0.0.0.0' >> .env; echo 'NODE_ENV=development' >> .env; echo 'APP_KEY=LVOkLnE8DTLl_Vn0tD6EEjbfkBSXpN7O' >> .env; echo 'DRIVE_DISK=local' >> .env; echo 'SESSION_DRIVER=cookie' >> .env; echo 'CACHE_VIEWS=false' >> .env; echo 'DB_CONNECTION=mysql' >> .env; echo 'MYSQL_HOST=localhost' >> .env;echo 'MYSQL_PORT=3306' >> .env; echo 'MYSQL_USER=root' >> .env; echo 'MYSQL_PASSWORD=wecandobigtogether' >> .env; echo 'MYSQL_DB_NAME=gosports_tim' >> .env; cp .env build/.env; pm2 reload ecosystem.config.js",
    },
  },
};
