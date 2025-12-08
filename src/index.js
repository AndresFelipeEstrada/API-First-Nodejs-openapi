import express from "express";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

const app = express();
const PORT = 3000;

const swaggerDocument = YAML.load("./openapi.yaml");

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.json({ success: "hello" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
