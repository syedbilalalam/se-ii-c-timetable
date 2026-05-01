import Link from 'next/link';
import type { Metadata } from 'next'
import Navbar from '@/app/components/navigation';
import ProjectTiles from '@/app/components/project_tiles';

export const metadata: Metadata = {
    title: 'SE2C Projects',
}

const FORM_LINK = 'https://docs.google.com/forms/d/e/1FAIpQLSdBd6caVwCcXkHg2wAn3ko2xoku5EkHhp6vfs-54tixK5jdmA/viewform?usp=dialog';

export default function Home() {
    return (
        <>
            <main>
                <div className="grid" id="grid">
                    <ProjectTiles />
                </div>
            </main>

            <footer className="oop-project-footer">
                <p className="footer-legend">
                    Ensure your project is unique before submitting. Use the Google Form button on the right to submit, your data will sync from Google automatically.

                </p>
                <Link href={FORM_LINK} target='_blank' className='github-link'>Google Form</Link>
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