const form = document.querySelector("form");
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const API_KEY = "fea6886fedf5c92f8bc46113d33a958e";
const dataHolder = document.getElementById("Data-holder");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const formData = Object.fromEntries([...new FormData(e.currentTarget)]);
    console.log(formData);
    const response = await fetch(
      `${baseUrl}zip=${formData.zip},us&appid=${API_KEY}&units=metric`
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(data.message);
    }
    data.feeling = formData.feeling;
    console.log(data.feeling);
    const serverResponse = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(serverResponse);
    const serverData = await serverResponse.json();
    if (!serverResponse.ok) throw new Error(serverData.message);
    createUi(serverData);
  } catch (error) {
    console.log(error);
    alert("The city is Not Found, Please Provide US Zip code");
  }
});
const createUi = function (data) {
  const markup = data.map(
    (item) =>
      `
  <div id="entryHolder">
  <div>Temprature: ${item.temp} °C</div>
  <div>Min-Temp: ${item.temp_min} °C</div>
  <div>Max-Temp ${item.temp_max} °C</div>
  <div>Weather: ${item.weather}</div>
  <div>Description: ${item.description}</div>
  <div>Date: ${item.date}</div>
    <div>Feeling: ${item.feeling}</div>
  </div>
  `
  );
  dataHolder.innerHTML = "";
  dataHolder.insertAdjacentHTML("beforeend", markup);
};
