const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
app.use(express.static('public'));
app.use(express.json());
// importo il file di routing 
const postRouter = require("./routers/postRouter");

app.use('/', postRouter);


app.listen(port, () => {
    console.log(`Sto runnando il server su http://localhost:${port}`);
});