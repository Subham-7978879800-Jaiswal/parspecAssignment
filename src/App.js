import useFilter from "./hooks/useFilter";
import "./App.css";
import { useState, useMemo, useRef, useEffect } from "react";
import SearchedCard from "./components/SearchedCard";

function App() {
  const { fullTextSearch } = useFilter();
  const [searchedField, setSearchedField] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const resultContainer = useRef();

  const debouncedSearch = () => {
    let timeout;
    return (event) => {
      clearTimeout(timeout);
      const val = event.target.value;
      timeout = setTimeout(() => setSearchedField(val), 300);
    };
  };

  const filteredArray = useMemo(
    () => fullTextSearch(searchedField),
    [searchedField, fullTextSearch]
  );

  const handleKeyDown = (e) => {
    const { key } = e;
    let nextIndexCount = 0;

    if (key === "ArrowDown")
      nextIndexCount = (focusedIndex + 1) % filteredArray?.length;

    if (key === "ArrowUp")
      nextIndexCount =
        (focusedIndex + filteredArray?.length - 1) % filteredArray?.length;

    setFocusedIndex(nextIndexCount);
  };

  const mouseHover = (e) => {
    setFocusedIndex(Number(e.currentTarget.id));
  };

  useEffect(() => {
    if (!resultContainer.current) return;

    resultContainer.current.focus();
  }, [focusedIndex]);

  return (
    <>
      <div tabIndex="0" onKeyDown={handleKeyDown} className="container">
        <input
          type="text"
          onChange={debouncedSearch()}
          placeholder="Search For something"
        ></input>

        {filteredArray?.length > 0 ? (
          filteredArray?.map((data, index) => {
            return (
              <div
                ref={index === focusedIndex ? resultContainer : null}
                key={index}
                id={index}
                onMouseOver={mouseHover}
                className="item"
                tabIndex="0"
              >
                <SearchedCard
                  data={data}
                  searchedField={searchedField}
                ></SearchedCard>
              </div>
            );
          })
        ) : (
          <p>Not Found</p>
        )}
      </div>
    </>
  );
}

export default App;
