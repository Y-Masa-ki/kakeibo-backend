# Node.jsイメージを使用
FROM node:18-alpine

# 環境変数を定義
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションコードをコピー
COPY . .

# TypeScriptをコンパイル
RUN npm run build

# サーバーを起動
CMD ["node", "dist/app.js"]

# アプリケーションを実行するポートを公開
EXPOSE 4000
