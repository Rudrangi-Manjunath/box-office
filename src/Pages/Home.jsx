import React, { useState, useCallback } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import { MainPageLayout } from "../components/MainPageLayout";
import CustomRadio from "../components/show/CustomRadio";
import ShowGrid from "../components/show/ShowGrid";
import { apiGet } from "../misc/config";
import { useLastQuery } from "../misc/custom-hooks";
import {
  SearchInput,
  RadioInputsWrapper,
  SearchButtonWrapper,
} from "./Home.styled";

const Renderresults = (results) => {
  if (results && results.length === 0) {
    return <div>No results</div>;
  }
  if (results && results.length > 0) {
    return results[0].show ? (
      <ShowGrid data={results} />
    ) : (
      <ActorGrid data={results} />
    );
  }
  return null;
};

const Home = () => {
  const [input, setInput] = useLastQuery();
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

  const onRadioChange = useCallback((ev) => {
    //console.log(ev.target.value);
    setSearchOption(ev.target.value);
  }, []);
  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        placeholder="Search for Something"
        onChange={onInputChange}
        value={input}
        onKeyDown={onKeyDown}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-search"
            value="shows"
            onChange={onRadioChange}
            checked={isShowsSearch}
          />
        </div>
        <div>
          <CustomRadio
            label="Actors"
            id="actors-search"
            value="people"
            onChange={onRadioChange}
            checked={!isShowsSearch}
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {Renderresults(results)}
    </MainPageLayout>
  );
};

export default Home;
