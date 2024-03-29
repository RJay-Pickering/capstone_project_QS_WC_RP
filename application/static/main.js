var news = document.getElementById("news");

navigator.geolocation.getCurrentPosition(showPosition);

function showPosition(position) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=7478d475030acf9b38bb829cba45b7b5`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      var city = document.getElementById("city");
      var temp = document.getElementById("temp");
      city.innerText = `City: ${data.name}`;
      temp.innerText = `Current Temperature: ${Math.round(data.main.temp)}°F`;
    });
}

var API_Link = ""

try {
  var section_data = document.getElementById("ignore_me").innerText
} catch {
  var section_data = "ERROR"
}

if (section_data=== "Search"){
  fetch(
    `https://newsdata.io/api/1/news?apikey=pub_56870dc5f12b0d125f359b92537755980553&image=1&full_content=1&prioritydomain=top&country=us&language=en`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("tested search")
      apples = 0;
      Array.from(data.results).forEach(function (a) {
        console.log(data.results)
        var randomAdPlace = Math.floor(Math.random() * 10) + 1;
        console.log(randomAdPlace);
        if (randomAdPlace === 5) {
          randomAdFunction(apples);
          apples++;
        } else {
          apples++;
          const aLink = document.createElement("a");
          aLink.href = `${a.link}`;
          aLink.target = "_blank";
          const article = document.createElement("div");
          const desc = document.createElement("p");
          try {
            console.log("Words in description: " + a.description.split("").length)
            if (a.description.split("").length >= 5000) {
              desc.innerText = "*Too much text to process! Please click me to view description*";
            } else {
              desc.innerText = a.description;
            }
          }
          catch {
            desc.innerText = "No text available!"
          }
          desc.style.fontSize = "10px";
          const date = document.createElement("p");
          date.innerText = `Published: ${a.pubDate}`;
          article.classList.add("card");
          const image = document.createElement("img");
          if (a.image_url == null) {
            image.src =
              "https://miro.medium.com/max/1400/1*T9VUDALam3DIS0wHDWrxBg.png";
          } else {
            image.src = a.image_url;
          }
          image.onerror = function() {
            image.src = "https://miro.medium.com/max/1400/1*T9VUDALam3DIS0wHDWrxBg.png"
          };
          image.classList.add("apiImage");
          const title = document.createElement("p");
          title.innerText = a.title;
          article.appendChild(title);
          article.appendChild(image);
          article.appendChild(desc);
          aLink.classList.add("aLink");
          aLink.appendChild(article);
          const one = document.getElementById("one");
          one.classList.add("column");
          one.appendChild(aLink);
          console.log(article);
        }
      });
    });
} else {
  fetch(
    `https://newsdata.io/api/1/news?apikey=pub_56870dc5f12b0d125f359b92537755980553&qInTitle=${section_data}&image=1&full_content=1&prioritydomain=top&language=en`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("tested custom search")
      console.log(data)
      apples = 0;
      if (data.status == "success"){
        if (data.results == 0){
          var foot = document.getElementById("foot")
          foot.style.position = "absolute"
          foot.style.bottom = "0"
          alert("No articles related to your search!")
        }else{
          Array.from(data.results).forEach(function (a) {
            console.log(data.results)
            var randomAdPlace = Math.floor(Math.random() * 10) + 1;
            console.log(randomAdPlace);
            if (randomAdPlace === 5) {
              randomAdFunction(apples);
              apples++;
            } else {
              apples++;
              const aLink = document.createElement("a");
              aLink.href = `${a.link}`;
              aLink.target = "_blank";
              const article = document.createElement("div");
              const desc = document.createElement("p");
              try {
                console.log("Words in description: " + a.description.split("").length)
                if (a.description.split("").length >= 5000) {
                  desc.innerText = "*Too much text to process! Please click me to view description*";
                } else {
                  desc.innerText = a.description;
                }
              }
              catch {
                desc.innerText = "No text available!"
              }
              desc.style.fontSize = "10px";
              const date = document.createElement("p");
              date.innerText = `Published: ${a.pubDate}`;
              article.classList.add("card");
              const image = document.createElement("img");
              if (a.image_url == null) {
                image.src =
                  "https://miro.medium.com/max/1400/1*T9VUDALam3DIS0wHDWrxBg.png";
                image.style.width = "250px";
                image.style.height = "200px";
              } else {
                image.src = a.image_url;
                image.style.width = "250px";
                image.style.height = "200px";
              }
              image.onerror = function() {
                image.src = "https://miro.medium.com/max/1400/1*T9VUDALam3DIS0wHDWrxBg.png"
              };
              image.classList.add("apiImage");
              const title = document.createElement("p");
              title.innerText = a.title;
              article.appendChild(title);
              article.appendChild(image);
              article.appendChild(desc);
              aLink.classList.add("aLink");
              aLink.appendChild(article);
              const one = document.getElementById("one");
              one.classList.add("column");
              one.appendChild(aLink);
              console.log(article);
            }
          });
        }
      } else {
        var foot = document.getElementById("foot")
          foot.style.position = "absolute"
          foot.style.bottom = "0"
          alert("Uh oh... Our requests for the news has been used up! Please come back tomorrow!")
      }
    });
}

