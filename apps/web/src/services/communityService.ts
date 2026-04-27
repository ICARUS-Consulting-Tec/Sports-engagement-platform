import { apiFetch } from "./profile";

export type Post = {
  post_id: number;
  user_id: number;
  category_id: number;
  title: string;
  content: string;
  views_count: number;
  upvotes_count: number;
  created_at?: string;
};

export type PostPayload = {
  user_id?: number | null;
  category_id: number;
  title: string;
  content: string;
};

export type EditPostPayload = {
  post_id: number;
  new_category_name?: string | null;
  new_title?: string | null;
  new_content?: string | null;
};

export type Comment = {
  reply_id: number;
  post_id: number;
  user_id?: number;
  content: string;
  upvotes_count: number;
  created_at?: string;
};

export type CommentPayload = {
  post_id: number;
  user_id: number;
  content: string;
};

export type EditCommentPayload = {
  reply_id: number;
  new_content: string;
};

export type TopContributor = {
  user_id: number;
  post_count: number;
};

export type FanOfWeek = {
  user_id: number;
  post_count: number;
  upvotes_count: number;
};

type ApiListResponse<T> = {
  success: boolean;
  result: T;
};

type ApiItemResponse<T> = {
  success: boolean;
  result: T;
};

export async function getPosts(): Promise<Post[]> {
  const data = await apiFetch<ApiListResponse<Post[]>>("/community/get_posts");
  return data.result;
}

export async function createPost(payload: PostPayload): Promise<Post> {
  const data = await apiFetch<ApiItemResponse<Post>>("/community/new_post", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return data.result;
}

export async function deletePost(postId: number): Promise<Post[]> {
  const data = await apiFetch<ApiListResponse<Post[]>>("/community/delete_post", {
    method: "DELETE",
    body: JSON.stringify({ post_id: postId }),
  });

  return data.result;
}

export async function editPost(payload: EditPostPayload): Promise<Post[]> {
  const data = await apiFetch<ApiListResponse<Post[]>>("/community/edit_post", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  return data.result;
}

export async function getPostComments(postId: number): Promise<Comment[]> {
  const data = await apiFetch<ApiListResponse<Comment[]>>(
    `/community/get_post_comments?post_id=${postId}`
  );

  return data.result;
}

export async function createComment(payload: CommentPayload): Promise<Comment[]> {
  const data = await apiFetch<ApiListResponse<Comment[]>>("/community/create_comment", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return data.result;
}

export async function deleteComment(replyId: number): Promise<Comment[]> {
  const data = await apiFetch<ApiListResponse<Comment[]>>("/community/delete_reply", {
    method: "DELETE",
    body: JSON.stringify({ reply_id: replyId }),
  });

  return data.result;
}

export async function editComment(payload: EditCommentPayload): Promise<Comment[]> {
  const data = await apiFetch<ApiListResponse<Comment[]>>("/community/edit_comment", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  return data.result;
}

export async function getUserPosts(userId: number): Promise<Post[]> {
  const data = await apiFetch<ApiListResponse<Post[]>>(
    `/community/user_posts?user_id=${userId}`
  );

  return data.result;
}

export async function getTopContributors(): Promise<TopContributor[]> {
  const data = await apiFetch<ApiListResponse<TopContributor[]>>("/community/top_contributors");
  return data.result;
}

export async function getFanOfWeek(): Promise<FanOfWeek | null> {
  const data = await apiFetch<ApiListResponse<FanOfWeek[]>>("/community/fan_of_week");
  return data.result[0] ?? null;
}