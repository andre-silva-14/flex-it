import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import Head from "next/head";

import styles from '../styles/pages/Home.module.css'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Flex.it</title>
      </Head>

      <ExperienceBar/>

      <section className={styles.leftContainer}>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
      </section>
    </div>
  )
}
