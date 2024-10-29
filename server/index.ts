import express from "express";
import catRoutes from "./routes/catRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur des chats!");
});

app.use("/api", catRoutes);
