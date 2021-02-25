import styles from '../styles/components/Profile.module.css'

export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/andre-silva-14.png" alt="André Silva"/>
            <div>
                <strong>André Silva</strong>
                <p>
                    <img src="icons/level.svg" alt="Level 1"/>
                    Level 1
                </p>
            </div>
        </div>
    );
}