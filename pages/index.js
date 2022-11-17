/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    async function getPokemons() {
      const res = await fetch(
        "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
      );
      setPokemons(await res.json());
    }
    getPokemons();
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <div className={styles.grid}>
        {pokemons.map((pokemon) => {
          return (
            <div className={styles.card} key={pokemon.id}>
              <Link href={`/pokemon/${pokemon.id}`}>
                <img
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                  alt={pokemon.name}
                  title={pokemon.name}
                />
              </Link>
              <h3 className={styles.text}>{pokemon.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
