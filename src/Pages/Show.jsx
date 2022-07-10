import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../misc/config";

const Show = () => {
  let isMounted = true;

  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then((results) => {
        if (isMounted) {
          setShow(results);
          setisLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setisLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  console.log(show);

  if (isLoading) {
    return <div>Data is being Loading</div>;
  }

  if (error) {
    return <div>Error Occured: {error}</div>;
  }
  return <div>This is Show page</div>;
};

export default Show;
