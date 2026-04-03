'use client';
import { ClassTile } from '@/app/page';
import { useState, useEffect, useRef } from 'react';
import ListClasses from '@/app/components/list_classes';

interface RestClassesProps {
    classes: ClassTile[];
}

export default function RestClasses({ classes }: RestClassesProps) {
    const [restClasses, setRestClasses] = useState<ClassTile[]>([]);

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
        setRestClasses(classes.filter(data => (data.day !== currentDay || ((data.startTime + (data.duration - 10)) <= currentTime))));
    }, [getCurrentDay, getCurrentTimeInMins]);

    return (
        <ListClasses classes={restClasses} disabled={true} />
    );
}