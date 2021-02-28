import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengeContext";

interface CountDownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountDownProviderProps{
    children: ReactNode;
}

let countDownTimeout: NodeJS.Timeout;

export const CountDownContext = createContext({} as CountDownContextData);

export function CountDownProvider({children}: CountDownProviderProps) {
    const {startNewChallenge} = useContext(ChallengeContext);

    const [time, setTime] = useState(3);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time/60);
    const seconds = time%60;
    
    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        setIsActive(false);
        clearTimeout(countDownTimeout);
        setHasFinished(false);
        setTime(3);
    }

    useEffect(() => {
        if(isActive && time > 0){
            countDownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        }
        else if(isActive && time == 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);

    return (
        <CountDownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountDownContext.Provider>
    );
}