import './style.css';

export default function ExperienceBar() {
    return (
        <header className="experience-bar">
            <span>0 xp</span>
            <div>
                <div className="progress" style={{width: '60%'}}/>
                <span className="current-experience" style={{left: '60%'}}>300 xp</span>
            </div>
            <span>600 xp</span>
        </header>
    );
};