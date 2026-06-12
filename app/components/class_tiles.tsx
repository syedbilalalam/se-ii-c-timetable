'use client';
import '@/app/components/rest';
import '@/app/components/upcommings';
import { ClassTile } from '@/app/page';
import { useEffect, useState } from 'react';
import RestClasses from '@/app/components/rest';
import Upcommings from '@/app/components/upcommings';
import { useGlobalCtx } from '@/app/components/global_context';

const MIN_WAITING_TIME = 2000; // Milliseconds
const SCHEDULE_VERSION = '11';

export default function ClassTiles() {

    const [classData, setClassData] = useState<ClassTile[]>([]);
    const { pageLoaded } = useGlobalCtx();

    useEffect(() => {
        if (classData.length) {
            pageLoaded();
        }
    }, [classData]);

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