import WebRouter from "./Router";
import React, { useEffect, useState } from "react";
import myBase from "myBase";
import Auth from "../routes/Auth";
import { authService } from "../myBase";


//delays the web browser so that the it waits until the firebase is called from external source.
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLsoggedIn] = useState(false);
  useEffect(()  =>{
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLsoggedIn(true);

      }
      else{
        setIsLsoggedIn(false);

      }
      setInit(true);

  });
},[]);
  return (
    <>
      {init ? <WebRouter isLoggedIn={isLoggedIn}/> :"initializing..."}
    </>

  );
}

export default App;