function randomAdFunction(i) {
  fetch("/static/ads.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var randoad = Math.floor(Math.random() * 8);
      const a = data[randoad];

      const aLink = document.createElement("a");
      aLink.href = `${a.link}`;
      aLink.target = "_blank";
      const article = document.createElement("div");
      const desc = document.createElement("p");
      desc.innerText = a.creator;
      desc.style.fontSize = "10px";
      article.classList.add("card");
      const image = document.createElement("img");
      image.src = a.image_url;
      image.classList.add("apiImage");
      const title = document.createElement("p");
      title.innerText = a.title;
      aLink.classList.add("aLink");
      const adImage = document.createElement("img");
      adImage.src = "../static/ad.png"
      adImage.classList.add("adImageCSS")
      aLink.appendChild(title);
      aLink.appendChild(image);
      aLink.appendChild(desc);
      aLink.appendChild(adImage)
      article.appendChild(aLink);
      const one = document.getElementById("one");
      one.insertBefore(article, one.children[i]);
      console.log(article);
    });
}

function WordCount(str) { 
  return str.split(" ").length;
}

console.log("word count: " + WordCount("hello world"));


var sidebarElement = document.getElementById("helpSidebar")

sidebarElement.classList.add("close_sidebar_JS-CSS")

function openNav() {
  sidebarElement.classList.add("open_sidebar_JS-CSS")
  sidebarElement.classList.add("sidebarHelper_padding_issue")
  sidebarElement.classList.remove("close_sidebar_JS-CSS")
}

function closeNav() {
  sidebarElement.classList.add("close_sidebar_JS-CSS")
  sidebarElement.classList.remove("sidebarHelper_padding_issue")
  sidebarElement.classList.remove("open_sidebar_JS-CSS")
}

function openHelp() {
  sidebarElement.classList.add("open_sidebar_JS-CSS")
  sidebarElement.classList.add("sidebarHelper_padding_issue")
  sidebarElement.classList.remove("close_sidebar_JS-CSS")
}

function closeHelp() {
  sidebarElement.classList.remove("open_sidebar_JS-CSS")
  sidebarElement.classList.remove("sidebarHelper_padding_issue")
  sidebarElement.classList.add("close_sidebar_JS-CSS")
}

function openNavMenu() {
  document.getElementById("mySidebar").classList.add("open_sidebar_JS-CSS");
  document.getElementById("mySidebar").classList.remove("close_sidebar_JS-CSS");
}

function closeNavMenu() {
  document.getElementById("mySidebar").classList.add("close_sidebar_JS-CSS");
  document.getElementById("mySidebar").classList.remove("open_sidebar_JS-CSS");
}