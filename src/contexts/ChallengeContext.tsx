import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengeContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({children}: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceNextLevel = Math.pow((level+1)*4,2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    function levelUp() {
        setLevel(level+1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random()*challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === "granted") {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount} xp`
            });
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if(!activeChallenge){
            return;
        }

        const {amount} = activeChallenge;

        let finalExperienec = currentExperience+amount;

        if(finalExperienec >= experienceNextLevel) {
            finalExperienec -= experienceNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperienec);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted+1);
    }

    return(
        <ChallengeContext.Provider value={{
            level,
            currentExperience,
            challengesCompleted,
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            experienceNextLevel,
            completeChallenge
        }}>
            {children}
        </ChallengeContext.Provider>
    );
}