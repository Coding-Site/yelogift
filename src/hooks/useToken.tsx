import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
type Token = string | null;
export const useToken = () => {
  const { getItem } = useLocalStorage();
  const [adminToken, setAdminToken] = useState<Token>();
  const [userToken, setUserToken] = useState<Token>();

  // useEffect(() => {
  //   const  adminToken = getItem("adminData")?.adminToken;
  //   const  userToken = getItem("userData")?.userToken;
  //   setAdminToken(() => adminToken);
  //   setUserToken(() => userToken);
  // }, []);

  return { adminToken, userToken };
};
