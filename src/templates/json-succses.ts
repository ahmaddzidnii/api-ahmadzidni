interface jsonSuccsesProps {
  status_code: number;
  message?: string;
  metadata: {
    path_url: string;
    method?: string;
    query_params?: {
      [key: string]: any;
    };
    params?: {
      [key: string]: any;
    };
  };
  pagination?: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
  data:
    | {
        [key: string]: any;
      }[]
    | {}
    | undefined
    | null;
}

export const jsonSuccses = (fields: jsonSuccsesProps) => {
  return {
    status_code: fields.status_code,
    message: fields.message,
    metadata: {
      path: fields.metadata.path_url,
      method: fields.metadata.method,
      query_params: fields.metadata.query_params,
      params: fields.metadata.params,
    },
    pagination: fields.pagination
      ? {
          last_visible_page: fields.pagination?.last_visible_page,
          has_next_page: fields.pagination?.has_next_page,
          current_page: fields.pagination?.current_page,
          items: {
            count: fields.pagination?.items.count,
            total: fields.pagination?.items.total,
            per_page: fields.pagination?.items.per_page,
          },
        }
      : undefined,
    data: fields.data,
  };
};
