const http = require("http");
const urlEncod = require("url");
const qs = require("querystring");
const { join } = require("path");

const CarService = require("./service/carService.js");
const { readFile } = require("fs/promises");
const carsDatabase = join(__dirname, "../database/cars.json");
const categorys = require("../database/carCategory.json");
const carService = new CarService({ cars: carsDatabase });

const routes = {
  "/contact:get": (req, res) => {
    res.write("contact us page");
    return res.end();
  },
  "/car:get": async (req, res) => {
    const selectedCategory = categorys.find(
      (category) => category.id === req.query.category
    );
    const car = await carService.getAvailableCar(selectedCategory);

    return res.writeHead(200).end(JSON.stringify(car));
  },
  default: (req, res) => {
    res.write("Hello World");
    return res.end();
  },
};

const handler = function (req, res) {
  const { url, method } = req;
  const { query, pathname } = urlEncod.parse(url);
  const queryParsed = qs.parse(query);
  req.query = queryParsed;
  const routeKey = `${pathname}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;
  res.writeHead(200, {
    "Content-Type": "text/html",
  });
  return chosen(req, res);
};

const app = http
  .createServer(handler)
  .listen(3000, () => console.log("app running at", 3000));

module.exports = app;
