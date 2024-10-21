// const course = {
//     coursename:"js complete",
//     price:"999",
//     courseInstructor:"abc"
// }

// json stringify: converts js object into json

// JSON.stringify(value , [,reciever, space])

// console.log(typeof JSON.stringify(course));
// console.log(JSON.stringify(course, null, 4));
// console.log(JSON.stringify(value, reciever, space));


// JSON parse: decodes json to js object
// let jsonString = `{
//     "coursename": "js complete",
//     "price": "999",
//     "courseInstructor": "abc"
// } `

// parse JSON string
// console.log(typeof JSON.parse(jsonString)); // this is an object
// console.log(JSON.parse(jsonString));

// Destructuring in JS
// destructuring array
// const newArray = [1,2,3,4,5,6]
// const [x, y , ...z] = newArray
// console.log(x," | ",y, " | ", z);


// destructuring object
// const nestedObject = {
//     section1:{1:"a", 2: "b"},
//     section2:{3: "c", 4: "d", 5:"e", 6:"f"}
// }
// const { section1:{1:a1}, section2:{5:a2}} = nestedObject
// console.log(a1, " | ",a2)

// Object Default Values
// const newArray = [1,2,3,4,5,6]
// const newArray = [1]
// const [x, y = "default value" , ...z] = newArray
// console.log(x," | ",y, " | ", z);

// Object Property Alias
// const appUser = {
//     email:"sam@abc.com",
//     fullName:{
//         firstName:"John",
//         lastName:"Doe"
//     }
// }

// let {fullName:{lastName: lName } } = appUser
// console.log(lName);

// let { fullName:{ firstName: fName } } = appUser
// console.log(fName);

// Array destructuring
// const fruits = ["Bananas", "Oranges", "Apples", "Mangos"];

// let [fruits1, ...fruits2] = fruits
// console.log(fruits1,fruits2);
