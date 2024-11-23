// Importa o framework Express.js para construir aplicações web
import express from "express";

// Importa o middleware Multer para lidar com uploads de arquivos
import multer from "multer";

// Importa funções para listar posts, criar novos posts e lidar com uploads de imagens do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento para arquivos usando o diskStorage do Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório onde os arquivos serão salvos 1  (ajuste o caminho de acordo com a sua estrutura de projeto)
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo por simplicidade
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer usando a configuração de armazenamento definida anteriormente
const upload = multer({ storage });
// Alternativa para Linux/Mac (se não estiver usando storage):
// const upload = multer({ dest: "./uploads" });  // Ajuste o caminho se necessário

// Define uma função para configurar as rotas da aplicação
const routes = (app) => {
  // Habilita o middleware express.json() para que a aplicação possa entender requisições com corpo no formato JSON
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota GET para buscar todos os posts (chama a função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (chama a função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (usa upload.single("imagem") para lidar com um único arquivo e chama a função uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

// Exporta a função routes como o valor padrão para que possa ser importada em outros módulos
export default routes;