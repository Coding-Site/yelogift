import {  useState } from "react";
type Token = string | null;
export const useToken = () => {
  const [adminToken] = useState<Token>();
  const [userToken] = useState<Token>();

  // useEffect(() => {
  //   const  adminToken = getItem("adminData")?.adminToken;
  //   const  userToken = getItem("userData")?.userToken;
  //   setAdminToken(() => adminToken);
  //   setUserToken(() => userToken);
  // }, []);

  return { adminToken, userToken };
};
