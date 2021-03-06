import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from "js-cookie";
import challenges from '../resources/challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    reward: number;
}

interface ChallengesProviderProps {
    children: ReactNode
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    closeLevelUpModal: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}


export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
    children,
    ...rest
}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpened, setIsLevelUpModalOpened] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

    function levelUp () {
        setLevel(level + 1);
        setIsLevelUpModalOpened(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpened(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = ~~(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('New Challenge 🎉', {
                body: `Rewarding ${challenge.reward} xp !`
            });
        }
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
            closeLevelUpModal,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            completeChallenge
        }}>
            {children}

            { isLevelUpModalOpened && <LevelUpModal /> }
        </ChallengesContext.Provider>
    )
}