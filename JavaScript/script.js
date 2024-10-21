// user data

// user1 block1
// {
//     const userName = 'Sam';
//     const userEmail = 'sam@abc.com';
//     const userAge = 22;
//     console.log(userName + ' ' + userEmail + ' ' + userAge);
// }


// user2 block2
// {
//     const userName = 'John';
//     const userEmail = 'john@abc.com';
//     const userAge = 14;
//     console.log('user2' + ' ' + userName + ' ' + userEmail + ' ' + userAge);

//     // redeclare variable values - cannot reassign for const variables
//     // userName = 'Charlie';
//     // userEmail = 'charlie@abc.com';
//     // userAge = 20;
//     // console.log(userName + ' ' + userEmail + ' ' + userAge);   
// }


// user3 block3
// {
//     let userName = 'John';
//     let userEmail = 'john@abc.com';
//     let userAge = 14;
//     // console.log(userName + ' ' + userEmail + ' ' + userAge);   
//     console.table([userName, userEmail, userAge])

//     // redeclare vairable using let
//     userName = 'Charlie';
//     userEmail = 'charlie@abc.com';
//     userAge = 20;
//     // console.log(userName + ' ' + userEmail + ' ' + userAge);   
//     console.table([userName, userEmail, userAge]);
// }


// JS datatypes 
// {
//     let dtNumber= 1001;
//     let dtString = 'JavaScript';
//     let dtNull = null;
//     let dtUndefined;
//     let dtSymbol = Symbol('JS');
//     let dtBigInt = (2**53)**53; 
//     console.log(dtBigInt); 
    
//     //print all datatypes
//     console.table([typeof(dtNumber), typeof(dtString), typeof(dtNull),
//         typeof(dtUndefined), typeof(dtSymbol), typeof(dtBigInt)
//     ])

//     // null is an object. rest of the datatypes are datatypes
//     // meanwhile null is an object.
// } 


// Datatype Conversion
// {
//     let accountNumber = 123456
//     let accountNumberString = toString(accountNumber)

//     // convert str back to number
//     let accountNumber2 = Number(accountNumberString)

//     console.table([typeof accountNumber, typeof accountNumberString, 
//         typeof accountNumber2])

//     let stringToNumberConversion = "12345abc"
//     let numberConverted = Number(stringToNumberConversion)
    
//     console.table([stringToNumberConversion, numberConverted])
//     console.table([typeof stringToNumberConversion, typeof numberConverted])
// }


// console.log("Datatype of NaN is " + typeof NaN)
// NaN is number

// Operations
// {
//     // let value = 3
//     // let negativeValue = -value
//     // let negativeValue2 = (-1) * value
//     // console.log((negativeValue, typeof(negativeValue)),
//     //  (negativeValue2, typeof(negativeValue2)))

//     console.log(1 + "2");
//     console.log("1" + 2);
//     console.log(1 + "2" + "2");
//     console.log(1 + 2 + "2");

//     // check typeof
//     console.log(typeof("1" + 2));
// }

// Comparisons of datatypes in JS
// {
//     console.log(2 > 1)
//     console.log(2 >= 1)
//     console.log(2 == 1)
//     console.log(2 < 1)
//     console.log(2 <= 1)

//     console.log(typeof null)
//     console.log(Number(null))
// }

// deep and shallow copy
// {
//     let userName = "sam"
//     userName = userName.toUpperCase()
//     // stack and heap memory in js
// }

// arrays
// {
//     let array1 = [5, 8, 12, 19, 22]
//     array1.sort((a,b) => a-b)
//     console.log(array1);
// }

// // milliseconds after 12 am
// {
//     let hoursSeconds = h * 3600
//     let minuteSeconds = m * 60
//     let totalSeconds = hoursSeconds + minuteSeconds + s
//     let totalMilliseconds = totalSeconds * 1000
//     // after second
// }


// array
// {
//     let data = [1,2,'asdf','asdf','qweqwe',true, 123,34,12]
//     console.log(data);
    
//     let variants = new Array('16', '16 Plus', '16 Pro', '16 Pro Max')
//     console.log(variants);   
// }


// sort
// {
//     let array1 = [12,23,34,5,567,26,234,2,45,25,25,2,5]
//     array1.sort((a,b) => b-a)
//     console.log(array1);
// }

// count vowels in str
// {
//     function getVowelCount(str){
//         let vowels = ['a','e','i','o','u']
//         let totalVowelCount = 0

//         for(let i = 0; i < str.length; i++){
//             if(vowels.includes(str[i])){
//                 totalVowelCount++
//             }
//         }
//         return totalVowelCount
//     }

//     let ans = getVowelCount("askldfjsdlkfjasdfasvba")
//     console.log(`\n Total count of vowels is ${ans}`);
// }


// dynamic typing and type coercion
// {
//     let myVar = 100
//     console.log(typeof myVar)

//     myVar = 'JavaScript'
//     console.log(typeof myVar)

//     // type coercion
//     let userName = 'ABC'
//     let userAge = 22
//     let isMarried = true

//     // print user data
//     console.log(`Username is ${userName} and is ${userAge} years old. isMarried?: ${isMarried}`)
// }


