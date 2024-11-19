//importa o servidor express
import express from "express";

const posts = [
    {
        id: 1,
        descricao: "Uma foto teste",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        descricao: "Paisagem montanhosa",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 3,
        descricao: "Cachorro brincando no parque",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 4,
        descricao: "Pratos deliciosos da culinária italiana",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 5,
        descricao: "Carro esportivo vermelho",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 6,
        descricao: "Gato dormindo em uma caixa",
        imagem: "https://placecats.com/millie/300/150"
    }
];

// criada a variavel app para receber o servidor
const app = express();
app.use(express.json());

// o servidor local está na porta 3000
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

//rota para o json mostrar os posts, trabalhando com o status 200 que é o status sucesso
app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

// função para buscar o post pelo o id
function buscarPostPorID(id){
    return posts.findIndex((post) => {
        return post.id === Number(id) // existe alguém com o mesmo id?
    })
}

// rota para mostrar cada imagem individual atraves do id
app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorID(req.params.id)
    res.status(200).json(posts[index]); // devolver da lista de posts somente o que tem o id solicitado
});