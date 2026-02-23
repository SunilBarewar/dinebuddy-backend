import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";

import { HttpError } from "@/exceptions/http-error";
import adminFloorTableRouter from "@/routes/admin/admin-floor-table.routes";
import userFloorTableRouter from "@/routes/floor-table.routes";

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Welcome to Restaurant Management Backend API",
    status: "success",
    timestamp: new Date().toISOString(),
  });
});

// Health check route
app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/admin", adminFloorTableRouter);
app.use("/api/v1", userFloorTableRouter);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found",
    status: "error",
    path: req.path,
  });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);

  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      message: err.message,
      status: "error",
    });

    return;
  }

  res.status(500).json({
    message: "Internal server error",
    status: "error",
    error: process.env.SERVER_ENV === "development" ? err.message : undefined,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV ?? "development"}`);
  console.log(`URL: http://localhost:${PORT}`);
});

export default app;
