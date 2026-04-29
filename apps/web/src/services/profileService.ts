import { apiFetch } from "./api";
import type { Profile, InsertNewUserRequest, ProfileResponse } from "../types";

export async function getProfile(id = ""): Promise<Profile> {
  const data = await apiFetch<ProfileResponse>(`/profile/${id}`);
  return "profile" in data ? data.profile : data;
}

export async function insertNewUser(data: InsertNewUserRequest){
  return await apiFetch<{ new_user: Profile }>("/profile/new/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}
