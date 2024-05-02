// import { useEffect } from "react";
// import { useUser } from "./useUser";
// import { useLocalStorage } from "./useLocalStorage";
// import {IUser} from '../models/IUser';

// export const useAuth = () => {
//   // we can re export the user methods or object from this hook
//   const { user, addUser, removeUser, setUser } = useUser();
//   const { getItem } = useLocalStorage();

//   useEffect(() => {
//     const user = getItem("userData");
//     if (user) {
//       addUser(JSON.parse(user));
//     }
//   }, [addUser, getItem]);

//   const login = (user: IUser) => {
//     addUser(user);
//   };

//   const logout = () => {
//     removeUser();
//   };

//   return { user, login, logout, setUser };
// };