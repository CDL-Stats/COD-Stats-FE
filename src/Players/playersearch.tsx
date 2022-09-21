import { useEffect, useState } from "react";

export default function PlayerSearch() {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [data, setData] = useState([]);

  const handleFilter = (event: { target: { value: any } }) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value: { nickName: string }) => {
      return value.nickName.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/players`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='search'>
      <div className='searchInputs'>
        <input
          type='text'
          placeholder={"Enter player name"}
          value={wordEntered}
          onChange={handleFilter}
        />
        {/* <div className='searchIcon'>
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id='clearBtn' onClick={clearInput} />
          )}
        </div> */}
      </div>
      {filteredData.length != 0 && (
        <div className='dataResult'>
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className='dataItem' target='_blank'>
                <p>{value["nickName"]}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
