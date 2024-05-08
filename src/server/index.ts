import "dotenv/config";

import app from "./app.js";
import chalk from "chalk";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(
    chalk.greenBright.underline("Listening on port http://localhost:4500"),
  );
});
