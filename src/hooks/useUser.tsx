import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { IUser } from "../models/IUser";

export const useUser = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<boolean>(false);
  const { setItem, getItem } = useLocalStorage();

  useEffect(() => {

    setUser(getItem("user"));
  
  }, [user]);

  const removeUser = () => {
    setUser(null);
    setItem("user", "");
  };

  return { user, removeUser, setUser, isUser, setIsUser, isAdmin, setIsAdmin };
};
