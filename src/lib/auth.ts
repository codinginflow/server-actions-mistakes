// This is a fake authentication library that mimics auth providers like Next-Auth or Clerk.

import { delay } from "./utils";

export interface User {
  name: string;
  avatar: string;
}

const fakeUser: User = {
  name: "Florian Walther",
  avatar: "FW",
};

// For server-side calls
export async function getCurrentUser(): Promise<User | null> {
  // Artificial delay to pretend we're fetching user data
  await delay(500);
  return fakeUser;
}

// For client-side calls
export function useUser() {
  return { user: fakeUser };
}
