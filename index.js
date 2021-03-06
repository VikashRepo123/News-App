// Initialize the news api parameters
let country = 'in';
let apiKey = config.API_KEY; // Add YOUR_API_KEY

// Grab the news container
let newsAccordion = document.getElementById('newsAccordion');

// Create an ajax get request
const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`, true);

// What to do when response is ready
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        // console.log(json)
        let articles = json.articles;
        // console.log(articles);
        let newsHtml = "";
        articles.forEach(function (element, index) {
            const date = new Date(element["publishedAt"]);
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const dat = date.getDate(date)+" "+monthNames[date.getMonth(date)]+" "+date.getFullYear(date);
            var ampm = date.getHours(date) >= 12 ? 'pm' : 'am';
            const time = date.getHours(date)+":"+date.getMinutes(date)+ampm;
            // console.log(element, index)
            let news = `<div class="card">
                            <div class="card-header" id="heading${index}">
                                <h2 class="mb-0">
                                <a class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
                                    aria-expanded="false" aria-controls="collapse${index}">
                                   <b>Breaking News ${index + 1}:</b> ${element["title"]} - Published At: ${dat} ${time}
                                </a>
                                </h2>
                            </div>

                            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
                                <h3><b>${element["title"]}</b></h3>
                                <p>${element["description"]}</p> 

                                <div class="card-body"> <p>${element["content"]}</p>. <a href="${element['url']}" target="_blank" >Read more here</a>
                                <img src="${element["urlToImage"]}">
                                </div>
                            </div>
                        </div><hr>`;
            newsHtml += news;
        });
        newsAccordion.innerHTML = newsHtml;
    }
    else {
        console.log("Some error occured")
    }
}

xhr.send()