import express from "express";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import OpenApiValidator from "express-openapi-validator";
import userRoutes from "./routes/user.js";

const app = express();
const PORT = 3000;

const swaggerDocument = YAML.load("./openapi.yaml");

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.json());

app.use(
  OpenApiValidator.middleware({
    apiSpec: swaggerDocument,
    validateRequests: true,
    validateResponses: true,
    ignorePaths: /.*\/docs.*/,
  }),
);

app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.get("/hello", (_req, res) => {
  res.json({ success: "hello" });
});

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/docs`);
});
