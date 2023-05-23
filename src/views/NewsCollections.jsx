import { useState, useEffect } from "react";

import { useActions } from "../hooks/useActions";
import Article from "../components/Article";

const NewsCollections = () => {
  const [collections, setCollections] = useState([]);
  const { getCollections, deleteCollection } = useActions();

  const handleGetCollections = () => {
    getCollections({
      setSuccessResponse: setCollections,
      setErrors: console.error
    })
  };

  const handleDeleteCollection = (id) => {
    deleteCollection({
      setSuccessResponse: handleGetCollections,
      setErrors: console.error,
      id
    })
  }

  useEffect(() => {
    handleGetCollections();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      {
        collections.length > 0 
        ? collections.map((collection, index) => (
          <Article content={collection} key={index} handleDelete={() => handleDeleteCollection(collection.id)} />
        ))
        : <div className='container my-16'>
          No collection yet
        </div>
      }
    </div>
  );
};

export default NewsCollections;