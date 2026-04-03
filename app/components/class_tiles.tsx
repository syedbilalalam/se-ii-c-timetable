'use client';
import '@/app/components/rest';
import '@/app/components/upcommings';
import { ClassTile } from '@/app/page';
import { useEffect, useState } from 'react';
import RestClasses from '@/app/components/rest';
import Upcommings from '@/app/components/upcommings';

const MIN_WAITING_TIME = 2000; // Milliseconds

export default function ClassTiles() {

    const [classData, setClassData] = useState<ClassTile[]>([]);

    useEffect(() => {
        (async () => {
            const startTime = Date.now();
            const response = await fetch("https://x40tmdktedsfrmyw.public.blob.vercel-storage.com/ctiles.json");
            const parsedData = await response.json();
            const timeTaken = Date.now() - startTime;
            if (timeTaken < MIN_WAITING_TIME) {
                setTimeout(() => {
                    setClassData(parsedData);
                }, MIN_WAITING_TIME - timeTaken);
            }
        })();
    }, []);

    return (
        classData.length ? (
            <>
                <Upcommings classes={classData} />
                <RestClasses classes={classData} />
            </>
        ) : (
            <div className="loader"></div>
        )
    );
}