import { Hono } from 'hono';
import * as amountController from '../controllers/incomeExpendetiture';

const amountRouter = new Hono();

// 家計簿データの取得
//amountRouter.get('/list', amountController.getExpenses);

// 家計簿データの追加
amountRouter.post('/create', amountController.addAmount);
amountRouter.get(`/list`, amountController.getAmount);
amountRouter.post('/delete/:id', amountController.deleteAmount);

export default amountRouter;
