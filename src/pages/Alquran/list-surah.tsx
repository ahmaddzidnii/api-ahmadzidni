import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import Layout from "@/layout/Layout";
import { Form, InputGroup } from "react-bootstrap";
import ServerError from "@/layout/ServerError";
import NotFound from "@/layout/NotFound";

interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  arti: string;
  tempatTurun: string;
}

interface ListSurahProps {
  listSurah: Surah[];
}

const ListSurah: React.FC<ListSurahProps> = ({ listSurah }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "m" && e.ctrlKey) {
        const inputSearch = document.getElementById("form");
        inputSearch?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      router.push(`/Alquran/list-surah`);
    } else {
      router.push(`/Alquran/list-surah/?q=${query}`);
    }
  };

  return (
    <>
      <Head>
        <title>List Surah - ahmadzidni.site</title>
      </Head>
      <Layout>
        <div className="list-surah-section bg-sky-50 min-vh-100 pb-5">
          <div className="container space-navbar">
            <div className="row mb-2">
              <form className="subnav-search d-flex flex-nowrap">
                <div className="col">
                  <InputGroup className="form-control p-0">
                    <Form.Control
                      id="form"
                      className="search mb-0 p-3 border-1 border-black"
                      placeholder="🔎  Cari surah atau urutan surat... "
                      onChange={(e) => handleSearch(e.target.value)}
                      value={searchQuery}
                      accessKey="m"
                    />
                    <InputGroup.Text className="d-none d-lg-flex border-black" id="basic-addon2">
                      <span>
                        {" "}
                        <kbd className="kbd-keys">CTRL</kbd> + <kbd className="kbd-keys">M</kbd>{" "}
                      </span>
                    </InputGroup.Text>
                  </InputGroup>
                </div>
              </form>
            </div>
            <div className="row">
              {
                listSurah.length == 0 && <ServerError/>
              }
            </div>
            <div className="row">
              {listSurah &&
                listSurah
                  .filter((f) => f.nomor.toString().includes(searchQuery) || f.namaLatin.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((surat) => {
                    return (
                      <div className="col-lg-4" key={surat.nomor}>
                        <div className="card my-3 transisi text-decoration-none">
                          <div className="card-body">
                            <h3 className="card-title">{surat.namaLatin}</h3>
                            <span className="badge rounded-pill bg-sky-600 p-2">{surat.jumlahAyat} Ayat</span>
                            <h1 className="card-subtitle mb-2 text-body-secondary text-end">{surat.nama}</h1>
                            <p className="card-text text-end">
                              {surat.arti} | {surat.tempatTurun}
                            </p>
                            <a href={`/Alquran/${surat.namaLatin}/${surat.nomor}`} className="btn-info btn w-100">
                              Baca Sekarang
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })} 
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ListSurah;

export const getServerSideProps = async () => {
  try {
    const response = await axios.get(`${process.env.QURAN_API_URL}/surat`);
    const listSurah: Surah[] = response.data.data;
    return {
      props: {
        listSurah: listSurah,
      },
    };
  } catch (error) {
    console.error("Error fetching surahs:", error);
    return {
      props: {
        listSurah: [],
      },
    };
  }
};
