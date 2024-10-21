const myArr = [1,2,3,4,5]

// console.log(myArr);

// const myArr2 = [...myArr,10,20,30]
// console.log(myArr2);

// const myArr3 = new Array('a','b','c','d')
// console.log(myArr3);


// Array Methods
// push and pop
// myArr.push(100,200)
// console.log(myArr);

// myArr.pop()
// console.log(myArr);

// shift and unshift
// console.log(myArr);
// myArr.shift()
// console.log(myArr);

// myArr.unshift(-1000)
// console.log(myArr);
// myArr.shift()
// console.log(myArr);

// Common array methods
// console.log(myArr.includes(100));
// console.log(myArr.indexOf(5));
// console.log(myArr.join(' | ')); // gives op as string

// slice, spilce.  
//slice doesnt include last index, makes a copy of original array
// console.log(myArr.slice(1,4));
// console.log(myArr)

// splice includes last index, affects original array
// console.log(myArr.splice(1,4))
// console.log(myArr);


// const marvelHeros = ["thor", "iron man", "spiderman"]
// const dcHeros = ["superman", "wonder woman", "batman"]

// marvel_heros.push(dc_heros)
// marvel_heros.push(...dc_heros)
// console.log(marvel_heros);

// const allHeros = marvelHeros.concat(dcHeros)
// console.log(allHeros);

// flat()
// const mutidimensionalArray = [1,2,3,[4,5,6],7,8,[9,10,[11,12,13]], [14,15,16]]
// console.log(mutidimensionalArray);

// const flattenedArray = mutidimensionalArray.flat(2)
// const flattenedArray = mutidimensionalArray.flat(Infinity)
// console.log(flattenedArray);

// console.log(Array.isArray(marvelHeros));
// console.log(Array.from("Hi! My name is Samyak Nagrale"));

// const userObj ={username:'Samyak',
//     email:'sam@gmail.com',
//     isLogged:false
// }

// console.log(Array.from(userObj).keys());

// Multidimensional Array

let array1 = [1,2,3,4,5]
let array2 = Array.from(array1,(x) => {return x+1})
let array3 = Array.from(array2, (x) => {return x*10})
let multidimensionalArray = [array1, array2, array3]
// console.log(multidimensionalArray);

// multidimensionalArray[0].push('Push in 0th array')
// console.log(multidimensionalArray);

// multidimensionalArray[0].unshift('Start of array')
// console.log(multidimensionalArray);

// multidimensionalArray.pop()
// console.log(multidimensionalArray)


// console.log(array1);
// array1.splice(0,)
// console.log(array1);
// delete array1
// console.log(array1);

// Reverse array
// console.log(array1);
// // array1.reverse() // changes original array
// console.log(array1);

// let reversedArray1 = array1.toReversed() // does not affect original array
// console.log(reversedArray1);
// console.log(array1);

let arrayUnsorted = [5,4,3,2,1,0,-1,-2,-3]
console.log(arrayUnsorted);
console.log(arrayUnsorted.sort((a,b)=>{return a - b}));
