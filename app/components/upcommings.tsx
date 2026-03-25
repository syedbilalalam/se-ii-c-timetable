'use client';
import { ClassTile } from '@/app/page';
import { classes } from '@/app/components/classes';
import { useState, useEffect, useRef } from 'react';
import ListClasses from '@/app/components/list_classes';

export default function Upcommings() {
    const [upcommings, setUpcommings] = useState<ClassTile[]>([]);

    const getCurrentDay = useRef(() => {
        return new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
    });
    const getCurrentTimeInMins = useRef(() => {
        const now = new Date();
        return now.getHours() * 60 + now.getMinutes();
    });

    useEffect(() => {
        const currentTime = getCurrentTimeInMins.current();
        const currentDay = getCurrentDay.current();
        setUpcommings(classes.filter(data => (data.day === currentDay && ((data.startTime + 60) > currentTime))));
    }, [getCurrentDay, getCurrentTimeInMins]);

    return (
        upcommings.length ? (
            <>
                <div id="upcoming-title" className="section-title"><span className="title-accent">⚡</span> Upcoming Classes</div>
                <div className="upcommings-container grid">

                    <ListClasses classes={upcommings} />

                </div>
                <div id="rest-title" className="section-title">All Other Classes</div>
            </>
        ) : (<></>)
    );
}