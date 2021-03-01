import { ExperienceBar } from '../components/ExperienceBar';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Profile } from '../components/Profile';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';

import Head from 'next/head';
import { GetServerSideProps } from 'next';

import styles from '../styles/pages/Home.module.css';
import { CountDownProvider } from '../contexts/CountDownContext';
import { ChallengesProvider } from '../contexts/ChallengeContext';

interface HomeProps {
  level: number; 
  currentExperience: number; 
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      challengesCompleted={props.challengesCompleted}
      currentExperience={props.currentExperience}
    >
      <div className={styles.container}>
        <ExperienceBar />

        <Head>
          <title>Inicio | move.it</title>
        </Head>

        <CountDownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountDownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: { 
      level: Number(level), 
      currentExperience: Number(currentExperience), 
      challengesCompleted: Number(challengesCompleted)
    }
  };
}