"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const incomeExpenditure_1 = __importDefault(require("./routes/incomeExpenditure"));
const amountCategory_1 = __importDefault(require("./routes/amountCategory"));
const node_server_1 = require("@hono/node-server");
const app = new hono_1.Hono();
// ヘルスチェック
app.get('/', (c) => c.text('Hello, Hono with TypeScript!'));
// ルータ
app.route('/amount', incomeExpenditure_1.default);
app.route('/category', amountCategory_1.default);
// サーバー起動
(0, node_server_1.serve)({
    fetch: app.fetch, // Honoアプリケーションを設定
    port: 4000, // ポート番号を指定
});
//プロパティ'listen'は型 'Hono<Env, BlankSchema, "/">'に存在しません
