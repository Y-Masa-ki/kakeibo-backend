// fixed_expenses テーブルの型定義
export interface FixedExpense {
    id: number;                 // ID: 自動インクリメント
    user_id: bigint;            // ユーザーID
    amount_name: string;        // 決済名
    income_flag: boolean;       // 収支フラグ
    fixed_amount: bigint;       // 固定決済費
    category_id: bigint;        // 決済カテゴリID
    delete_flag: boolean;       // 論理削除フラグ
    created_at: Date;           // 作成日
    updated_at: Date;           // 更新日
  }
  