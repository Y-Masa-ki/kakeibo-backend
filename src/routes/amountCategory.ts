import { Hono } from 'hono';
import * as amountCategoryControllers from '../controllers/amountCategory';

const amountCategoryRouter = new Hono();

amountCategoryRouter.get('/list', amountCategoryControllers.getAmountCategory);

export default amountCategoryRouter;