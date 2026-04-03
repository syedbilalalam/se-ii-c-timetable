import ClassTiles from "@/app/components/class_tiles";

export enum DAY_NAME {
    'mon' = 'Monday',
    'tue' = 'Tuesday',
    'wed' = 'Wednesday',
    'thu' = 'Thursday',
    'fri' = 'Friday',
    'sat' = 'Saturday'
}

export type Day = 'mon'
    | 'tue'
    | 'wed'
    | 'thu'
    | 'fri'
    | 'sat';

export interface ClassTile {
    courseCode: string;
    creditHours: number;
    courseName: string;
    startTime: number;  // in minutes
    duration: number;   // in minutes
    place: string;
    logoName: string;
    teacherName: string;
    teacherStatus: string;
    day: Day;
    classLink: string;
    notAvailable?: string;
}

export default function Home() {
    return (
        <>
            <header>

                <div className="header-left">
                    <h1>Class SE2C<span>Schedule</span></h1>
                    {/* <p>Spring 2026 &nbsp;·&nbsp; Academic Timetable</p> */}
                </div>
                <div className="header-right">
                    <span className="semester-badge">Semester 2</span>
                    {/* <span className="total-count">9 Subjects &nbsp;·&nbsp; 5 Days/Week</span> */}
                </div>
            </header>

            {/* <div className="days-nav">
                <button className="day-pill active">All Days</button>
                <button className="day-pill">Mon</button>
                <button className="day-pill">Tue</button>
                <button className="day-pill">Wed</button>
                <button className="day-pill">Thu</button>
                <button className="day-pill">Fri</button>
                <button className="day-pill">Sat</button>
            </div> */}

            <div className="page-top-space"></div>
            {/* <div className="notice-banner">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span><strong>Alert:</strong> Class timings shown here may not be 100% accurate. If you spot a mistake, report that.</span>
            </div> */}
            <div className="notice-banner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" />
                    <text x="12" y="16" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="serif">i</text>
                </svg>
                <span><strong>Info:</strong> You always need to be signed in to your Teams app with your SSUET Microsoft Account to join online meetings.</span>
            </div>

            <main>
                <div className="grid" id="grid">
                    <ClassTiles />
                </div>
            </main>

            <footer>
                <div className="footer-legend">
                    <div className="legend-item">
                        <div className="legend-dot mon"></div>Monday
                    </div>
                    <div className="legend-item">
                        <div className="legend-dot tue"></div>Tuesday
                    </div>
                    <div className="legend-item">
                        <div className="legend-dot wed"></div>Wednesday
                    </div>
                    <div className="legend-item">
                        <div className="legend-dot thu"></div>Thursday
                    </div>
                    <div className="legend-item">
                        <div className="legend-dot fri"></div>Friday
                    </div>
                    <div className="legend-item">
                        <div className="legend-dot sat"></div>Saturday
                    </div>
                </div>
                <a href="https://github.com/syedbilalalam/se-ii-c-timetable" target="_blank" className="github-link"
                    title="View on GitHub">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>GitHub</span>
                </a>
            </footer>
        </>
    );
}