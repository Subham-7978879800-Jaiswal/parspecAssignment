import useFilter from "./hooks/useFilter";
import "./App.css";
import { useState } from "react";
import HighlightedText from "./components/HighlightedText";

function App() {
  const { fullTextSearch } = useFilter();

  const [searchedField, setSearchedField] = useState("");

  const debouncedSearch = () => {
    let timeout;
    return (event) => {
      clearTimeout(timeout);
      const val = event.target.value;
      timeout = setTimeout(() => setSearchedField(val), 300);
    };
  };

  return (
    <>
      <div className="container">
        <input
          type="text"
          onChange={debouncedSearch()}
          placeholder="Search For something"
        ></input>

        {fullTextSearch(searchedField)?.map((e, index) => {
          return (
            <div tabIndex={0} key={index} className="item">
              <p>
                {e.matchingInItems && searchedField.length > 0 && (
                  <p className="blue-text">{`${searchedField} found in Items`}</p>
                )}
              </p>
              <HighlightedText text={e.name} highlight={searchedField} />

              <HighlightedText text={e.address} highlight={searchedField} />

              <HighlightedText text={e.pincode} highlight={searchedField} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
