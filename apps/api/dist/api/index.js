"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const catRoutes_1 = __importDefault(require("./routes/catRoutes"));
const errors_1 = require("./utils/errors");
const initCats_1 = __importDefault(require("./scripts/initCats"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)({
    origin: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'
}));
app.use(express_1.default.json());
app.get('/', (req, res) => res.send('Express on Vercel'));
app.get('/test', (req, res) => {
    res.json({ message: 'API is working' });
});
app.use('/api', catRoutes_1.default);
app.use((req, res, next) => {
    next(new errors_1.NotFoundError(`Route not found - ${req.originalUrl}`));
});
app.use((err, req, res, next) => {
    console.error(err);
    if (err instanceof errors_1.AppError) {
        res.status(err.statusCode).json({
            status: 'error',
            statusCode: err.statusCode,
            message: err.message
        });
    }
    else {
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'An unexpected error occurred',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await (0, initCats_1.default)();
});
