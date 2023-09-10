import Layout from "@/layout/Layout";
import axios from "axios";
import Head from "next/head";
import React from "react";

interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
}

interface ListSurahProps {
  listSurah: Surah[];
}

const ListSurah: React.FC<ListSurahProps> = ({ listSurah }) => {
  // console.log(listSurah)
  return (
    <>
    <Head>
    <title>List Ayat</title>
    </Head>
      <Layout>
        <div>
          {listSurah &&
            listSurah.map((d, index) => {
              return <div key={index}><a href={`/Alquran/list-surah/${d.nomor}`}>{d.namaLatin}</a></div>;
            })}
        </div>
      </Layout>
    </>
  );
};

export default ListSurah;

export const getServerSideProps = async () => {
  try {
    const response = await axios.get("https://equran.id/api/v2/surat");
    const listSurah = response.data.data;
    return {
      props: {
        listSurah,
      },
    };
  } catch (error) {
    console.error(error);
  }
};
