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

type PostCompProps = {
  activeFilter?: "hot" | "new" | "top";
  activeCategory?: string;
  refreshKey?: number;
};

const PostComp = ({ activeFilter = "hot", activeCategory = "All Topics", refreshKey }: PostCompProps) => {

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
  }, [refreshKey]);

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
  const categoryFilteredPosts =
    activeCategory === "All Topics"
      ? displayPosts
      : displayPosts.filter((post) => post.category_name === activeCategory);
  if (loading) return <p className="py-8 text-center">Cargando posts...</p>;
  if (error) return <p className="py-8 text-center text-red-500">{error}</p>;

  const isTrending = (post: Post) => post.upvotes_count > 100;
  const isTopContributor = (post: Post) => post.views_count > 1000;


  return (
    <div className="space-y-4">
      {categoryFilteredPosts.map((post) => {
        const isExpanded = expandedPostId === post.post_id;

        return (
          <Card
            key={post.post_id}
            className="border-l-4 border-blue-500 transition-shadow hover:shadow-md cursor-pointer"
            onClick={() => handleTogglePostDetails(post.post_id)}
          >
            <div className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-sky-700">
                    {post.category_name}
                  </span>
                  {/* ... badges de trending y top contributor */}
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
                <div 
                  className="mt-2" 
                  onClick={(e) => e.stopPropagation()} // Evita que clicks dentro del contenido cierren el post
                >
                  <p className="mb-4 text-sm text-gray-600">
                    {post.content}
                  </p>
                  <RepliesList post_id={post.post_id} />
                </div>
              )}

              <div className="flex items-center gap-6 border-t border-gray-100 pt-3 text-sm text-gray-500">
                <button 
                  className="flex items-center gap-2 hover:cursor-pointer p-1 rounded-md hover:bg-gray-100" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDetailsOpen(true);
                    setSelectedPost(post);
                  }}
                >
                  <Icon icon="mdi:message-outline" width={18} />
                  <span className="font-semibold text-gray-900">{post.replies_count}</span>
                  <span>Replies</span>
                </button>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <Icon icon="mdi:eye-outline" width={18} />
                  <span className="font-semibold text-gray-900">{post.views_count}</span>
                  <span>Views</span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    void handleLikeClick(e, post.post_id);
                  }}
                  className="flex items-center gap-2 rounded-full px-2 py-1 transition-colors hover:bg-gray-100"
                >
                  <Icon icon="mdi:thumb-up-outline" width={18} />
                  <span className="font-semibold text-gray-900">{post.upvotes_count}</span>
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
              onSuccess={(newComments) => {
                if (newComments && selectedPost) {
                  setPosts((currentPosts) =>
                    currentPosts.map((p) =>
                      p.post_id === selectedPost.post_id
                        ? { ...p, replies_count: newComments.length }
                        : p
                    )
                  );
                }
                setIsDetailsOpen(false);
              }}
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