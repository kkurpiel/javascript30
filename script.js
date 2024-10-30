(function () {
  const cw1 = document.getElementById("cw1");
  const cw2 = document.getElementById("cw2");
  const cw3 = document.getElementById("cw3");
  const answer = document.getElementById("answer");
  const tabela = document.getElementById("tabela");

  cw1.addEventListener("click", function () {
    answer.innerHTML = "";
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
    // TODO: Implement functionality for cw2
  });

  cw3.addEventListener("click", function () {
    // TODO: Implement functionality for cw3
  });
})();
