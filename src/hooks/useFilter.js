import { useState, useEffect } from "react";

const useFilter = () => {
  const [data, setData] = useState();

  const getData = () => {
    fetch("http://www.mocky.io/v2/5ba8efb23100007200c2750c")
      .then((res) => res.json())
      .then((result) => {
        const trasformedArray = result.map((res) => {
          // * Stored two extra fields with api result. KeyWords string and matching from Item Arrays

          return {
            ...res,
            keywordString: Object.values({
              ...res,
              items: res.items,
            })
              .join(" ")
              .toLowerCase(),
            matchingInItems: false,
          };
        });
        // * Setting the state
        setData(trasformedArray);
      });
  };

  const fullTextSearch = (str) =>
    data?.filter((e) => {
      const filterText = str.toLowerCase();
      const itemsString = e.items.join("|").toLowerCase();

      if (itemsString.includes(filterText)) {
        e.matchingInItems = true;
      } else {
        e.matchingInItems = false;
      }
      return e.keywordString.includes(filterText);
    });

  useEffect(() => getData(), []);

  return { getData, data, fullTextSearch };
};

export default useFilter;
