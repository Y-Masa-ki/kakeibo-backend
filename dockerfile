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

# TypeScriptが必要な場合を考慮しインストール
RUN npm install -g typescript nodemon

# アプリケーションコードをコピー
COPY . .

# TypeScriptのビルドをスキップ（リアルタイム反映のため、コンテナ内でnodemonやtscを使用）
# RUN npm run build

# アプリケーションの起動コマンドをnodemonに変更
CMD ["npx", "nodemon", "src/app.ts"]

# アプリケーションを実行するポートを公開
EXPOSE 4000
