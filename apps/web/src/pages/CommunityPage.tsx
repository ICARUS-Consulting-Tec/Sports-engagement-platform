import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { Button } from "@heroui/react";
import { ModalComp } from "../components/general/modal";
import { NewPostForm } from "../components/community/newPostForm";
import CommunityHeader from "../components/community/header";
import PostComp from "../components/community/posts";
import TopContributors from "../components/community/topContributors";
import PostCategories from "../components/community/postsCategories";

function CommunityPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#F4F5F7]">
      <main className="mx-auto w-full max-w-[1400px] p-6">
        <Navbar />
        <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Side bar components */}
          <div className="space-y-8">
            <PostCategories />
            <TopContributors />
            <Button onClick={() => setIsOpen(true)}>
              Test modal button
            </Button>
          </div>
          
          {/* Main components part */}
          <div>
            <CommunityHeader />
            <PostComp />
          </div>
        </div>
        <ModalComp 
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          children={<NewPostForm onSwitchOpenModal={setIsOpen} onSuccess={() => {}}/>}
        />
      </main>
    </div>
  );
}

export default CommunityPage;
