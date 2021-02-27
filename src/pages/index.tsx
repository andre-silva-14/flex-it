import Head from "next/head";
import { GetServerSideProps } from "next";

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import { ChallengeBox } from "../components/ChallengeBox";
import { Profile } from "../components/Profile";

import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";

import styles from '../styles/pages/Home.module.css'


interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Flex.it</title>
        </Head>

        <ExperienceBar/>

        <CountdownProvider>
          <section className={styles.leftContainer}>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  /* API Calls need to happen outside of JSX components
    because otherwise their contents wont show on search
    engines where the javascript does not run. 
    This function is being called on Node.JS server of Next.JS*/

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  
  return {
    props: {
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience ?? 0),
      challengesCompleted: Number(challengesCompleted ?? 0)
    }
  }  
}