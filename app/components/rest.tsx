'use client';
import { DAY_NAME, ClassTile } from '@/app/page';
import { classes } from '@/app/components/classes';
import { useState, useEffect, useRef } from 'react';
import ListClasses from '@/app/components/list_classes';

export default function RestClasses() {
    const [restClasses, setRestClasses] = useState<ClassTile[]>([]);

    const getCurrentDay = useRef(() => {
        return new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
    });
    const getCurrentTimeInMins = useRef(() => {
        const now = new Date();
        return now.getHours() * 60 + now.getMinutes();
    });

    useEffect(() => {
        console.log('we are here');
        const currentTime = getCurrentTimeInMins.current();
        const currentDay = getCurrentDay.current();
        setRestClasses(classes.filter(data => (data.day !== currentDay || ((data.startTime + 60) <= currentTime))));
        console.log(restClasses);
    }, [getCurrentDay, getCurrentTimeInMins]);

    return (
        <ListClasses classes={restClasses} disabled={true} />
    );
}