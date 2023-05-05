import Gweet from "components/Gweet";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  // where,
} from "firebase/firestore";
import { firestore } from "fbase";

const Gweets = ({ userObj }) => {
  const [gweetObjs, setGweetObjs] = useState([]);
  useEffect(() => {
    const q = query(
      collection(firestore, "gweets"),
      //where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const gweetArray = snapshot.docs.map((aDoc) => ({
        ...aDoc.data(),
        id: aDoc.id,
      }));
      setGweetObjs(gweetArray);
    });
  }, [userObj.uid]);

  return (
    <div style={{ marginTop: 30 }}>
      {gweetObjs.map((gweetObj) => (
        <Gweet
          key={gweetObj.id}
          gweetObj={gweetObj}
          isOwner={gweetObj.creatorId === userObj.uid}
        />
      ))}
    </div>
  );
};

export default Gweets;
