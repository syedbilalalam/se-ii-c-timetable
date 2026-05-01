// import Link from "next/link";
'use client';
import { useRouter } from 'next/navigation';
import { useGlobalCtx } from './global_context';
import { useEffect, useRef, useState } from 'react';

interface NavbarProps {
    title: string;
}

const PAGE_NAMES = ['SCHEDULE', 'PROJECTS'];

export default function Navbar(props: NavbarProps) {
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
            setPageTitle(PAGE_NAMES[pageIndex]);
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
                setPageIndex(0);
                setPageTitle(PAGE_NAMES[0]);
                break;
            case '/oop-lab/projects':
                setPageIndex(1);
                setPageTitle(PAGE_NAMES[1]);
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
                    className={`day-pill ${loaded && pageIndex === 0 ? 'active' :
                        pageIndex === 0 ? 'focused' : ''
                        }`}
                    onClick={() => {
                        if (pageIndex === 0) return;
                        setPageIndex(0);
                        setLoadedFlag(false);
                        router.push('/');
                    }}
                >Timetable</button>
                <button
                    className={`day-pill ${loaded && pageIndex === 1 ? 'active' :
                        pageIndex === 1 ? 'focused' : ''
                        }`}
                    onClick={() => {
                        if (pageIndex === 1) return;
                        setPageIndex(1);
                        setLoadedFlag(false);
                        router.push('/oop-lab/projects');
                    }}
                >OOP Lab Projects</button>
            </div>
        </>
    );
}