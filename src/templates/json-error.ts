export const jsonError = (fields: { code: number; error: string }) => {
  return {
    code: fields.code,
    error: fields.error,
  };
};
