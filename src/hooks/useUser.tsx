import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useLocalStorage } from "./useLocalStorage";
import { IUser } from "../models/IUser";



export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const addUser = (user: IUser) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    setItem("user", "");
  };

  return { user, addUser, removeUser, setUser };
};