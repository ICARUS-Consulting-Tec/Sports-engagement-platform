import { Icon } from "@iconify/react";
import type { Comment } from "../../types/community";
import { getPostTime, getInitials } from "../../utils/postUtils";
import { useEffect, useState } from "react";
import { getPostComments, incrementReplyUpvote } from "../../services/communityService";

interface RepliesListProps {
  post_id: number;
}

const RepliesList = ({ post_id }: RepliesListProps) => {
  const [replies, setReplies] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  if (post_id == null) {
    return (
      <p className="text-sm text-slate-500">No replies yet. Be the first to reply.</p>
    );
  }

  useEffect(() => {
    async function loadPostReplies() {
        try {
            setLoading(true);
            const data = await getPostComments(post_id);
            setReplies(data);
        } catch (error) {
            console.error(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    void loadPostReplies();
  }, []);

  const visibleReplies = replies;

  const handleReplyLikeClick = async (replyId: number) => {
    try {
      const updatedUpvotes = await incrementReplyUpvote(replyId);
      setReplies((currentReplies) =>
        currentReplies.map((reply) =>
          reply.reply_id === replyId
            ? { ...reply, upvotes_count: updatedUpvotes }
            : reply
        )
      );
    } catch (error) {
      console.error("Error incrementing reply upvote:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="max-h-85 space-y-4 overflow-y-auto pr-1">
        {visibleReplies.map((reply) => {
          const name = "Anonymous";
          return (
            <div key={reply.reply_id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center">
                  {getInitials(name)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#0B2A55]">{name}</p>
                  <p className="text-xs text-slate-400">
                    {getPostTime(reply.created_at || "")}
                  </p>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-1 text-xs text-slate-400 hover: cursor-pointer"
                  onClick={() => void handleReplyLikeClick(reply.reply_id)}
                >
                  <Icon icon="mdi:thumb-up-outline" width={14} />
                  {reply.upvotes_count ?? 0}
                </button>
              </div>

              <p className="mt-2 text-sm text-slate-600">{reply.content}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default RepliesList;