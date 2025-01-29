import { Context } from 'hono';
import pool from '../db';
import { AmountCategory  } from '../model/amount_category';

export const getAmountCategory = async(c:Context) => {
    console.log('--test--');
    try {
        console.log('--start--')
        const result = await pool.query<AmountCategory>(
            'SELECT * FROM amount_categories WHERE amount_categories.delete_flag = FALSE'
        );
        console.log('--test--', result);
        return c.json({
            status : 200,
            data: result.rows, // 実際のデータ
        });
    }catch(err){
        console.error(err);
        return c.json({ 
            status : 500,
            error: 'データ取得に失敗しました。ダメですよ' }, 500);
    }
}