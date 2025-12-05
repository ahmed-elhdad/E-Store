// Libs
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import compression from "compression";
// Routes
import reviewsroutes from "./src/routes/reviewsRoutes.js";
import prudoctsRoutes from "./src/routes/prudoctsRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import cartRoutes from "./src/routes/cardRoutes.js";
import ordersRoutes from "./src/routes/ordersRoutes.js";
import WishListRoutes from "./src/routes/wishListRoutes.js";
// Config
import connectDB from "./src/config/db.js";
import { swaggerSpec, swaggerUi } from "./src/config/swagger.config.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

// Serve static files (uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(compression());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Swagger API Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "E-commerce API Documentation",
  })
);

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/prudocts", prudoctsRoutes);
app.use("/api/v1/carts", cartRoutes);
app.use("/api/v1/orders", ordersRoutes);
app.use("/api/v1/wishList", WishListRoutes);
app.use("/api/v1/reviews", reviewsroutes);
app.get("/", (req, res) => {
  res.send("Welcome from backend");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
  console.log(
    `API Documentation available at http://localhost:${process.env.PORT}/api-docs`
  );
});
