const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const id = uuid();
  repositories.push({
    id,
    likes: 0,
    title,
    url,
    techs,
  });
  const repository = repositories.find((repo) => repo.id === id);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const res = repositories.findIndex((repo) => repo.id === id);

  if (res < 0) {
    return response.status(400).json({ message: "ID not exists" });
  }

  const repository = (repositories[res] = {
    ...repositories[res],
    title,
    url,
    techs,
  });

  return response.status(200).json(repository);
});

app.delete("/repositories/:id", (req, res) => {
  // TODO
  const { id } = req.params;
  const indexRepository = repositories.findIndex((repo) => (repo.id = id));
  if (indexRepository < 0) {
    return res.status(400).json({ message: "Irepository not found" });
  }

  repositories.splice(indexRepository, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const indexRepository = repositories.findIndex((repo) => repo.id === id);
  if (indexRepository < 0) {
    return response.status(400).json({ message: "repository not found" });
  }

  repositories[indexRepository] = {
    ...repositories[indexRepository],
    likes: repositories[indexRepository].likes + 1,
  };
  return response.json(repositories[indexRepository]);
});

module.exports = app;
