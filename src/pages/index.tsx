import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <h2>Home</h2>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/posts',
      permanent: false,
    },
  };
};
