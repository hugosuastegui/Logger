import React, { createContext, useState, useEffect } from "react";
import MY_SERVICE from "./services";

export const MyContext = createContext();

const { getProfile } = MY_SERVICE;

export default function Provider({ children }) {
  const [user, setUser] = useState(null);

  const setCtxUser = (user) => setUser(user);
  const clearCtxUser = () => setUser(null);

  useEffect(() => {
    async function profile() {
      const {
        data: { user },
      } = await getProfile();
      setCtxUser(user);
    }
    profile();
  }, []);

  return (
    <MyContext.Provider
      value={{
        user,
        setCtxUser,
        clearCtxUser,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
