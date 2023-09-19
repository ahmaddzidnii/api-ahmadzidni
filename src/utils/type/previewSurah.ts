export type Ayat = {
    nomorAyat: number;
    teksArab: string;
    teksLatin: string;
    teksIndonesia: string;
    audio: any;
  };


  export type SpesificSurah = {
    nomor: number;
    nama: string;
    namaLatin: string;
    deskripsi: string;
    tempatTurun: string;
    suratSebelumnya: any;
    suratSelanjutnya: any;
    audioFull: any;
    ayat: any;
  }