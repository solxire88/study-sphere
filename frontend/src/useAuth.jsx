// useAuth.js
import { useMemo } from "react";
import { ACCESS_TOKEN, USER_ID, USERNAME } from "./constants";

export function useAuth() {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const userId = localStorage.getItem(USER_ID);
  const username = localStorage.getItem(USERNAME);
  return useMemo(() => ({ token, userId, username }), [token, userId, username]);
}
