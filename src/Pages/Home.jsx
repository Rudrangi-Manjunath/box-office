import React, { useState } from "react";
import { MainPageLayout } from "../components/MainPageLayout";
import { apiGet } from "../misc/config";

const Home = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState("shows");

  const isShowsSearch = searchOption === "shows";

  const onInputChange = (ev) => {
    setInput(ev.target.value);
  };

  const onSearch = () => {
    //https://api.tvmaze.com/search/shows?q=girls
    apiGet(`/search/${searchOption}?q=${input}`).then((result) => {
      setResults(result);
      console.log(result);
    });
  };

  const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const Renderresults = () => {
    if (results && results.length === 0) {
      return <div>No results</div>;
    }
    if (results && results.length > 0) {
      return results[0].show
        ? results.map((items) => {
            return <div key={items.show.id}>{items.show.name}</div>;
          })
        : results.map((items) => {
            return <div key={items.person.id}>{items.person.name}</div>;
          });
    }
    return null;
  };

  const onRadioChange = (ev) => {
    //console.log(ev.target.value);
    setSearchOption(ev.target.value);
  };
  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search for Something"
        onChange={onInputChange}
        value={input}
        onKeyDown={onKeyDown}
      />
      <div>
        <label htmlFor="shows-search">
          <input
            id="shows-search"
            type="radio"
            value="shows"
            onChange={onRadioChange}
            checked={isShowsSearch}
          />
          Shows
        </label>
        <label htmlFor="actors-search">
          <input
            id="actors-search"
            type="radio"
            value="people"
            onChange={onRadioChange}
            checked={!isShowsSearch}
          />
          Actors
        </label>
      </div>

      <button type="button" onClick={onSearch}>
        Search
      </button>
      {Renderresults()}
    </MainPageLayout>
  );
};

export default Home;
