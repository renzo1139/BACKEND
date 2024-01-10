import express from "express";
import cors from "cors";
import User from "./routes/user/user.routes";
import Admin from "./routes/admin/admin.routes";
import Login from "./routes/login/login.routes";

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (_req, res) => {
  res.send("Welcome");
});

// Configurar CORS
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5000", "http://localhost:5173", "https://frontend-lake-five.vercel.app","https://front-liart-xi.vercel.app"], // Permite solicitudes solo desde esta URL
  optionsSuccessStatus: 200, // Algunos navegadores 204 (sin contenido) responde a las preflight OPTIONS con 204
};

app.use(cors(corsOptions));
app.use("/", User);
app.use("/", Admin);
app.use("/", Login);

app.listen(port, () => {
  console.log("listening on port " + port + "🏗️");
});
