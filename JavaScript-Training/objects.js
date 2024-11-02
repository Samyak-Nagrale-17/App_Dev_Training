const appUser = {
    email:"abc@abc.com",
    username: "abcUser123",
    age:22,
    location:"Pune",
    cookieActive: true,
}

// console.log(appUser.email);
// console.log(appUser["email"]);

// console.table(appUser)

// appUser.email = "abc@gmail.com"
// console.table(appUser)
// Object.freeze(appUser)
// console.table(appUser)

// appUser.email = "abc@abc.com"
// console.table(appUser)

appUser.greeting = function(){
    console.log(`Welcome ${this.username}`);
}
// console.table(appUser)
// appUser.greeting()


// const regularUser = new Object({email:'xyz@gmail.com', phone:'12345'})
// console.log(regularUser)
// console.log("Is object frozen? ", Object.isFrozen(regularUser))

// const regularUser = new Object({email:"xyz@gmail.com", phone:"12345"})
// console.log(`Datatype is ${typeof regularUser}`);
// console.log(regularUser)


// Object.assign()
// const obj1 = {1:"a", 2:"b"}
// const obj2 = {3:"a", 4:"b"}
// const obj3 = {5:"a", 6:"b"}

// const objParent = {...obj1, ...obj2, ...obj3}
// const objParent = Object.assign({}, obj1, obj2, obj3)
// console.log("objParent content: ", objParent)
// console.log("obj1 content: ", obj1);

// removing property from object
// const obj1 = {1:"a", 2:"b", email: "abc@gmail.com"}
// delete obj1["email"]
// console.log(obj1); // OP is { '1': 'a', '2': 'b' }

// Object methods, this keyword
// const regularUser = {
//     username: "ABC",
//     age: 22,
//     greetings:function(){console.log(`Hi, ${this.username}`)}
// }

// regularUser.greetings()

// Shallow copy and Deep copy of object
// let user = {username:"abc"}
// let admin = user
// console.log(user === admin);    

// console.log(user.username)
// admin.username = "xyz"
// console.log(user.username)
// console.log(user === admin);    


// let user = {
//     name: "John",
//     age: 30
//   };
  
// let clone = Object.assign({}, user);
// console.log(clone === user);

// let nestedObject = {
//     name:"John",
//     age: 30,
//     numbers:{
//         1:"a",
//         2:"b",
//         3:"c"
//     }
// }

// let clone2 = Object.assign({}, nestedObject)
// let clone2 = structuredClone(nestedObject)
// console.log(clone2);

// check if they are same or different objects
// console.log(clone2 === nestedObject);

// non nested object clone using structuredClone
// let normalObject ={
//     name:"abc",
//     age:20
// }

// let clone3 = structuredClone(normalObject)
// console.log(clone3 === normalObject);




