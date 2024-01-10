"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user/user.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin/admin.routes"));
const login_routes_1 = __importDefault(require("./routes/login/login.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 5000;
app.get("/", (_req, res) => {
    res.send("Welcome");
});
// Configurar CORS
const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:5000", "http://localhost:5173", "https://frontend-lake-five.vercel.app"], // Permite solicitudes solo desde esta URL
    optionsSuccessStatus: 200, // Algunos navegadores 204 (sin contenido) responde a las preflight OPTIONS con 204
};
app.use((0, cors_1.default)(corsOptions));
app.use("/", user_routes_1.default);
app.use("/", admin_routes_1.default);
app.use("/", login_routes_1.default);
app.listen(port, () => {
    console.log("listening on port " + port + "🏗️");
});
