import Layout from '@/layout/Layout';
import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import React from 'react';

// BOOTSTRAP 5
import { Form, InputGroup } from "react-bootstrap";
import { Badge } from "react-bootstrap";

// Tentukan tipe data yang sesuai dengan respons API
interface SpesificSurah {
  nomor: number;
  nama: string;
  namaLatin: string;
  ayat: any; // Ganti 'any' dengan tipe yang sesuai
  // Tambahkan properti lain sesuai kebutuhan
}

interface SpesificSurahProps {
  specificSurah: SpesificSurah;
  specificAyat: any;
}

const DetailSurat: React.FC<SpesificSurahProps> = ({ specificSurah, specificAyat }) => {
  // console.log(specificAyat);
  return (
    <>
    <Head>
      <title>{specificSurah.namaLatin}</title>
    </Head>
    <Layout>
    <div className="mt-5">
      {specificAyat &&  (
        <div>
          <h2>{specificSurah.namaLatin}</h2>
          <ul>
            {specificSurah && specificSurah.ayat.map((ayat:any, index:number) => (
              <li key={index}>{ayat.teksLatin}</li> // Ganti dengan properti yang sesuai untuk teks ayat
            ))}
          </ul>
        </div>
      )}
    </div>
    </Layout>
    </>
   
  );
};

export default DetailSurat;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { params } = context;

  try {
    const id = params?.id?.[1];

    if (id == undefined || id == '') {
      throw new Error('ID tidak valid');
    }

    const response = await axios.get(`${process.env.QURAN_API_URL}/surat/${id}`);
    const specificSurah: SpesificSurah = response.data.data;
    // Dapatkan data ayat dari specificSurah
    const specificAyat = specificSurah.ayat;

    return {
      props: {
        specificSurah: specificSurah,
        specificAyat: specificAyat,
      },
    };
  } catch (error) {
    console.error('Terjadi kesalahan:', error);

    // Atur data default atau kosong jika terjadi kesalahan
    return {
      props: {
        specificSurah: {
          nomor: 0,
          nama: '',
          namaLatin: '',
          ayat: [],
        },
      },
    };
  }
};
