/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Docs({ database }) {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState("");
  const isMounted = useRef();
  const [docsData, setDocsData] = useState([]);

  const collectionRef = collection(database, "docsData");

  const getData = () => {
    onSnapshot(collectionRef, (data) => {
      setDocsData(
        data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  };

  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    isMounted.current = true;
    getData();
  });

  const addData = () => {
    addDoc(collectionRef, {
      title: title,
      docsDesc: "",
    })
      .then(() => {
        alert("Data Added");
        handleClose();
      })
      .catch(() => {
        alert("Cannot add data");
      });
  };

  const getID = (id) => {
    navigate(`/editDocs/${id}`);
  };

  return (
    <div className="docs-main">
      <h1>Docs Clone</h1>

      <button className="add-docs" onClick={handleOpen}>
        Add a Document
      </button>

      <div className="grid-main">
        {docsData.map((doc) => {
          return (
            <div
              key={doc.id}
              className="grid-child"
              onClick={() => getID(doc.id)}
            >
              <p>{doc.title}</p>
              <div dangerouslySetInnerHTML={{ __html: doc.docsDesc }}></div>
            </div>
          );
        })}
      </div>

      <Modal
        open={open}
        setOpen={setOpen}
        title={title}
        setTitle={setTitle}
        addData={addData}
      />
    </div>
  );
}
