import { useEffect, useState } from "react";

const categories = [
  "All Topics",
  "Game Day",
  "Team Talk",
  "Digital Collectibles",
  "Draft",
  "Tailgate & Events",
];

const PostCategories = () => {
  // Estado para manejar cuál categoría está activa
  const [activeCategory, setActiveCategory] = useState("All Topics");

  useEffect(() => {
    console.log("Active category: ", activeCategory);
  }, [activeCategory]);

  return (
    <section className="rounded-2xl p-6">
      <h3 className="mb-3 pl-1 text-lg uppercase font-semibold tracking-[0.08em] text-[#0B2A55]">
        Categories
      </h3>
      <ul className="space-y-1">
        {categories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <li key={category}>
              <button
                onClick={() => setActiveCategory(category)}
                className={`w-full px-4 py-2 text-left text-sm transition-all duration-200 
                  ${
                    isActive
                      ? "bg-[#EFF4FB] font-bold text-[#0B2A55] border-l-4 border-[#0B2A55] rounded-r-xl"
                      : "text-[#64748B] hover:bg-[#F8FAFC] border-l-4 border-transparent rounded-xl"
                  }`}
              >
                {category}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default PostCategories;