import { Hono } from 'hono';
import expensesRouter from './routes/incomeExpenditure';
import amountCategoryRouter from './routes/amountCategory';
import type { Env } from 'hono';
import { serve } from '@hono/node-server';
type AppEnv = Env;

const app = new Hono<AppEnv>();

// ヘルスチェック
app.get('/', (c) => c.text('Hello, Hono with TypeScript!だよ'));

// ルータ
app.route('/amount', expensesRouter);
app.route('/category', amountCategoryRouter);

// サーバー起動
serve({
    fetch: app.fetch, // Honoアプリケーションを設定
    port: 4000,       // ポート番号を指定
});

  //プロパティ'listen'は型 'Hono<Env, BlankSchema, "/">'に存在しません