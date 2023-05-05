import { useEffect, useState } from "react";
import AppRouter from "myComponents/MyRouter";
import { auth } from "fbase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (Boolean(user)) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
        });
        setIsLoggedIn(true);
      } else {
        setUserObj(null);
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = auth.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          userObj={userObj}
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
        />
      ) : (
        <span className="appInit">Initializing...</span>
      )}
    </>
  );
}

export default App;
