// income_expenditure テーブルの型定義
export interface IncomeExpenditure {
  id: number;                 // ID: 自動インクリメント
  user_id: bigint;            // ユーザーID
  amount_title: string;       // 利用用途
  income_flag: boolean;       // 収支フラグ
  amount: bigint;             // 金額
  payment_date: Date;         // 決済日
  category_id: bigint;        // 決済カテゴリID
  delete_flag: boolean;       // 論理削除フラグ
  created_at: Date;           // 作成日
  updated_at: Date;           // 更新日
}




