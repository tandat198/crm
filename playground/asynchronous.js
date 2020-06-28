// new Promise(function (resolve, reject) {
//     resolve(10);
//     // reject("failed");
// })
//     .then((res) => res + 20)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));

// node playground/asynchronous

const axios = require("axios");

axios({
    method: "GET",
    url: "https://covid-193.p.rapidapi.com/statistics",
    headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "065898afc8msh4e14e874214a266p1b2b39jsn78a17cb89b88",
        useQueryString: true,
    },
})
    .then((response) => {
        console.log(response.data.response);
    })
    .catch((error) => {
        console.log(error);
    });
