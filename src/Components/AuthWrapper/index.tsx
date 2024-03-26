import App from "../App";
import { Box, ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes as Rts } from "react-router-dom";
import Navbar from "../Navbar";
import { withAuthInfo, WithAuthInfoProps } from "@propelauth/react";
import { useEffect, useState } from "react";
import { User } from "../types";
import Routes from "../../Routes";

const AuthWrapper = withAuthInfo((props: WithAuthInfoProps) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchFunc = async () => {
      let data = await fetch(`${Routes.API}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${props.accessToken}`,
        },
      });
      const userData: User = await data.json();
      userData.token = props.accessToken ?? "";
      setUser(userData);
    };
    fetchFunc();
  }, [props.accessToken]);

  return (
    <>
      {user ? (
        <>
          <ChakraProvider>
            <BrowserRouter>
              <Navbar user={user} setUser={setUser} />
              <Rts>
                <Route
                  path="/"
                  element={<App user={user} setUser={setUser} />}
                />
              </Rts>
            </BrowserRouter>
          </ChakraProvider>
        </>
      ) : (
        <>
          <Flex justifyContent="center" alignItems="center">
            <Box>
              <Spinner size="xl" />
            </Box>
          </Flex>
        </>
      )}
    </>
  );
});

export default AuthWrapper;
