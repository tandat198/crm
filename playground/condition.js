// node playground/condition

const isError = true;

// if (isError === true) {
//     console.log("Error");
// }
// // Cách viết này có thể viết lại ngắn hơn như sau:
// if (isError) {
//     console.log("Error");
// }

// if (isError === false) {
//     console.log("No Error");
// }
// // Cách viết này có thể viết lại như sau:
// if (!isError) {
//     console.log("Error");
// }

// undefined, null, "", 0 tương đương với false
if (undefined) {
    console.log(undefined);
}
if (null) {
    console.log(null);
}
if ("") {
    console.log("");
}
if (0) {
    console.log(0);
}

if (1) {
    console.log(1);
}
if ("a") {
    console.log("a");
}
