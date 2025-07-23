export interface BatchUpdate {
    id: string;
    name: string;
    start_date: string;
    end_date: string;
    is_active?: boolean;
  }
  
  export interface BatchResponse {
    id: string;
    name: string;
    is_active: boolean;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
  }