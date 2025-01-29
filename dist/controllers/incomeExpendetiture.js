"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAmount = exports.addAmount = exports.getAmount = void 0;
const db_1 = __importDefault(require("../db"));
// 家計簿データの取得
const getAmount = (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = c.req.query();
        const currentPage = query.page ? parseInt(query.page, 10) : 1;
        const itemsPerPage = 10;
        //総コンテンツ数の取得
        const totalContentsResult = yield db_1.default.query('SELECT count(*) AS total FROM income_expenditure WHERE delete_flag = FALSE');
        const totalContents = parseInt(totalContentsResult.rows[0].total, 10);
        // 総ページ数の計算
        const totalPages = Math.ceil(totalContents / itemsPerPage);
        // currentPageに基づいて取得するデータの範囲を計算
        const offset = (currentPage - 1) * itemsPerPage;
        // 指定範囲のデータを取得
        const result = yield db_1.default.query(`SELECT * FROM income_expenditure 
         JOIN amount_categories ON income_expenditure.category_id = amount_categories.id
         WHERE delete_flag = FALSE 
         ORDER BY payment_date DESC
         LIMIT $1 OFFSET $2`, [itemsPerPage, offset]);
        return c.json({
            status: 200,
            currentPage,
            totalPages,
            totalContents,
            data: result.rows, // 実際のデータ
        });
    }
    catch (err) {
        console.error(err);
        return c.json({
            status: 500,
            error: 'データ取得に失敗しました'
        }, 500);
    }
});
exports.getAmount = getAmount;
// 家計簿データの追加
const addAmount = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield c.req.json();
    const { user_id, amount_title, income_flag, amount, payment_date, category_id } = body;
    try {
        const result = yield db_1.default.query(`INSERT INTO income_expenditure (user_id, amount_title, income_flag, amount, payment_date, category_id) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [user_id, amount_title, income_flag, amount, payment_date, category_id]);
        return c.json({
            status: 200,
            data: result.rows[0]
        });
    }
    catch (err) {
        console.error(err);
        return c.json({
            status: 500,
            error: 'データ追加に失敗しました'
        }, 500);
    }
});
exports.addAmount = addAmount;
const deleteAmount = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const pass = yield c.req.param('id');
    try {
        const result = yield db_1.default.query(`UPDATE income_expenditure SET delete_flag = TRUE WHERE id = $1`, [pass]);
        return c.json({
            status: 200,
            message: 'データの削除に成功しました'
        });
    }
    catch (err) {
        console.error(err);
        return c.json({
            status: 500,
            error: 'データの削除に失敗しました'
        }, 500);
    }
});
exports.deleteAmount = deleteAmount;
