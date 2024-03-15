/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditDocs({ database }) {
  let params = useParams();
  const [docsDesc, setDocsDesc] = useState("");
  const [documentTitle, setDocumentTitle] = useState("");
  const collectionRef = collection(database, "docsData");
  const isMounted = useRef();

  const getQuillData = (value) => {
    setDocsDesc(value);
  };

  useEffect(() => {
    const updateDocsData = setTimeout(() => {
      const document = doc(collectionRef, params.id);
      updateDoc(document, {
        docsDesc: docsDesc,
      })
        .then(() => {
          toast.success("Document Saved", {
            autoClose: 2000,
          });
        })
        .catch(() => {
          toast.error("Cannot save document", {
            autoClose: 2000,
          });
        });
    }, 1000);
    return () => clearTimeout(updateDocsData);
  }, [collectionRef, docsDesc, params.id]);

  const getData = () => {
    const document = doc(collectionRef, params.id);
    onSnapshot(document, (docs) => {
      setDocumentTitle(docs.data().title);
      setDocsDesc(docs.data().docsDesc);
    });
  };
  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    isMounted.current = true;
    getData();
  });

  return (
    <div className="editDocs-main">
      <ToastContainer />
      <h1>{documentTitle}</h1>
      <div className="editDocs-inner">
        <ReactQuill
          className="react-quill"
          value={docsDesc}
          onChange={getQuillData}
        />
      </div>
    </div>
  );
}
