import { Router } from "express";

const userRoutes = Router();

const users = [
  {
    id: "1",
    name: "Andres Felipe",
    age: 30,
    email: "andres@test.com",
  },
  {
    id: "2",
    name: "Maria Gomez",
    age: 20,
    email: "maria@test.com",
  },
];

userRoutes.post("/", (req, res) => {
  const { name, age, email } = req.body;
  const newUser = {
    id: globalThis.crypto.randomUUID(),
    name,
    age,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

userRoutes.post("/:id", (req, res) => {
  const userId = Number(req.params.id);
  const { name, age, email } = req.body;

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const updatedUser = {
    id: userId,
    name,
    age,
    email,
  };

  users[userIndex] = updatedUser;
  res.json(200).json(updatedUser);
});

userRoutes.get("/:id", (req, res) => {
  const userId = req.params.id;
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  res.json({
    id: user.id,
    name: user.name,
    age: user.age,
    email: user.email,
  });
});

export default userRoutes;
