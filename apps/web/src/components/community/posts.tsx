import { Button, Card } from "@heroui/react";
import { Icon } from "@iconify/react";
import { MouseEvent, useEffect, useState } from "react";
import { Post } from "../../types/community";
import {
  getPosts,
  incrementPostUpvote,
  incrementPostView,
} from "../../services/communityService";
import { getInitials, getPostTime, filteredPosts } from "../../utils/postUtils";
import { ModalComp } from "../general/modal";
import PostDetail from "./postDetail";
import NewReply from "./newReply";
import RepliesList from "./repliesList";

const PostComp = ({activeFilter = "hot"}: {activeFilter?: "hot" | "new" | "top"}) => {

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPosts() {
      try {
        setLoading(true);
        setError("");
        const data = await getPosts();
        if (isMounted) setPosts(data);
      } catch (err) {
        console.error("Error loading posts:", err);
        if (isMounted) setError("No se pudieron cargar los posts.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    void loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleTogglePostDetails = async (postId: number) => {
    const isExpanding = expandedPostId !== postId;

    setExpandedPostId(isExpanding ? postId : null);

    if (!isExpanding) return;

    try {
      const updatedViews = await incrementPostView(postId);

      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.post_id === postId
            ? { ...post, views_count: updatedViews }
            : post
        )
      );
    } catch (err) {
      console.error("Error incrementing post view:", err);
    }
  };

  const handleLikeClick = async (
    event: MouseEvent<HTMLButtonElement>,
    postId: number
  ) => {
    event.stopPropagation();

    try {
      const updatedUpvotes = await incrementPostUpvote(postId);

      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.post_id === postId
            ? { ...post, upvotes_count: updatedUpvotes }
            : post
        )
      );
    } catch (err) {
      console.error("Error incrementing post upvote:", err);
    }
  };

  const displayPosts = filteredPosts(posts, activeFilter);
  if (loading) return <p className="py-8 text-center">Cargando posts...</p>;
  if (error) return <p className="py-8 text-center text-red-500">{error}</p>;

  const isTrending = (post: Post) => post.upvotes_count > 100;
  const isTopContributor = (post: Post) => post.views_count > 1000;


  return (
    <div className="space-y-4">
      {displayPosts.map((post) => {
        const trending = isTrending(post);
        const topContributor = isTopContributor(post);
        const isExpanded = expandedPostId === post.post_id;

        return (
          <Card
            key={post.post_id}
            className="border-l-4 border-blue-500 transition-shadow hover:shadow-md"
          >
            <div className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-sky-700">
                    {post.category_name}
                  </span>

                  {trending && (
                    <span className="flex items-center gap-1 text-xs font-bold text-red-500">
                      <Icon icon="mdi:fire" width={14} /> TRENDING
                    </span>
                  )}

                  {topContributor && (
                    <span className="flex items-center gap-1 text-xs font-bold text-yellow-500">
                      <Icon icon="mdi:star" width={14} /> TOP CONTRIBUTOR
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">
                    ·{getPostTime(post.created_at || "")}
                  </span>

                  <button
                    type="button"
                    onClick={() => void handleTogglePostDetails(post.post_id)}
                    className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
                    aria-label={isExpanded ? "Collapse post" : "Expand post"}
                  >
                    <Icon
                      icon={isExpanded ? "mdi:chevron-up" : "mdi:chevron-down"}
                      width={20}
                    />
                  </button>
                </div>
              </div>

              <h3 className="mb-3 text-lg font-bold text-gray-900">
                {post.title}
              </h3>

              <div className="mb-4 flex items-start gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
                    {getInitials(post.user_name)}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {post.user_name}
                  </span>
                </div>
              </div>

              {isExpanded && (
                <>
                  <p className="mb-4 text-sm text-gray-600">
                    {post.content}
                  </p>
                  <RepliesList post_id={post.post_id} />
                </>
              )}

              <div className="flex items-center gap-6 border-t border-gray-100 pt-3 text-sm text-gray-500">
                <button className="flex items-center gap-2 hover:cursor-pointer" onClick={() => {
                  setIsDetailsOpen(true);
                  setSelectedPost(post);
                }}>
                  <Icon icon="mdi:message-outline" width={18} />
                  <span className="font-semibold text-gray-900">
                    {post.replies_count}
                  </span>
                  <span>Replies</span>
                </button>

                <div className="flex items-center gap-2">
                  <Icon icon="mdi:eye-outline" width={18} />
                  <span className="font-semibold text-gray-900">
                    {post.views_count}
                  </span>
                  <span>Views</span>
                </div>

                <button
                  type="button"
                  onClick={(event) => void handleLikeClick(event, post.post_id)}
                  className="flex items-center gap-2 rounded-full px-2 py-1 transition-colors hover:bg-gray-100"
                >
                  <Icon icon="mdi:thumb-up-outline" width={18} />
                  <span className="font-semibold text-gray-900">
                    {post.upvotes_count}
                  </span>
                  <span>Upvotes</span>
                </button>
              </div>
            </div>  
          </Card>
        );
      })}
      <ModalComp 
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        children={
         selectedPost && (
          <div className="space-y-6">
            <PostDetail post={selectedPost} />
            <NewReply 
              postId={selectedPost.post_id}
              onSuccess={() => setIsDetailsOpen(false)}
              onCancel={() => setIsDetailsOpen(false)}
            />
          </div>
         )
        }
      />
    </div>
  );
};

export default PostComp;