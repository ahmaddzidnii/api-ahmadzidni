interface jsonSuccsesProps {
  status_code: number;
  metadata: {
    path_url: string;
    query_params?: {
      [key: string]: string | number;
    };
    params?: {
      [key: string]: string | number;
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
    | {};
}

export const jsonSuccses = (fields: jsonSuccsesProps) => {
  return {
    status_code: fields.status_code,
    metadata: {
      path: fields.metadata.path_url,
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
