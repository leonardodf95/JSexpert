const { faker } = require("@faker-js/faker");
const { join } = require("path");
const CarCategory = require("../src/entities/carCategory.js");
const Car = require("../src/entities/car.js");
const { writeFile } = require("fs/promises");
const Customer = require("../src/entities/customer.js");
const seederBaseFolder = join(__dirname, "../", "database");
const ITEMS_AMOUNT = 2;

const carCategory = new CarCategory({
  id: faker.string.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
});
const cars = [];
const customers = [];
for (let i = 0; i <= ITEMS_AMOUNT; i++) {
  const car = new Car({
    id: faker.string.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
  });

  const customer = new Customer({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    age: faker.number.int({ min: 18, max: 50 }),
  });
  carCategory.carIds.push(car.id);
  cars.push(car);
  customers.push(customer);
}

const write = (fileName, data) => {
  writeFile(join(seederBaseFolder, fileName), JSON.stringify(data));
};
(async () => {
  await write("cars.json", cars);
  await write("customers.json", customers);
  await write("carCategory.json", [carCategory]);
})();
