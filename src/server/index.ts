import "dotenv/config";
import chalk from "chalk";
import app from "./app.js";

const port = process.env.PORT ?? 4500;

app.listen(port, () => {
  console.log(
    chalk.cyanBright.underline(`Listening on port http://localhost:${port}`),
  );
});
