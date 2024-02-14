interface jsonSuccsesProps {
  code: number;
  metadata: {
    path_url: string;
  };
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
  data: {
    id: number;
    lokasi: string;
  }[];
}

export const jsonSuccses = (fields: jsonSuccsesProps) => {
  return {
    code: fields.code,
    metadata: {
      path: fields.metadata.path_url,
    },
    pagination: {
      last_visible_page: fields.pagination.last_visible_page,
      has_next_page: fields.pagination.has_next_page,
      current_page: fields.pagination.current_page,
      items: {
        count: fields.pagination.items.count,
        total: fields.pagination.items.total,
        per_page: fields.pagination.items.per_page,
      },
    },
    data: fields.data,
  };
};
