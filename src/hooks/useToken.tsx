import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useToken = () => {
  const { getItem } = useLocalStorage();
  const [token, setToken] = useState("");

  useEffect(() => {
    const t: string = getItem("userData").token.token;
    setToken(t);
  }, []);

  return { token };
};
