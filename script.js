document.querySelector("form").addEventListener("submit", nasa);

function nasa(e) {
  e.preventDefault();
  let date = document.getElementById("date").value;
  console.log(date);
  fetch(
    `https://api.nasa.gov/planetary/apod?date=${date}&hd=true&api_key=H4utc5LjQO8ATGy2c7x8LeWaVN5WP3i67KWWzhsB`
  )
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      document.querySelector("h2").innerText = response.title;
      document.querySelector(".container").style.display="flex";
      if (response.media_type == "image") {
        document.querySelector("img").src = response.hdurl;
      } else {
        let iframe = document.querySelector("iframe");
        iframe.src = response.url;
        iframe.style.display = "block";
      }
      document.getElementById("description").innerText = response.explanation;
    })
    .catch((err) => {
      console.log(`error ${err}`);
      alert("sorry, there are no results for your search");
    });
}
