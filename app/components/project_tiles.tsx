'use client';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { toastParams } from '@/app/components/list_classes';
import { useGlobalCtx } from '@/app/components/global_context';
import { fromUnix, moveElement, toInitials } from '@/app/components/project_tiles_components';
// Stylesheet
import '@/app/assets/projects.css'

enum PROJECT_TILE {
    TIME_STAMP,
    NAME,
    MEMBER_I,
    MEMBER_II,
    MEMBER_III,
    MEMBER_IV,
    DESCRIPTION,
    PRJ_NO,
    STATUS
}

interface Member {
    batch: string;
    depart: string;
    rollNo: number;
    name?: string;
}
interface ProjectMembers {
    leader: Member;
    second: Member;
    third?: Member;
    fourth?: Member;
}
interface ProjectTile {
    name: string;
    member: ProjectMembers;
    description: string;
    active: boolean;
    timeStamp: number;
    status: 'APPROVED' | 'NOT_APPROVED';
}

const PMS_VERSION = '5';
const MIN_WAITING_TIME = 2000; // Milliseconds
const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export default function ProjectTiles() {

    const [projectTiles, setProjectTiles] = useState<ProjectTile[]>([]);
    const { pageLoaded } = useGlobalCtx();

    useEffect(() => {
        const toUnix = (isoStr: string) => {
            return Math.floor(new Date(isoStr).getTime() / 1000);
        }

        const parseRollNumber = (str: string, defaultBatch = '2025F', defaultDept = 'BSE') => {
            str = str.trim();
            str = str.toUpperCase();
            const result = { batch: defaultBatch, depart: defaultDept, rollNo: 0 };

            if (!str || typeof str !== 'string') return result;

            const parts = str.trim().split('-');

            const batchPattern = /^\d{4}[A-Z]$/;
            const deptPattern = /^[A-Z]{2,5}$/;
            const rollPattern = /^\d+$/;

            let batchFound = false;
            let deptFound = false;
            let rollFound = false;

            for (const part of parts) {
                if (!rollFound && rollPattern.test(part) && !batchPattern.test(part)) {
                    result.rollNo = parseInt(part, 10);
                    rollFound = true;
                } else if (!batchFound && batchPattern.test(part)) {
                    result.batch = part;
                    batchFound = true;
                } else if (!deptFound && deptPattern.test(part) && !batchPattern.test(part)) {
                    result.depart = part;
                    deptFound = true;
                }
            }

            return result;
        }
        const loadData = async () => {
            const startTime = Date.now();
            // Preparing URL
            const protocol = 'https:';
            const host = 'script.google.com';
            const refererId = 'AKfycbwrjy65lG4RlmluatPmcAZuUJs0NutTwIlHz5XY4rCJv7t0X6Gl1HlyuLH5mb1Hd5k-'
            const pathname = `/macros/s/${refererId}/exec`;
            const url = `${protocol}//${host}${pathname}`;

            // Requesting data
            const response = await fetch(url);
            const parsedData = await response.json();

            // Rendering content
            const timeTaken = Date.now() - startTime;
            if (timeTaken < MIN_WAITING_TIME) {
                setTimeout(() => {
                    return parsedData;
                }, MIN_WAITING_TIME - timeTaken);
            }
            else {
                return parsedData;
            }
        };
        const loadMembers = async () => {
            const startTime = Date.now();
            // Preparing URL
            const protocol = 'https:';
            const host = 'x40tmdktedsfrmyw.public.blob.vercel-storage.com';
            const refererId = 'AKfycbwrjy65lG4RlmluatPmcAZuUJs0NutTwIlHz5XY4rCJv7t0X6Gl1HlyuLH5mb1Hd5k-'
            const pathname = `/pms_v${PMS_VERSION}.json`;
            const url = `${protocol}//${host}${pathname}`;

            // Requesting data
            const response = await fetch(url);
            const parsedData = await response.json();

            return new Promise<{ [key: string]: string | undefined }>((resolve) => {

                // Rendering content
                const timeTaken = Date.now() - startTime;
                if (timeTaken < MIN_WAITING_TIME) {
                    setTimeout(() => {
                        resolve(parsedData);
                    }, MIN_WAITING_TIME - timeTaken);
                }
                else {
                    resolve(parsedData);
                }
            });
        };

        const dataLoader = async () => {
            try {
                const tasks = {
                    loadData: loadData(),
                    loadMembers: loadMembers()
                }
                await Promise.all([tasks.loadData, tasks.loadMembers]); // Loading in parallel

                const rawDataset: string[] = await tasks.loadData;
                const members = await tasks.loadMembers;

                {
                    await Promise.all([rawDataset, members]);

                }

                // Order update
                const cpyRawDataset = [...rawDataset];
                for (let i = 0; i < cpyRawDataset.length; i++) {
                    const prjNo = parseInt(cpyRawDataset[i][PROJECT_TILE.PRJ_NO]);
                    if (prjNo && !Number.isNaN(prjNo)) {
                        moveElement(rawDataset, i, prjNo);
                    }
                }

                const tiles: ProjectTile[] = [];
                for (let i = 1; i < rawDataset.length; i++) {
                    const rawData = rawDataset[i];

                    const leader_info: Member = parseRollNumber(rawData[PROJECT_TILE.MEMBER_I]);
                    const member_ii: Member = parseRollNumber(rawData[PROJECT_TILE.MEMBER_II]);
                    const member_iii: Member = parseRollNumber(rawData[PROJECT_TILE.MEMBER_III]);
                    const member_iv: Member = parseRollNumber(rawData[PROJECT_TILE.MEMBER_IV]);

                    const updateName = (member: Member) => {
                        const { batch, depart, rollNo } = member;
                        member.name = members[
                            `${batch}-${depart}-${String(rollNo).padStart(3, '0')}`
                        ] || '<Name Not Found>';
                    }
                    updateName(leader_info);
                    updateName(member_ii);
                    updateName(member_iii);
                    updateName(member_iv);

                    tiles.push({
                        name: rawData[PROJECT_TILE.NAME],
                        member: {
                            leader: leader_info,
                            second: member_ii,
                            third: member_iii,
                            fourth: member_iv
                        },
                        description: rawData[PROJECT_TILE.DESCRIPTION],
                        active: true,
                        timeStamp: toUnix(rawData[PROJECT_TILE.TIME_STAMP]),
                        status: rawData[PROJECT_TILE.STATUS] as ProjectTile['status']
                    });

                    setProjectTiles(tiles);
                }

            }
            catch {
                setTimeout(async () => {
                    await dataLoader();
                }, 5000);
            }
        };

        dataLoader();
    }, []);

    useEffect(() => {
        if (projectTiles.length) {
            pageLoaded();
        }
    }, [projectTiles]);

    return (
        projectTiles.length ? (
            projectTiles.map((data, index) => {
                const approved = data.status === 'APPROVED';
                return (

                    <div key={index}
                        className={`project tile taccent ${DAYS[index % 6]}`}
                        onClick={() => {
                            if (approved) {
                                toast(
                                    (<div>
                                        <strong>Project Id: PRJ-{index + 1}</strong>
                                        <p>This is an approved project</p>
                                    </div>), toastParams);
                            }
                            else {
                                toast('This project is not verified yet', toastParams);
                            }
                        }}
                    >
                        <div className="tile-inner">
                            <div className="tile-header">
                                <span className="subject-code">PRJ-{index + 1}</span>
                                <div className="credit-badges">
                                    <span className="credit-badge">{data.active && approved ? 'Active' : 'Inactive'}</span>
                                    {approved ? (
                                        <span className="credit-badge status">Approved ✓</span>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                            <div className="subject-name">{data.name}</div>
                            <div className="meta-row">
                                <div className="meta-chip">
                                    {data.description}
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className="meta-row">
                                <p className="meta-chip">TEAM MEMBERS</p>
                            </div>
                            <div className="team-members">
                                {Object.keys(data.member).map((key, index) => {
                                    const memberData = data.member[key as keyof ProjectMembers];
                                    const memberStatus = index === 0 ? 'Group Leader' : 'Member';
                                    if (!memberData || !memberData.rollNo) return;

                                    return (
                                        <div key={index} className="instructor-row">
                                            <div className="instructor-avatar">{toInitials(memberData.name!)}</div>
                                            <div className="instructor-name"><strong>{memberData.name}</strong>{memberStatus}</div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="divider"></div>
                            <div className="meta-row project-time-stamp">
                                <div className="meta-chip">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                    Uploaded
                                </div>
                                <div className="meta-chip">
                                    {fromUnix(data.timeStamp)}
                                </div>
                            </div>

                        </div>
                    </div >
                )
            })) : (
            <div className="loader"></div>
        )
    );
}