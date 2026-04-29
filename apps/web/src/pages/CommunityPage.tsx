import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { ModalComp } from "../components/general/modal";
import { NewPostForm } from "../components/community/newPostForm";
import CommunityHeader from "../components/community/header";
import PostComp from "../components/community/posts";
import TopContributors from "../components/community/topContributors";
import PostCategories from "../components/community/postsCategories";
import CommunityBar from "../components/community/communityBar";
import TopContributor from "../components/community/topContributor";

function CommunityPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<"hot" | "new" | "top">("hot");
  const [activeCategory, setActiveCategory] = useState<string>("All Topics");

  return (
    <div className="min-h-screen bg-[#F4F5F7]">
      <main className="mx-auto w-full max-w-350 p-6">
        <Navbar />
        <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="space-y-8">
            <PostCategories
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
            <TopContributor /> 
            <TopContributors />
          </div>
          
          <div className="space-y-6">
            <CommunityHeader />
            <CommunityBar onSwitchOpenModal={setIsOpen} activeFilter={activeFilter} setActiveFilter={setActiveFilter}/>
            <PostComp activeFilter={activeFilter} activeCategory={activeCategory} />
          </div>
        </div>
        <ModalComp 
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          children={<NewPostForm onSwitchOpenModal={setIsOpen} onSuccess={() => setIsOpen(false)}/>}
        />
      </main>
    </div>
  );
}

export default CommunityPage;
