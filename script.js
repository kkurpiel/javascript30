(function () {
  const cw1 = document.getElementById("cw1");
  const cw2 = document.getElementById("cw2");
  const cw3 = document.getElementById("cw3");
  const answer = document.getElementById("answer");
  const tabela = document.getElementById("tabela");
  const tabela2 = document.getElementById("tabela2");
  const token = "dGqzYBdVwQNTjVRXEegPpkAfRrnzRqja";

  const datasetid = "GHCND";
  const locationid = "CITY:US390029";
  const startdate = "2023-01-01";
  const enddate = "2023-12-31";
  

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
    tabela2.innerHTML = "";

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
    try {
      answer.innerHTML = "";
      tabela2.innerHTML = "";
      tabela.innerHTML = "";
      const response = await fetch(
        `https://www.ncei.noaa.gov/cdo-web/api/v2/data?datasetid=${datasetid}&locationid=${locationid}&startdate=${startdate}&enddate=${enddate}`,
        {
          method: "GET",
          headers: {
            token: token,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch data from NOAA API");

      const data = await response.json();

      if (
        data &&
        data.results &&
        Array.isArray(data.results) &&
        data.results.length > 0
      ) {
        const tableBody = document.getElementById("dataTableBody");
        tableBody.innerHTML = "";

        data.results.forEach((item) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${item.date || "N/A"}</td>
            <td>${item.station || "N/A"}</td>
            <td>${item.value || "N/A"}</td>
          `;
          tableBody.appendChild(row);
        });

        document.getElementById("dataTable").classList.remove("hidden");
      } else {
        throw new Error("No data found or data is in an unexpected format");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      document.getElementById("errorMessage").textContent = error.message;
      document.getElementById("errorMessage").classList.remove("hidden");
    } finally {
      document.getElementById("loading").classList.add("hidden");
    }
  });

  document
    .getElementById("dataForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      fetchClimateData();
    });
})();
