module.exports = {
  apps: [
    {
      name: "tim",
      script: "./build/server.js",
      exec_mode: "cluster",
      instances: "max",
      env_production: {
        NODE_ENV: "production",
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
      "post-deploy": "npm i; node ace build; pm2 reload ecosystem.config.js",
    },
  },
};
