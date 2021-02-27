import { createContext, ReactNode, useState } from 'react';
import challenges from '../resources/challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    reward: number;
}

interface ChallengesProviderProps {
    children: ReactNode
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}


export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp () {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = ~~(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) return;

        const { reward } = activeChallenge;

        let totalExperience = currentExperience + reward;

        if (totalExperience >= experienceToNextLevel) {
            levelUp();
            totalExperience -= experienceToNextLevel;
        }

        setCurrentExperience(totalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider value={{
            level,
            currentExperience,
            challengesCompleted,
            experienceToNextLevel,
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            completeChallenge
        }}>
            {children}
        </ChallengesContext.Provider>
    )
}