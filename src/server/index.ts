import "dotenv/config";
import chalk from "chalk";

import app from "./app.js";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(
    chalk.greenBright.underline("Listening on port http://localhost:4500"),
  );
});
