import "./App.css";
import React, { useEffect } from "react";
import Page from "./components/Page";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import FirstPage from "./components/mainPage/firstPage/FirstPage";
import { routesList } from "./router";
import { ToastContainer } from "react-toastify";
import { ChakraProvider } from '@chakra-ui/react'

import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/actionCreators";

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, [dispatch]);
  if (isLoading) {
    return <div>Загрузка....</div>
  }
  return (
    <>
      <ChakraProvider resetCSS={false}>
        <Routes>
          <Route path="/" element={<Page />}>
            <Route index element={<FirstPage />} />
            {routesList.map((route =>
              <Route
                path={route.path}
                element={route.element}
                exact={route.exact}
                key={route.path}
              />
            ))}
            <Route path="*" element={"Loading"} />
          </Route>
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </ChakraProvider>
    </>
  );
}

export default App;
