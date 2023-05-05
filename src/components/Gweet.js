import { firestore, storage } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Gweet = ({ gweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newGweet, setNewGweet] = useState(gweetObj.text);

  const docRef = doc(firestore, "gweets", `${gweetObj.id}`);
  const photoHttpsRef = ref(storage, gweetObj.attachmentUrl);

  const handleDelete = async () => {
    const ok = window.confirm("Are you sure to want to delete this gweet?");
    if (ok) {
      await deleteDoc(docRef);
      if (gweetObj.attachmentUrl) await deleteObject(photoHttpsRef);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(docRef, {
      text: newGweet,
    });
    setEditing(false);
  };

  const handleChange = ({ target: { value } }) => setNewGweet(value);

  const toggleEditing = () => setEditing((prev) => !prev);

  return (
    <div className="gweet">
      {editing ? (
        <>
          <form onSubmit={handleSubmit} className="container gweetEdit">
            <input
              type="text"
              value={newGweet}
              required
              onChange={handleChange}
              autoFocus
              className="formInput"
            />
            <input type="submit" value="Update gweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{gweetObj.text}</h4>
          {gweetObj.attachmentUrl && (
            <img alt="" src={gweetObj.attachmentUrl} />
          )}
          {isOwner && (
            <div className="gweet__actions">
              <span onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Gweet;
