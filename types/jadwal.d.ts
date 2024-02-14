export interface ResponseLokasi {
  status: boolean;
  request: {
    path: string;
  };
  data: {
    id: string;
    lokasi: string;
  }[];
}
