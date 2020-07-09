const { mapReduce } = require("./backend/models/User");

let testMap = new Map();
testMap.set('one', 1);
testMap.set('two', 2);
testMap.set('three', null);

testMap.forEach((value, key) => {
    console.log(key + ":" + value);
});

console.log(testMap.has('three'));