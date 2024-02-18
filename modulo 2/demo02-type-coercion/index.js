9999999999999999; // 16
// 10000000000000000

true + 2;
//3

"21" + true;
//'21true'

"21" - true;
//20

"21" - -1;
//22

0.1 + 0.2 === 0.3;
//false

3 > 2 > 1;
//false

3 > 2 >= 1;
//true

"B" + "a" + +"a" + "a";
// BaNaNa

console.assert(String(123) === "123", "explicit convertion to string");
console.assert(123 + "" === "123", "implicit convertion string");
console.assert(
  ("hello" || 1) === "hello",
  "|| se os dois forem true, retorna sempre o primeiro elemento"
);
console.assert(("hello" && 1) === 1, "&& retorna o ultimo elemento");

//--------

const item = {
  name: "Leonardo",
  age: 28,
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  valueOf() {
    return { hey: "dude" };
  },
  //prioridade
  [Symbol.toPrimitive](coercionType) {
    // console.log("trying to convert to", coercionType);

    const types = {
      string: JSON.stringify(this),
      number: "0007",
    };

    return types[coercionType] || types.string;
  },
};

// console.log("toString", String(item));
// //vai retornar NaN, pois valueOf é tipo de referência e o toString, retornou uma string
// console.log("valueOf", Number(item));

//depois de adicionar Symbol.toPrimitive
// console.log("toString", String(item));
// console.log("valueOf", Number(item));
// //chama a conversão default
// console.log("Date :>> ", new Date(item));

console.assert(item + 0 === '{"name":"Leonardo","age":28}0');
console.assert(!!item);
console.assert("A".concat(item) === `A{"name":"Leonardo","age":28}`);
console.assert(item == String(item));

const item2 = { ...item, name: "Fulano", age: 30 };
// console.log("item2 :>> ", item2);
console.assert(item2.name === "Fulano" && item2.age === 30);
