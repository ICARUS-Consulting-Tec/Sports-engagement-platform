import { apiFetch } from "./api";
import type { Profile, InsertNewUserRequest } from "../types";

export async function getProfile(id = 1): Promise<Profile> {
  return await apiFetch<Profile>(`/profile/${id}`);
}

export async function insertNewUser(data: InsertNewUserRequest){
  return await apiFetch<{ new_user: Profile }>("/profile/new/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

export async function getMyProfile(accessToken: string): Promise<{status: string; profile: Profile}> {
  return await apiFetch<{status: string; profile: Profile}>("/profile/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}