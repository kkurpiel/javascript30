(function () {
  const cw1 = document.getElementById("cw1");
  const cw2 = document.getElementById("cw2");
  const cw3 = document.getElementById("cw3");
  const answer = document.getElementById("answer");
  const tabela = document.getElementById("tabela");
  const tabela2 = document.getElementById("tabela2");
  const token = "dGqzYBdVwQNTjVRXEegPpkAfRrnzRqja";

  const datasetId = "GHCND";
  const locationId = "CITY:US390029";
  const startDate = "2023-01-01";
  const endDate = "2023-12-31";

  cw1.addEventListener("click", function () {
    answer.innerHTML = "";
    tabela2.innerHTML = "";
    tabela.innerHTML =
      "<tr><th>Name</th><th>Capital</th><th>Population</th><th>Region</th><th>Subregion</th></tr>";

    fetch("https://restcountries.com/v3.1/capital/Warsaw")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((array) => {
        tabela.innerHTML += `<tr>
          <td>${array[0].name.common}</td>
          <td>${array[0].capital[0]}</td>
          <td>${array[0].population}</td>
          <td>${array[0].region}</td>
          <td>${array[0].subregion}</td>
        </tr>`;
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        answer.innerHTML = "Error fetching data.";
      });
  });

  cw2.addEventListener("click", function () {
    tabela.innerHTML = "";
    tabela2.innerHTML = "<tr><th>Station</th><th>Name</th><th>Data Coverage</th><th>Min Date</th><th>Max Date</th></tr>";

    fetch("https://www.ncei.noaa.gov/cdo-web/api/v2/stations", {
      method: "GET",
      headers: {
        token: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        data.results.forEach(function (element) {
          tabela2.innerHTML += `<tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.datacoverage}</td>
            <td>${element.mindate}</td>
            <td>${element.maxdate}</td>
          </tr>`;
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        answer.innerHTML = "Error fetching data.";
      });
  });

  cw3.addEventListener("click", async function () {
    tabela.innerHTML = "";
    tabela2.innerHTML = "<tr><th>Station</th><th>Date</th><th>Data Type</th><th>Value</th></tr>";
    const baseUrl = 'https://www.ncei.noaa.gov/cdo-web/api/v2/data';

    async function getClimateData(datasetId, locationId, startDate, endDate) {
      const url = new URL(baseUrl);

      url.searchParams.append('datasetid', datasetId);
      url.searchParams.append('locationid', locationId);
      url.searchParams.append('startdate', startDate);
      url.searchParams.append('enddate', endDate);
      url.searchParams.append('limit', 1000);

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'token': token
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        data.results.forEach(function (element) {
          tabela2.innerHTML += `<tr>
            <td>${element.station}</td>
            <td>${element.date}</td>
            <td>${element.datatype}</td>
            <td>${element.value}</td>
          </tr>`;
        });
      } catch (error) {
        console.error('Błąd podczas pobierania danych klimatycznych:', error);
        answer.innerHTML = "Error fetching climate data.";
      }
    }

    // Wywołanie funkcji pobierającej dane
    getClimateData(datasetId, locationId, startDate, endDate);
  });
})();
