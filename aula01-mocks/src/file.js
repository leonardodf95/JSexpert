const { readFile } = require("fs/promises");
const { join } = require("path");
const { error } = require("./constants.js");
const User = require("./user.js");

const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);
    const validation = File.isValid(content);
    if (!validation.valid) throw new Error(validation.error);
    const users = File.parseCsvToJson(content);
    return users;
  }

  static async getFileContent(filePath) {
    // const filename = join(__dirname, filePath);
    return (await readFile(filePath)).toString("utf8");
  }

  static isValid(csvString, options = DEFAULT_OPTION) {
    const [header, ...fileWithoutHeader] = csvString.split("\n");
    const headerValid = header === options.fields.join(",");
    if (!headerValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }

    const isContentLengthAccepted =
      fileWithoutHeader.length > 0 &&
      fileWithoutHeader.length <= options.maxLines;

    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }

    return { valid: true };
  }

  static parseCsvToJson(csv) {
    const lines = csv.split("\n");
    //remove a primeira linha do array e joga na variável
    const firstLine = lines.shift();
    const header = firstLine.split(",");

    const users = lines.map((line) => {
      const columns = line.split(",");
      let user = {};
      for (const index in columns) {
        user[header[index]] = columns[index];
      }
      return new User(user);
    });

    return users;
  }
}

module.exports = File;
