const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const targetPath = path.join(
  __dirname,
  "src",
  "environment",
  "environment.ts"
);

const envConfigFile = `export const environment = {
  production: false,
  baseUrl: '${process.env.BASE_URL}',
};
`;

fs.writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    console.error("Gagal menulis file environment.ts:", err);
  } else {
    console.log(`File environment.ts berhasil dibuat di ${targetPath}`);
  }
});
