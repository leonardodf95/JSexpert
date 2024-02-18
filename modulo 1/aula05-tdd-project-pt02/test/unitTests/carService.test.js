const { describe, it, before, beforeEach, afterEach } = require("mocha");
const CarService = require("../../src/service/carService.js");

const { join } = require("path");
const { expect } = require("chai");
const sinon = require("sinon");
const carsDatabase = join(__dirname, "../../database", "cars.json");

const mocks = {
  validCarCategory: require("../mocks/validCarCategory.json"),
  validCar: require("../mocks/validCar.json"),
  validCustomer: require("../mocks/validCustomer.json"),
};

describe("CarService Suite Tests", () => {
  let carService = {};
  let sandbox = {};
  before(() => {
    carService = new CarService({
      cars: carsDatabase,
    });
  });
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("Should retrieve a random position from an array", () => {
    const data = [0, 1, 2, 3, 4];

    const result = carService.getRandomPositionFromArray(data);

    expect(result).to.be.lte(data.length).and.be.gte(0);
  });

  it("Should choose the first id from carIds in carCategory", async () => {
    const carCategory = mocks.validCarCategory;
    const carIdIndex = 0;

    sandbox
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(carIdIndex);

    const result = carService.chooseRandomCar(carCategory);
    const expected = carCategory.carIds[carIdIndex];

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(result).to.be.deep.equal(expected);
  });

  it("Given a carCategory it should return an avaiable car", async () => {
    const car = mocks.validCar;
    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.carIds = [car.id];

    sandbox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car);

    sandbox.spy(carService, carService.chooseRandomCar.name);

    const result = await carService.getAvailableCar(carCategory);
    const expected = car;

    expect(carService.chooseRandomCar.calledOnce).to.be.ok;
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok;
    expect(result).to.be.deep.equal(expected);
  });
});
