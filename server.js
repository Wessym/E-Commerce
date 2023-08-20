// import app file
const app = require("./backend/app");

// app is listening on PORT 3000 (http://localhost:3000)
app.listen(3000, () => {
    console.log("APP is listening on PORT 3000 ...");
});