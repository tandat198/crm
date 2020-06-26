new Promise(function (resolve, reject) {
    resolve(10);
    reject("failed");
})
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

// node playground/asynchronous
