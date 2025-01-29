import { Context } from 'hono';
import pool from '../db';
import { IncomeExpenditure } from '../model/income_expenditure';

// 家計簿データの取得
export const getAmount= async (c: Context) => {
  try {
    const query = c.req.query();
    const currentPage = query.page ? parseInt(query.page, 10) : 1;
    const itemsPerPage = 10;

    //総コンテンツ数の取得
    const totalContentsResult = await pool.query('SELECT count(*) AS total FROM income_expenditure WHERE income_expenditure.delete_flag = FALSE');
    const totalContents = parseInt(totalContentsResult.rows[0].total, 10);

    // 総ページ数の計算
    const totalPages = Math.ceil(totalContents / itemsPerPage);

    // currentPageに基づいて取得するデータの範囲を計算
    const offset = (currentPage - 1) * itemsPerPage;


    // 指定範囲のデータを取得
    const result = await pool.query<IncomeExpenditure>(
        `SELECT * FROM income_expenditure 
         JOIN amount_categories ON income_expenditure.category_id = amount_categories.id
         WHERE income_expenditure.delete_flag = FALSE 
         ORDER BY income_expenditure.payment_date DESC
         LIMIT $1 OFFSET $2`,
        [itemsPerPage, offset]
    );

    return c.json({
        status : 200,
        currentPage,
        totalPages,
        totalContents,
        data: result.rows, // 実際のデータ
    });
  } catch (err) {
    console.error(err);
    return c.json({ 
        status : 500,
        error: 'データ取得に失敗しましたわよ' }, 500);
  }
};

// 家計簿データの追加
export const addAmount = async (c: Context) => {
  const body = await c.req.json();
  const { user_id, amount_title, income_flag, amount, payment_date, category_id } = body;

  try {
    const result = await pool.query<IncomeExpenditure>(
      `INSERT INTO income_expenditure (user_id, amount_title, income_flag, amount, payment_date, category_id) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [user_id, amount_title, income_flag, amount, payment_date, category_id]
    );
    return c.json({
        status : 200,
        data : result.rows[0]
    });
  } catch (err) {
    console.error(err);
    return c.json({
        status : 500,
        error: 'データ追加に失敗しました' }, 500);
  }
};

export const deleteAmount = async(c:Context) => {
    const pass = await c.req.param('id');
    try{
        const result = await pool.query<IncomeExpenditure>(
            `UPDATE income_expenditure SET delete_flag = TRUE WHERE id = $1`,
            [pass]
        );
        return c.json({
            status : 200,
            message : 'データの削除に成功しました'
        })
    }catch(err){
        console.error(err);
        return c.json({
            status : 500,
            error : 'データの削除に失敗しました'
        }, 500)
    }
    

}
