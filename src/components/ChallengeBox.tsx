import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
    const hasActiveChallenge = true;

    return (
        <div className={styles.challengeBoxContainer}>
            { hasActiveChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Earn 400 xp</header>

                    <main>
                        <img src="icons/body.svg" alt="Exercise"/>
                        <strong>New Challenge</strong>
                        <p>Get up and flex your muscles for 3 minutes.</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                        >
                            Failed
                        </button>
                        <button
                            type="button"
                            className={styles.challengeSucceededButton}
                        >
                            Completed
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                    <strong>Complete a cycle to receive a challenge!</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up"/>
                        Level Up by completing challenges.
                    </p>
                </div>
            )}

            
        </div>
    )
}