import React from "react";
import HighlightedText from "./HighlightedText";

function SearchedCard({ data, searchedField }) {
  return (
    <>
      <p>
        {data.matchingInItems && searchedField?.length > 0 && (
          <p className="blue-text">{`${searchedField} found in Items`}</p>
        )}
      </p>
      <HighlightedText text={data.name} highlight={searchedField} />

      <HighlightedText text={data.address} highlight={searchedField} />

      <HighlightedText text={data.pincode} highlight={searchedField} />
    </>
  );
}

export default SearchedCard;
