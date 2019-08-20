# Island RestAPI

## RestAPI 技术实现

- Python Flask/Django(同步编程)
- Java SpringBoot(同步编程)
- NodeJS Koa(异步编程)

## 软件与环境

- 框架/库： Node, npm, koa, nodemon, pm2
- 软件工具：MySQL(XAMPP), 微信开发者工具, VS Code, PostMAN, Navicate,

## Node 应用

- 前段工程
- 服务端API
- 中间件

## Init project and setup modules

```sh
npm init
yarn add koa
npm install -g nodemon
npm install --save-dev @types/koa tslint typescript
vim tsconfig.json
  {
    "compilerOptions": {
      "module": "commonjs",
      "target": "es2015",
      "noImplicitAny": true,
      "moduleResolution": "node",
      "sourceMap": true,
      "outDir": "dist",
      "baseUrl": ".",
      "paths": {
        "*": [
          "node_modules/*",
          "src/types/*"
        ]
      }
    },
    "include": [
      "src/**/*"
    ],
    "exclude": [
      "node_modules"
    ]
  }

vim tslint.json
  {
    "rules": {
      "class-name": true,
      "comment-format": [
        true,
        "check-space"
      ],
      "indent": [
        true,
        "spaces",
        2
      ],
      "one-line": [
        true,
        "check-open-brace",
        "check-whitespace"
      ],
      "no-var-keyword": true,
      "quotemark": [
        true,
        "double",
        "single",
        "avoid-escape"
      ],
      "semicolon": [
        true,
        "always",
        "ignore-bound-class-methods"
      ],
      "whitespace": [
        true,
        "check-branch",
        "check-decl",
        "check-operator",
        "check-module",
        "check-separator",
        "check-type"
      ],
      "typedef-whitespace": [
          true,
          {
            "call-signature": "nospace",
            "index-signature": "nospace",
            "parameter": "nospace",
            "property-declaration": "nospace",
            "variable-declaration": "nospace"
          },
          {
            "call-signature": "onespace",
            "index-signature": "onespace",
            "parameter": "onespace",
            "property-declaration": "onespace",
            "variable-declaration": "onespace"
          }
      ],
      "no-internal-module": true,
      "no-trailing-whitespace": true,
      "no-null-keyword": true,
      "prefer-const": true,
      "jsdoc-format": true
    }
  }

vim package.json
  "scripts": {
      "start": "npm run serve",
      "serve": "node dist/server.js",
      "build": "npm run tslint && npm run build-ts",
      "build-ts": "tsc",
      "watch": "npm run tslint && npm run watch-ts",
      "watch-ts": "tsc -w",
      "tslint": "tslint -c tslint.json -p tsconfig.json"
  }

vim .vscode/launch.json
  {
    "version": "0.2.0",
    "configurations": [
      {
        "type": "node",
        "request": "launch",
        "name": "Node调试",
        "runtimeExecutable": "nodemon",
        "program": "${workspaceFolder}/dist/server.js",
        "restart": true,
        "console": "integratedTerminal",
        "internalConsoleOptions": "neverOpen",
      },
      {
        "type": "node",
        "request": "launch",
        "name": "Launch Program",
        "program": "${workspaceFolder}/dist/server.js",
        "preLaunchTask": "npm: build",
        "outFiles": [
          "${workspaceFolder}/dist/**/*.js"
        ]
      }
    ]
  }

vim .vscode/tasks.json
  {
    "version": "2.0.0",
    "tasks": [
      {
        "type": "npm",
        "script": "build",
        "group": {
          "kind": "build",
          "isDefault": true
        }
      }
    ]
  }
```

启动服务

`npm run watch`

然后在 VSCode debug 中启动名称为 Node 调试 配置的服务, 接下来就可以开始编写你的代码, 断点调试等等.

Node Server

```sh
vim app.ts
  import * as Koa from 'koa';
  const app = new Koa();
  app.use(ctx => {
    ctx.body = 'Hello world';
  });
  module.exports = app;

vim server.ts
  const app = require('./app');
  const server = app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
    console.log('Press CTRL-C to stop \n');
  });
  module.exports = server;
```

```sh
yarn add axios basic-auth bcryptjs jsonwebtoken koa-bodyparser koa-router lodash mysql2 npm-check require-directory sequelize validator module-alias
```

## 全局异常处理

```js
console.log(1/0) // Infinity
console.log(0/0) // NaN
```

[从一张搞笑图看JavaScript的语法和特性](https://blog.kaaass.net/archives/929?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)

### `try catch` 对于异步编程很难捕获

- 回调
- Promise
- async/await

- AOP 面向切面编程

## bcryptjs

[bcryptjs](https://medium.com/@paulrohan/how-bcryptjs-works-90ef4cb85bf4)

## 小程序使用npm

1. 微信开发者工具: 本地设置->使用 npm 模块
2. npm init
3. yarn add lin-ui
4. 微信开发者工具: 工具 -> 构建 npm
5. 按需加载
6. 勾选不校验合法域名、Web-view/TLS...

## 中间层/微服务

前段 <---------- 后端(数据整合) <--------- 服务端(书籍)

微服务 SSO(单点登录)

微服务解决架构问题，不能解决负载问题

