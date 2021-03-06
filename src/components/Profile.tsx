import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const {level} = useContext(ChallengeContext);

    return (
        <div className={styles.profileContainer}>
            <img src="http://github.com/Margotti3.png" alt="margotti" />
            <div>
                <strong>Mateus Margotti</strong>
                <p>
                    <img src="icons/level.svg" alt="level" />
                    Level {level}
                </p>
            </div>
        </div>
    );
}