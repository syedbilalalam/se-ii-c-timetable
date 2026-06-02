// import Link from "next/link";
'use client';
import { useRouter } from 'next/navigation';
import { useGlobalCtx } from './global_context';
import { useEffect, useRef, useState } from 'react';

enum PAGES {
    TIME_TABLE = 0,
    OOP_PROJECTS = 1,
    PHYSICS_PROJECTS = 2
}
enum PAGE_TYPE {
    SCHEDULE = 0,
    PROJECTS = 1
}
const PAGE_TYPES = ['SCHEDULE', 'PROJECTS'];

export default function Navbar() {
    let globalCtx = useGlobalCtx();
    const router = useRouter();
    const [pageTitle, setPageTitle] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [loaded, setLoadedFlag] = useState(true);
    const [loadbarStatus, setLoadbarStatus] = useState('');

    const pageLoaded = () => {
        setLoadedFlag(true);
    }

    useEffect(() => {
        if (!loaded) {
            setLoadbarStatus('loading');
        }
        else if (loadbarStatus === 'loading') {
            setPageTitle(pageIndex == PAGES.TIME_TABLE
                ? PAGE_TYPES[PAGE_TYPE.SCHEDULE]
                : PAGE_TYPE[PAGE_TYPE.PROJECTS]
            );
            setLoadbarStatus('loaded');
        }
        if (loaded && loadbarStatus === 'loaded') {
            setTimeout(() => {
                setLoadbarStatus('');
            }, 1000);
        }
    }, [loaded, loadbarStatus]);

    useEffect(() => {
        switch (window.location.pathname.toLowerCase()) {
            case '/':
                setPageIndex(PAGES.TIME_TABLE);
                setPageTitle(PAGE_TYPES[PAGE_TYPE.SCHEDULE]);
                break;
            case '/oop-lab/projects':
                setPageIndex(PAGES.OOP_PROJECTS);
                setPageTitle(PAGE_TYPES[PAGE_TYPE.PROJECTS]);
                break;
            case '/physics-lab/projects':
                setPageIndex(PAGES.PHYSICS_PROJECTS);
                setPageTitle(PAGE_TYPES[PAGE_TYPE.PROJECTS]);
                break;
        }
        globalCtx.pageLoaded = pageLoaded;
    }, []);

    return (
        <>
            <header>

                <div className="header-left">
                    <h1
                        className={!loaded ? 'abstract' : ''}
                    >Class SE2C<span>{pageTitle}</span></h1>
                    {/* <p>Spring 2026 &nbsp;·&nbsp; Academic Timetable</p> */}
                </div>
                <div className="header-right">
                    <span className="semester-badge">Semester 2</span>
                    {/* <span className="total-count">9 Subjects &nbsp;·&nbsp; 5 Days/Week</span> */}
                </div>
            </header>

            <div className={`bar-loader ${loadbarStatus}`}>
                <div className="progress"></div>
                <div className="head"></div>
            </div>

            <div className="page-top-space"></div>
            <div className="days-nav">
                <button
                    className={`day-pill ${loaded && pageIndex === PAGES.TIME_TABLE ? 'active' :
                        pageIndex === PAGES.TIME_TABLE ? 'focused' : ''
                        }`}
                    onClick={() => {
                        if (pageIndex === PAGES.TIME_TABLE) return;
                        setPageIndex(PAGES.TIME_TABLE);
                        setLoadedFlag(false);
                        router.push('/');
                    }}
                >Timetable</button>
                <button
                    className={`day-pill ${loaded && pageIndex === PAGES.OOP_PROJECTS ? 'active' :
                        pageIndex === PAGES.OOP_PROJECTS ? 'focused' : ''
                        }`}
                    onClick={() => {
                        if (pageIndex === PAGES.OOP_PROJECTS) return;
                        setPageIndex(PAGES.OOP_PROJECTS);
                        setLoadedFlag(false);
                        router.push('/oop-lab/projects');
                    }}
                >OOP Lab Projects</button>
                <button
                    className={`day-pill ${loaded && pageIndex === PAGES.PHYSICS_PROJECTS ? 'active' :
                        pageIndex === PAGES.PHYSICS_PROJECTS ? 'focused' : ''
                        }`}
                    onClick={() => {
                        if (pageIndex === PAGES.PHYSICS_PROJECTS) return;
                        setPageIndex(PAGES.PHYSICS_PROJECTS);
                        setLoadedFlag(false);
                        router.push('/physics-lab/projects');
                    }}
                >Physics Lab Projects</button>
            </div>
        </>
    );
}