import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../misc/config";

const reducer = (prevState, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS": {
      return { isLoading: false, error: null, show: action.show };
    }
    case "FETCH_FAIL": {
      return { ...prevState, isLoading: false, error: action.message };
    }
    default:
      return prevState;
  }
};

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

const Show = () => {
  let isMounted = true;

  const { id } = useParams();

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [show, setShow] = useState(null);
  // const [isLoading, setisLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then((results) => {
        if (isMounted) {
          dispatch({ type: "FETCH_SUCCESS", show: results });
        }
      })
      .catch((err) => {
        if (isMounted) {
          dispatch({ type: "FETCH_FAIL", err: err.message });
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
