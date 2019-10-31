# gitbook.API.Docs

以 Gitbook 为核心进行强化的框架

## 说明

- 解决 gitbook serve 在 Windows 下发生监听报错的问题，采用 gulp & brower-sync 进行代替
- 维护 gitbook-plugin-customize-bbx ，从而进行功能的开发
- 默认 `./src` 内编写md文件，`./dist` 输出对应内容

## 使用

### 部署

- 依赖包

    ```bash
    npm install
    npm install -g gitbook-cli
    ```

- 安装 gitbook plugin

    ```bash
    npm run setup
    ```

### 运作

- 编写

    ```bash
    npm start
    ```

- 输出 html

    ```bash
    # 方法一
    # 屏蔽错误信息
    npm run html

    # 方法二
    # gitbook执行，不屏蔽错误信息
    gitbook build ./src ./build/html
    ```
