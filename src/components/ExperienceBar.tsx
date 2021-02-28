import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
    const {currentExperience, experienceNextLevel} = useContext(ChallengeContext);

    const percentToNextLevel = Math.round(currentExperience/experienceNextLevel*100);

    return (
        <header className={styles.experienceBar}>
            <span>0px</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }} />
                <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%`}} >
                    {currentExperience} px
                </span>
            </div>
            <span>{experienceNextLevel} px</span>
        </header>
    );
}