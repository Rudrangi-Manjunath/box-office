import React, { useEffect, useState } from "react";
import { MainPageLayout } from "../components/MainPageLayout";
import { useShows } from "../misc/custom-hooks";
import { apiGet } from "../misc/config";
import ShowGrid from "../components/show/ShowGrid";

const Starred = () => {
  const [starred] = useShows();

  const [shows, setShows] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map((showId) => apiGet(`/shows/${showId}`));

      Promise.all(promises)
        .then((apiData) => apiData.map((show) => ({ show })))
        .then((results) => {
          setShows(results);
          setisLoading(false);
        })
        .catch((err) => {
          setisLoading(false);
          setError(false);
        });
    }
  }, []);

  return (
    <MainPageLayout>
      {isLoading && <div>Shows are still Loading</div>}
      {error && <div>Error occured: {error}</div>}
      {!isLoading && !shows && <div>No shows were added</div>}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
};

export default Starred;
