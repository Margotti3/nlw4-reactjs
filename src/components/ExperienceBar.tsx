export function ExperienceBar() {
    return (
        <header className="experience-bar">
            <span>0px</span>
            <div>
                <div style={{ width: "60%" }} />
                <span className="current-experience" style={{ left: "60%"}}>
                    360px
                </span>
            </div>
            <span>600px</span>
        </header>
    );
}