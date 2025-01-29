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
exports.getAmountCategory = void 0;
const db_1 = __importDefault(require("../db"));
const getAmountCategory = (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('--start--');
        const result = yield db_1.default.query('SELECT * FROM amount_categories WHERE amount_categories.delete_flag = FALSE');
        console.log('--test--', result);
        return c.json({
            status: 200,
            data: result.rows, // 実際のデータ
        });
    }
    catch (err) {
        console.error(err);
        return c.json({
            status: 500,
            error: 'データ取得に失敗しました。ダメですよ'
        }, 500);
    }
});
exports.getAmountCategory = getAmountCategory;
