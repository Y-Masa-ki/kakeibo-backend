# Node.jsイメージを使用
FROM node:18-alpine

# 環境変数を定義
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 開発用依存関係も含めてインストール
RUN npm install

# TypeScriptとnodemonをインストール
RUN npm install -g typescript nodemon

# アプリケーションコードをコピー
COPY . .

# TypeScriptのビルドをスキップ（開発中はリアルタイム反映を利用）
# RUN npm run build

# TypeScriptコンパイルとnodemonを並行して実行
CMD ["sh", "-c", "npx tsc --watch & npx nodemon dist/app.js"]

# アプリケーションを実行するポートを公開
EXPOSE 4000
