'use client';
import '@/app/components/rest';
import '@/app/components/upcommings';
import { ClassTile } from '@/app/page';
import { useEffect, useState } from 'react';
import RestClasses from '@/app/components/rest';
import Upcommings from '@/app/components/upcommings';

const MIN_WAITING_TIME = 2000; // Milliseconds
const SCHEDULE_VERSION = '7';

export default function ClassTiles() {

    const [classData, setClassData] = useState<ClassTile[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const startTime = Date.now();

            // Preparing URL
            const protocol = 'https:';
            const host = 'x40tmdktedsfrmyw.public.blob.vercel-storage.com';
            const pathname = `/ctiles_v${SCHEDULE_VERSION}.json`;
            const url = `${protocol}//${host}${pathname}`;
            
            // Requesting data
            const response = await fetch(url);
            const parsedData = await response.json();

            // Rendering content
            const timeTaken = Date.now() - startTime;
            if (timeTaken < MIN_WAITING_TIME) {
                setTimeout(() => {
                    setClassData(parsedData);
                }, MIN_WAITING_TIME - timeTaken);
            }
            else {
                setClassData(parsedData);
            }
        };

        const dataLoader = async () => {
            try {
                await loadData();
            }
            catch {
                setTimeout(async () => {
                    await dataLoader();
                }, 5000);
            }
        };

        dataLoader();
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