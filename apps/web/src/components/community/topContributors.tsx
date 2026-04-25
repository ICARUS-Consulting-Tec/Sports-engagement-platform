import { useEffect, useState } from "react";

//mock data
const top_contributors = [
  {name: "Daniela", points: 8534},
  {name: "Saldaña", points: 7000},
  {name: "Pepe", points: 5200}
];

//check if it could be put in a separate file
interface Contributor {
  name: string, 
  points: number
};

const TopContributors = () => {
    const [contributors, setContributors] = useState<Contributor[]>([]);

    useEffect(() => {
      //api call to set contributors list
    }, []);

    return(
        <>
            <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
              <h3 className="mb-3 pl-1 text-lg uppercase font-semibold tracking-[0.08em] text-[#0B2A55]">
                Top Contributors
              </h3>
              <ol className="space-y-2 text-sm text-[#334155]">
                {top_contributors.map((fan, index) => {
                  const rank = index + 1;
                  const isFirst = rank === 1;

                  return (
                    <li key={fan.name} className="flex items-center gap-4">
                      <span
                        className={[
                          "flex h-11 w-11 items-center justify-center rounded-full font-bold",
                          isFirst
                            ? "bg-[#4E8FD6] text-white"
                            : "bg-[#E5E7EB] text-[#0B2A55]",
                        ].join(" ")}
                      >
                        {rank}
                      </span>

                      <div className="leading-tight">
                        <p className="text-lg font-semibold text-[#0B2A55]">{fan.name}</p>
                        <p className="text-sm text-[#9AA4B2]">{fan.points} pts</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
        </>
    );
} 

export default TopContributors;