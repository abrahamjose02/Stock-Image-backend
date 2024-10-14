"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRoute_1 = __importDefault(require("./src/routes/authRoute"));
const db_1 = __importDefault(require("./src/config/db"));
const imageRoute_1 = __importDefault(require("./src/routes/imageRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_1.default)()
    .then(() => console.log('Connected to Database'))
    .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
});
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://stockimage.vercel.app/'
        : 'http://localhost:5173',  
    credentials: true, 
}));
app.use((0, cookie_parser_1.default)());
app.use('/api/auth', authRoute_1.default);
app.use('/api/image', imageRoute_1.default);
const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`);
});
