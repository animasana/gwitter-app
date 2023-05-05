import { firestore, storage } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const GweetFactory = ({ userObj }) => {
  const [attachment, setAttachment] = useState("");
  const [gweet, setGweet] = useState("");
  const fileInput = useRef();

  const handleSubmit = async (event) => {
    if (gweet === "") return;
    event.preventDefault();
    let attachmentUrl = "";
    if (Boolean(attachment)) {
      const attachmentRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      const result = await uploadString(attachmentRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(result.ref);
    }

    try {
      await addDoc(collection(firestore, "gweets"), {
        text: gweet,
        creatorId: userObj.uid,
        createdAt: Date.now(),
        attachmentUrl,
      });
      setGweet("");
      setAttachment("");
      fileInput.current.value = "";
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleChange = ({ target: { value } }) => {
    setGweet(value);
  };

  const handleClear = () => {
    setAttachment("");
    fileInput.current.value = "";
  };

  const handleFileChange = ({ target: { files } }) => {
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = ({ currentTarget: { result } }) => {
      setAttachment(result);
    };
    Boolean(theFile) && reader.readAsDataURL(theFile);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="factoryForm">
        <div className="factoryInput__container">
          <input
            className="factoryInput__input"
            value={gweet}
            onChange={handleChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={128}
          />
          <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        </div>
        <label htmlFor="attach-file" className="factoryInput__label">
          <span>Add Photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>

        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInput}
          style={{
            opacity: 0,
          }}
        />
        {Boolean(attachment) && (
          <div className="factoryForm__attachment">
            <img src={attachment} alt="" style={{ backgroundImage: attachment }} />
            <div className="factoryForm__clear" onClick={handleClear}>
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default GweetFactory;
