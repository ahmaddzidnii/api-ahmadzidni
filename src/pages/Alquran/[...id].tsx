import Layout from "@/layout/Layout";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import React from "react";

// BOOTSTRAP 5
import { Form, InputGroup } from "react-bootstrap";
import { Badge } from "react-bootstrap";

interface SpesificSurah {
  nomor: number;
  nama: string;
  namaLatin: string;
  deskripsi: string;
  tempatTurun: string;
  suratSebelumnya: any;
  suratSelanjutnya: any;
  ayat: any;
}

interface SpesificSurahProps {
  specificSurah: SpesificSurah;
  specificAyat: any;
}

type Ayat = {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: any;
};

const DetailSurat: React.FC<SpesificSurahProps> = ({ specificSurah, specificAyat }) => {
  // console.log(specificSurah.suratSebelumnya);
  return (
    <>
      <Head>
        <title>{specificSurah.namaLatin}</title>
        <meta name="description" content={specificSurah.deskripsi} />
      </Head>
      <Layout>
        <div className="bg-sky-50">
          <div className="container space-navbar pb-5">
            <div className="row mb-2">
              <div className="col-md-12">
                <div className="card p-1 p-lg-4 rounded-5 rounded-bottom-4 bg-sky-100">
                  <div className="card-body">
                    <h1 className="card-title">{specificSurah.namaLatin}</h1>
                    <h6 className="card-subtitle mb-2 text-body-secondary"></h6>
                    <p className="card-text">Tempat turun : {specificSurah.tempatTurun}</p>
                    <strong>
                      <p className="card-text">Deskripsi Surah :</p>
                    </strong>
                    <div style={{ textAlign: "justify" }} className="card-text">
                      <div dangerouslySetInnerHTML={{ __html: specificSurah.deskripsi }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-4 mb-1">
                {specificSurah.suratSebelumnya != false && (
                  <div>
                    <a href={`/Alquran/${specificSurah.suratSebelumnya.namaLatin}/${specificSurah.suratSebelumnya.nomor}`} className="w-100 btn btn-info me-2">
                      ⬅️ {specificSurah.suratSebelumnya.namaLatin} {specificSurah.suratSebelumnya.nama}{" "}
                    </a>
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-1">
                {/* <div>
                <audio src={surat.audioFull["05"]} ref={audioRef} onPlay={() => setIsAudioPlaying(true)} onPause={() => setIsAudioPlaying(false)}></audio>
                <button className="btn btn-info w-100" onClick={handleAudioPlayPause}>
                  {isAudioPlaying ? " ⏹️ Pause Surah" : " ▶️ Play Full Surah"}
                </button>
              </div>
            </div>
            <div className="col-md-4 mb-1">
            <a href={`/Alquran/tafsir/${surat.nomor}`} className="w-100 btn btn-info me-2">
              📃Tafsir
              </a>
            </div> */}
              </div>
              {/* <div className="row mt-3">
            <form className="subnav-search d-flex flex-nowrap">
              <div className="col">
                <InputGroup className="form-control p-0">
                  <Form.Control onChange={(e) => setSearch(e.target.value)} id="form" className="search mb-0 p-3 border-1 border-black" placeholder="🔎  cari urutan ayat atau penggalan arti..." />
                  <InputGroup.Text className="d-none d-lg-flex border-black bg-sky-100" id="basic-addon2">
                  <span> <kbd className="kbd-keys">CTRL</kbd> + <kbd className="kbd-keys">M</kbd> </span>
                  </InputGroup.Text>
                </InputGroup>
              </div>
            </form>
          </div> */}
            </div>
            <div className="row">
              {specificAyat &&
                specificAyat.map((ayat: Ayat) => {
                  return (
                    <div className="col-md-12" key={ayat.nomorAyat}>
                      <div className="card my-3 text-decoration-none p-1 p-lg-4 rounded-4 bg-sky-100">
                        <div className="card-body">
                          <Badge bg="info" className="bg-sky-600 me-2 my-5 p-3 fs-2 ms-0 ms-lg-3">
                            {ayat.nomorAyat}
                          </Badge>
                          <h1 className="card-subtitle mb-2 text-body-secondary text-end">{ayat.teksArab}</h1>
                          <p style={{ textAlign: "justify" }} className="card-text">
                            {ayat.teksLatin}
                          </p>
                          <hr />
                          <p style={{ textAlign: "justify" }} className="card-text">
                            {ayat.teksIndonesia}
                          </p>
                          <hr />

                          <audio className="w-100 border-2 rounded-5 border-black border" controls src={ayat.audio["05"]}></audio>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="row">
            <div className="col-md-5 offset-md-7">
              {
                specificSurah.suratSelanjutnya != false && <div>
                  <a href={`/Alquran/${specificSurah.suratSelanjutnya.namaLatin}/${specificSurah.suratSelanjutnya.nomor}`} className="btn btn-info w-100">
                  {specificSurah.suratSelanjutnya.namaLatin} {specificSurah.suratSelanjutnya.nama} ➡️
                </a>
                </div>
              }
            </div>
          </div>
          </div>
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

    if (id == undefined || id == "") {
      throw new Error("ID tidak valid");
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
    console.error("Terjadi kesalahan:", error);

    // Atur data default atau kosong jika terjadi kesalahan
    return {
      props: {
        specificSurah: {
          nomor: null,
          nama: "",
          namaLatin: "",
          ayat: [],
        },
      },
    };
  }
};
