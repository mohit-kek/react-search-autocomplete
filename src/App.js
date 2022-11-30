import axios from "axios";
import { useEffect, useState } from "react";

const names = [
  { name: "joy" },
  { name: "rohan" },
  { name: "rony" },
  { name: "jai" },
  { name: "Kekarot" },
  { name: "zoro" }
];

export default function App() {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  // console.log(names);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSearch = async (searchTerm) => {
    setValue(searchTerm);

    console.log("search", searchTerm);
  };

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get("https://randomuser.me/api/?results=10");
      setCountries(response.data.results);
    };
    loadUsers();
  }, []);

  return (
    <main>
      <div className="App">
        <h1>Search bar</h1>
        <div className="search-container">
          <div className="search-items">
            <input type="text" value={value} onChange={onChange} />
            <button
              onClick={() => {
                onSearch(value);
              }}
            >
              Search
            </button>
          </div>
          <div className="dropdown">
            {countries
              .filter((item) => {
                if (value !== "") {
                  const searchTerm = new RegExp(`${value}`, "gi");
                  const searchedName = item.email;

                  return (
                    searchTerm && searchedName.match(searchTerm)
                    // &&
                    // searchedName !== searchTerm
                  );
                }
              })
              .map((item) => (
                <div
                  onClick={() => onSearch(item.email)}
                  className="dropdown-row"
                  key={item.login.uuid}
                >
                  {item.email}
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
