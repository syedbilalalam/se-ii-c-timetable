'use client';
import { useRef } from 'react';
import { DAY_NAME, ClassTile } from '@/app/page';

interface ListClassesProps {
    classes: ClassTile[];
}

export default function ListClasses({ classes }: ListClassesProps) {

    const minsToTime = useRef((mins: number) => {
        const hours = Math.floor(mins / 60) % 12 || 12;
        const minutes = String(mins % 60).padStart(2, '0');
        const period = Math.floor(mins / 60) < 12 ? 'AM' : 'PM';
        return `${String(hours).padStart(2, '0')}:${minutes} ${period}`;
    });

    return (
        classes.map((data, index) => (

            <a key={index} href={data.classLink} className={`tile taccent ${data.day}`} data-day={DAY_NAME[data.day]} target='_blank'>
                <div className="tile-inner">
                    <div className="tile-header">
                        <span className="subject-code">{data.courseCode}</span>
                        <span className="credit-badge">{data.creditHours} Credit Hours</span>
                    </div>
                    <div className="subject-name">{data.courseName}</div>
                    <div className="meta-row">
                        <div className="meta-chip">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            {minsToTime.current(data.startTime)}
                        </div>
                        <div className="meta-chip">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            {data.place}
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="instructor-row">
                        <div className="instructor-avatar">{data.logoName}</div>
                        <div className="instructor-name"><strong>{data.teacherName}</strong>{data.teacherStatus}</div>
                    </div>
                    <div className="day-tag">
                        <div className="day-dot"></div>{DAY_NAME[data.day]}
                    </div>
                </div>
            </a>
        ))
    );
}