/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Details.module.css";

export default function SinglePokemon() {
  const router = useRouter();
  const { pokemonId } = router.query;
  const [pokemon, setPokemon] = useState(null);
  useEffect(() => {
    async function getPokemon() {
      const res = await fetch(
        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${pokemonId}.json`
      );
      setPokemon(await res.json());
    }
    getPokemon();
  }, [pokemon, pokemonId]);
  return (
    <div>
      <Head>
        <title>{pokemon?.name}</title>
      </Head>
      <div>
        <Link href="/">Back to Home</Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon?.image}`}
            alt={pokemon?.name?.english}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon?.name}</div>
          <div className={styles.type}>{pokemon?.type.join(", ")}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon?.stats?.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
