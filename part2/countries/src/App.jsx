import { useEffect, useState } from 'react'

const App = () => {

  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  console.log(countries);

  const [filterName, setFilterName] = useState('')

  const handleNewFilter = (event) => {
  setFilterName(event.target.value)
}

return (
  <div>
    <div>
      find countries <input value={filterName} onChange={handleNewFilter} />
    </div>
    {countries.filter(country => country.name.common.toLowerCase().includes(filterName.toLowerCase())).length > 10 ? (
      <p>Too many matches, specify another filter</p>
    ) : countries.filter(country => country.name.common.toLowerCase().includes(filterName.toLowerCase())).length === 1 ? (
      countries
        .filter(country => country.name.common.toLowerCase().includes(filterName.toLowerCase()))
        .map((country, i) => (
          <div key={i}>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="100" />
          </div>
        ))
    ) : (
      countries
        .filter(country => filterName.length === 0 || country.name.common.toLowerCase().includes(filterName.toLowerCase()))
        .map((country, i) => (
          <div key={i}>
            <p>{country.name.common}</p>
          </div>
        ))
    )}
  </div>
);
}


import axios from 'axios'

export default App
