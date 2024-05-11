import "dotenv/config";
import app from "./app.js";
import chalk from "chalk";

const port = process.env.PORT ?? 4500;

app.listen(port, () => {
  console.log(
    chalk.cyanBright.underline(`Listening on port http://localhost:${port}`),
  );
});
