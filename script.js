document.addEventListener("DOMContentLoaded", function(){
  const text = "Enter a date: ";
  const element = document.getElementById("enter-date");
  let index = 0;
  function typeWriter(){
    if(index < text.length){
      element.innerHTML +=text.charAt(index);
      index++;
      setTimeout(typeWriter, 200);
    }
  }
  typeWriter();

  document.getElementById('submit-btn').addEventListener('click' , function(e){
    e.preventDefault();

    let date = document.getElementById("date").value;
    if(date) {
      fetch(
            `https://api.nasa.gov/planetary/apod?date=${date}&hd=true&api_key=H4utc5LjQO8ATGy2c7x8LeWaVN5WP3i67KWWzhsB`
          )
          .then(res => res.json())
          .then(response => {
            console.log(response);
            document.getElementById('selected-date').innerText = date;
            document.querySelector("h2").innerText = response.title;
            document.getElementById("description").innerText = response.explanation;

            if (response.media_type === "image"){
              document.getElementById('output-img').src = response.hdurl;
              document.getElementById('output-img').style.display = 'flex';
              document.getElementById('output-iframe').style.display = 'none';
            } else {
              document.getElementById('output-iframe').src = response.url;
              document.getElementById('output-iframe').style.display = 'flex';
              document.getElementById('output-img').style.display = 'none';
            }

            document.getElementById('input-screen').style.opacity = 0;
            setTimeout(function(){
              document.getElementById('input-screen').style.display = 'none';
              document.getElementById('output-screen').style.display = 'flex';
              document.getElementById('output-screen').style.opacity = '1';
            }, 500);
          })
          .catch((err) => {
                  console.log(`error ${err}`);
                  alert("sorry, there are no results for your search");
            });
          } else {
            alert('Please enter a date.');
          }
});

document.getElementById('header-title').addEventListener('click', function() {
  document.getElementById('output-screen').style.opacity = '0';
  setTimeout(function() {
      document.getElementById('output-screen').style.display = 'none';
      document.getElementById('input-screen').style.display = 'flex';
      document.getElementById('input-screen').style.opacity = '1';
  }, 500);
});
});