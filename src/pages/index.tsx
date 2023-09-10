import { Inter } from 'next/font/google'
import Layout from '@/layout/Layout'
import Head from 'next/head'
import Homepage from '@/components/Homepage/Homepage'
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] })

interface UserData {
  name: string;
  email: string;
}

interface HomePageProps {
  datas: UserData[];
}

const Home: React.FC<HomePageProps> = ({ datas }) => {
  return (
    <>
    <Head>
      <title>Beranda ahmadzidni.site</title>
    </Head>
      <Layout>
        <Homepage datas={datas}  />
      </Layout>
    </>
  )
}


export const getServerSideProps = async() =>{
  const response = await axios.get('https://jsonplaceholder.typicode.com/users')
  const datas = response.data;
  return {
      props:{
          datas,
      }
  }
}

export default Home