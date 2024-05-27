const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
app.use(express.static('public'));
app.use(express.json());
// importo il file di routing 
const postRouter = require("./routers/postRouter");

app.get('/',(req,res) =>{
    res.redirect('/posts');
});

app.use('/posts', postRouter);

app.listen(port, () => {
    console.log(`Sto runnando il server su http://localhost:${port}`);
});