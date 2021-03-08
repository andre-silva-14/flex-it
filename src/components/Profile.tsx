import { useContext, useEffect, useRef } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'

export function Profile() {
    const progressBar = useRef<SVGPathElement>(null);
    const { level, currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

    const percentageProgressToNextLevel = ~~(currentExperience * 100) / experienceToNextLevel;

    function handleExperienceGain() {
        const length = progressBar.current.getTotalLength();

        // Convert progress percentage to strokeDashoffset
        const strokeDashoffset = length * ((100 - percentageProgressToNextLevel) / 100);

        // Trigger Layout in Safari hack https://jakearchibald.com/2013/animated-line-drawing-svg/
        progressBar.current.getBoundingClientRect();

        progressBar.current.style.strokeDashoffset = String(Math.max(0, strokeDashoffset));
    }

    useEffect(() => {
        if (!progressBar.current) return;

        handleExperienceGain();

    }, [currentExperience])

    useEffect (() => {
        if (!progressBar.current) return;

        const progressBarTransition = 'stroke-dashoffset 850ms ease-in-out'

        // Reset Transition on Level Up.
        progressBar.current.style.transition = 'none';
        handleExperienceGain();
        progressBar.current.style.transition = progressBarTransition;

    }, [level])

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileImage} title={`${currentExperience}/${experienceToNextLevel} XP`}>
                <img src="https://github.com/andre-silva-14.png" alt="André Silva"/>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 200 200"
                >
                    <defs>
                        <linearGradient
                            id="linear-gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                        <stop offset="0%"   stopColor="#0054a8"/>
                        <stop offset="100%" stopColor="#4CD62B"/>
                        </linearGradient>
                    </defs>

                    <path
                        className={styles.backgroundExperienceBar}
                        d="M41 149.5a77 77 0 1 1 117.93 0"
                    />
                    { currentExperience > 0 &&
                        <path
                            className={styles.foregroundExperienceBar}
                            d="M41 149.5a77 77 0 1 1 117.93 0"
                            ref={progressBar}
                            strokeDasharray="350" // Hardcode to avoid visual bug.
                            strokeDashoffset="350" // Hardcode to avoid visual bug.
                        />
                    }
                </svg>
            </div>
            <div>
                <strong>André Silva</strong>
                <p>
                    <img src="icons/level.svg" alt={`Level ${{level}}`}/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}