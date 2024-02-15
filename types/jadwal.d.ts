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

export interface ResponseScheduleDayProps {
  status: boolean;
  request: {
    path: string;
    year: string;
    month: string;
    date: string;
  };
  data: {
    id: number;
    lokasi: string;
    daerah: string;
    jadwal: {
      tanggal: string;
      imsak: string;
      subuh: string;
      terbit: string;
      dhuha: string;
      dzuhur: string;
      ashar: string;
      maghrib: string;
      isya: string;
      date: string;
    };
  };
}

export interface ResponseScheduleMonthProps {
  month: string;
  year: string;
  status: boolean;
  request: {
    path: string;
  };
  data: {
    id: number;
    lokasi: string;
    daerah: string;
    jadwal: {
      tanggal: string;
      imsak: string;
      subuh: string;
      terbit: string;
      dhuha: string;
      dzuhur: string;
      ashar: string;
      maghrib: string;
      isya: string;
      date: string;
    }[];
  };
}
