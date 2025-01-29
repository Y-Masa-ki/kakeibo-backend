// users テーブルの型定義
export interface User {
    id: number;                 // ID: 自動インクリメント
    user_id: bigint;            // ユーザーID
    user_name: string;          // ユーザー名
    max_amount?: bigint;        // 目標支払額（NULL許容）
    delete_flag: boolean;       // 論理削除フラグ
    created_at: Date;           // 作成日
    updated_at: Date;           // 更新日
  }
  