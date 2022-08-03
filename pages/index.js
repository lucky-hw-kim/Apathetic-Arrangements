import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import css from "../styles/home.module.css"
import Hero from "../components/Hero"
import About from "../components/About"
import Arrangements from "../components/Arrangements"
import { client } from "../lib/client";
  

export default function Home({flowers}) {
  return (
    <Layout>
      <div >
        <Head>
          <title>Apathetic Arrangements</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* Body */}
        <main>
          <Hero/>
          <About/>
          <Arrangements flowers = {flowers}/>
        </main>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "flower"]';
  const flowers = await client.fetch(query);
  return {
    props: {
      flowers
    }
  }
}