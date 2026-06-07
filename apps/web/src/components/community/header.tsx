import { useEffect, useState } from "react";

const CommunityHeader = ()  => {
    const [activeFans, setActiveFans] = useState<number>(0);
    const [liveDiscussions, setLiveDiscussions] = useState<number>(0);

    useEffect(() => {
        // set active fans and live discussion states
    }, []);

    return (
        <>
            <section className="mb-9 flex flex-col items-start gap-4 rounded-[28px] bg-[linear-gradient(90deg,#0B2A55_0%,#1D4E89_50%,#60A5FA_100%)] px-5 py-10 text-center text-white shadow-[0_10px_24px_rgba(0,0,0,0.12)] sm:px-10 sm:py-16 lg:px-16 lg:py-20">
                <h1 className="m-0 w-full text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">Community Forum</h1>
                <p className="mb-2 w-full text-base text-blue-50 sm:mb-6 sm:text-xl">
                    Where Titans fans connect, debate, and celebrate.
                </p>

            </section>
        </>
    )
}

export default CommunityHeader;
