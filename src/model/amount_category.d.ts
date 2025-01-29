// amount_categories テーブルの型定義
export interface AmountCategory {
    id: number;                 // ID: 自動インクリメント
    category_name: string;      // 支払いカテゴリ
    delete_flag: boolean;       // 論理削除フラグ
    created_at: Date;           // 作成日
    updated_at: Date;           // 更新日
  }