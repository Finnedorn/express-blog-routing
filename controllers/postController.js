const fs = require("fs");
const path = require("path");
const blogPosts = require("../db/db-blog.json");
const placeHolder = "{{placeholder}}";
function pageContentReplacer(oldcontent, content) {
    const filePath = path.join(__dirname, "../page.html");
    return fs.readFileSync(filePath, "utf-8").replace(oldcontent, content);
}


function index(req,res) {
    res.format({
        html: () => {
            let newHtml = ``;
            blogPosts.forEach(post=>{
                newHtml += `
                <div class="card overflow-hidden m-2" style="width: 400px">
                    <div class="overflow-hidden position-relative">
                        <img src="${post.image}" class="card-img-top" alt="immagine-di-${post.slug}">
                    </div>
                    <div class="card-body">
                        <a href="http://localhost:8080/${post.slug}">
                            <h5 class="card-title text-center mb-3">${post.title}</h5>
                        </a>
                        <p class="card-text">${post.content.length > 30 ? post.content.slice(0,150) + "..." : post.content}</p>
                        <ul>
                `;
                post.tags.forEach(tag =>{
                    newHtml += `
                        <li class="list-unstyled">${tag}</li>
                    `
                    });
                newHtml += `
                        </ul>
                    </div>
                </div>
                `
            });
            res.send(pageContentReplacer(placeHolder, newHtml));
        },
        json: () => {
            res.json(blogPosts);
        }
    })
};

function show(req,res) {
    const slugRequested = req.params.slug;
    const findedPost = blogPosts.find( post => post.slug === slugRequested);
    if(findedPost){
        res.format({
            html: () => {
                let newHtml = ``;
                newHtml += `
                    <div class="card overflow-hidden m-2" style="width: 400px">
                        <div class="overflow-hidden position-relative">
                            <img src="${findedPost.image}" class="card-img-top" alt="immagine-di-${findedPost.slug}">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title text-center mb-3">${findedPost.title}</h5>
                            <p class="card-text">${findedPost.content}</p>
                            <ul>
                    `;
                    findedPost.tags.forEach(tag =>{
                        newHtml += `
                            <li class="list-unstyled">${tag}</li>
                        `
                        });
                    newHtml += `
                            </ul>
                            <a href="http://localhost:8080/">< Pagina Precedente</a>
                        </div>
                    </div>
                    `
                res.send(pageContentReplacer(placeHolder, newHtml));
            },
            json: () => {
                res.json(findedPost);
            }
        })
    } else {
        res.status(404).send(pageContentReplacer("../page.html",
        "<p>mi spiace, non abbiamo trovato il post che stai cercando</p>"))
    }
};

function download(req, res) {
    const mySlug = decodeURIComponent(req.params.slug);
    const slugPath = path.join(__dirname, "../public", `${mySlug}.jpeg`);
    console.log(slugPath);
    if(fs.existsSync(slugPath)){
        res.download(slugPath,`${mySlug}.jpeg`);
    }else {
        res.status(404).send("file non trovato");
    }
};

function create(req, res) {
    res.format({
        html: () => {
            let newHtml = ``;
            newHtml += `
                <h5 class="text-center mb-3">Hai creato un nuova Ricetta!</h5>
                <a href="http://localhost:8080/">< Torna alla pagina precedente</a>
                `
            res.send(pageContentReplacer(placeHolder, newHtml));
        },
        json: () => {
            res.status(406).send("File richiesto non supportato");
        }
    })
}

module.exports = {
    index,
    show,
    download,
    create
}