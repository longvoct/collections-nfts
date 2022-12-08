import { useEffect } from "react";
import { useState } from "react";
import AuthUser from "../config/AuthUser";
import { hashString } from "react-hash-string";

export default function useAuth() {
  const { http } = AuthUser();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    (async () => {
      const res = await http?.get("/user");
      setUser(hashString(res?.data?.name));
      setUserId(res?.data?.id);
    })();
  }, []);

  const getUser = () => {
    const userString = sessionStorage.getItem("user");
    const user_detail = JSON.parse(userString);
    return user_detail;
  };
  const [user, setUser] = useState(getUser);
  sessionStorage.setItem("user", JSON.stringify(user));
  return {
    user,
    userId,
    setUser,
  };
}