// JS ternary operators
// {
//     let examMarks = 32
//     let examResult = (examMarks > 40) ? 'Pass' : 'Fail'
//     console.log(`Exam result is ${examResult}`)
// }

// Conditional statements
// {
//     let examMarks = 92

//     if(examMarks < 90){
//         console.log(`Not in first class`)
//     }
//     else{
//         console.log(`Passed exam in first class`)
//     }


//     let examGrade = 'F'
//     let examMarks = 82
//     switch (examMarks) {
//         case (100 >= examMarks >=90):
//             examGrade = 'A'
//             break;
        
//         case (90> examMarks >= 80):
//             examGrade = 'B'
//             break

//         case (80 > examMarks >= 70):
//             examGrade = 'C'
//             break
        
//         case (70 > examMarks >= 60):
//             examGrade = 'D'

//         default:
//             examGrade = 'F'
//             break;
//     }

//     console.log(`Grade scored in exam is ${examGrade}`)
// }

// Loops in JS
// {
//     // for loop
//     let examGrades = ['A+', 'A-','B+','B-', 'C+', 'C-','D+', 'D-','F']

//     for(let i = 0; i < examGrades.length; i = i + 2){
//         console.log(examGrades[i])
//     }

//     // while loop
//     let maxLimit = 10
//     while(maxLimit >= 0){
//         console.log(maxLimit)
//         maxLimit--
//     }

//     // do-while loop
//     let countOfIterations = -10
//     do{
//         countOfIterations++
//         console.log(countOfIterations)
//     }
//     while(countOfIterations <= 0)
    
//     // for .. in loop
//     const userData = {username:'ABC', email:'abc@gmail.com', isActive:true, onProbation:false}
//     let userDataString = ""
//     for(let data in userData){
//         userDataString += `${userData}.${data} = ${userData[data]}`
//     }
//     console.log(userDataString);
    
    
//     // for .. in loop eg2
//     let numsArray = [1,2,3,4,5,6,7,8,9,10]
//     for(let x in numsArray){
//         let y = (x%2 == 0) ? 'even' : 'odd'
//         console.log(y)
//     }

//     // for .. of loop
//     let str1 = "For .. of loop is used to loop through values of an iterable object"
//     for(const i of str1){
//         // console.log(i)
//         process.stdout.write(i) //does'nt print on a new line.
//     }
// }


// Functions in JS
//{
    // function addNumbers(a,b){
    //     return a + b
    // }
    // console.log(addNumbers(10,'India'))
    // console.log(addNumbers) 

    // function isUserLoggedIn(username = "User"){
    //     if(!username){
    //         console.log(`Please enter your username`)
    //         return
    //     }

    //     return `${username} logged in`
    // }

    // console.log(isUserLoggedIn("Sam"))


    // rest parameter: used to group multiple arguments in an array
    // function calculateSum(...numbers){
    //     let sum = 0
    //     for(let i of numbers){
    //         sum +=i
    //     }
    //     return `Sum is ${sum}`
    // }
    // console.log(calculateSum(1,1,1,1,1,1,1,1,1,1,1))

    // // spread operator: opposite of rest parameter
    // //used to 'spread' elements of an iterable into separate elements
    // let numberArray = [1,2,3,4]
    // let characterArray = [...numberArray, 'a','b','c']
    // console.log(characterArray);

//}

// Fucntion declaration and Function expression
// {
//     // function declaration
//     const printUserStatus = function checkUserStatus(userEmail){
//         if(!userEmail){
//             return 'Inactive'
//         }
//         return 'Active'
//     }
//     console.log(printUserStatus('abc@abc.com'))

//     // fucntion expression
//     let printData = function(data){
//         console.log(data)
//         return
//     }

//     printData(1)
//     printData('ABC')
//     printData('rain')

// }

// Arrow functions and this context
// {
    // this context
    // const user = {
    //     username: 'samyak',
    //     email:'sam@gmail.com',
    //     isActive: true,

    //     isLoggedIn: function(){
    //         console.log(`${this.username} is logged in`);
    //         console.log('Context inside context:' , this)
    //     }
    // }
    // // console.log(user.isLoggedIn()); 
    // user.isLoggedIn()
    // // user.username = 'abc'
    // // user.isLoggedIn()
    // console.log('Context in block: ',this);

    // function dadu(){
    //     console.log('inside func')
    //     console.log(this)
    // }

    // dadu()
// }


// arrow functions
// {
    // const userData = (username = 'Samyak', email = 'sam@gmail.com') => {
    //     console.log('\ninside userData arrow function ...')
    //     console.log(`Username: ${username} Email: ${email} \n`);
    //     console.log(this);
    // }
    
    // // userData('ABC','abc@abc.com')
    // // userData('DEF','def@abc.com')
    // // userData('GHI','ghi@abc.com')


    // function f1(){
    //     console.log(this);        
    // }

    // f1()
    // userData()

    // const updateData = (key, data) => {
    //     for(let x in data){
    //         if(key == x){
    //             data.push(x*2)
    //             break
    //         }
    //     }
    //     return `key not found`
    // }

    // let arrayData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    // console.log(updateData(10,arrayData))
    // console.log(arrayData) 

// }


// higher order functions
{
    
}