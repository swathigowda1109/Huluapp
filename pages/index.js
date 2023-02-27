import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import Header from '@/components/Header';
import Nav from '@/components/Nav';
const inter = Inter({ subsets: ['latin'] });
import Results from '@/components/Results';
import request from '@/utils/request';
export default function Home({ results }) {
  console.log(results);
  return (
    <>
      <Head>
        <title>Hulu App</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Nav />
      <Results results={results} />
    </>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;
  const requests = await fetch(
    `https://api.themoviedb.org/3${
      request[genre]?.url || request.fetchTrending.url
    }`
  ).then((res) => res.json());
  return {
    props: {
      results: requests.results,
    },
  };
}
