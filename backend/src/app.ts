
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";

// Routes
import productsRoutes from "./routes/productsRoutes";
import orderRoutes from "./routes/orderRoutes";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";


const app: Application = express();

// Helmet with cross-origin images allowed
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());


// Serve static files from the "public/uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

//routes
app.use("/api/products", productsRoutes);
app.use("/api/orders", orderRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
