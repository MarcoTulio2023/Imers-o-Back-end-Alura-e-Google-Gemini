import {getTodosPosts, criarPost} from "../models/postsModel.js";
import fs from "fs"
export async function listarPosts(req, res) {
    // Define uma rota GET para a URL "/posts"
    const posts = await getTodosPosts();
    // Chama a função getTodosPosts para obter todos os posts
    res.status(200).json(posts);
    // Envia uma resposta HTTP com status 200 (OK) e o array de posts no formato JSON
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    // tentar
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
        // pegar
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }
    // tentar
    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(postCriado);
        // pegar
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}