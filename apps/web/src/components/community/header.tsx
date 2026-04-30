import { useEffect, useState } from "react";

const CommunityHeader = ()  => {
    const [activeFans, setActiveFans] = useState<number>(0);
    const [liveDiscussions, setLiveDiscussions] = useState<number>(0);

    useEffect(() => {
        // set active fans and live discussion states
    }, []);

    return (
        <>
            <section className="mb-9 flex flex-col items-start gap-4 rounded-[28px] bg-[linear-gradient(90deg,#0B2A55_0%,#1D4E89_50%,#60A5FA_100%)] px-16 py-20 text-center text-white shadow-[0_10px_24px_rgba(0,0,0,0.12)]">
                <h1 className="m-0 text-4xl font-black tracking-tight sm:text-5xl">Community Forum</h1>
                <p className="m-0 max-w-lg text-base leading-relaxed text-white/90">
                Where Titans fans connect, debate, and celebrate.
                </p>
                <div className="mt-5 flex flex-wrap gap-8 text-white/95">
                    <div className="flex items-center gap-6">
                        <p className="text-3xl font-extrabold">{activeFans}</p> {/* <p className="text-3xl font-extrabold">{activeFans}</p> */}
                        <p className="text-xs uppercase tracking-wide text-white/80">Active Fans Today</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <p className="text-3xl font-extrabold">{liveDiscussions}</p> {/* <p className="text-3xl font-extrabold">{liveDiscussions}</p> */}
                        <p className="text-xs uppercase tracking-wide text-white/80">Live Discussions</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CommunityHeader;
