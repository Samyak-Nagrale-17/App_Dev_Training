// user data

// user1 block1
{
    const userName = 'Sam';
    const userEmail = 'sam@abc.com';
    const userAge = 22;
    console.log(userName + ' ' + userEmail + ' ' + userAge);
}

//user2 block2
{
    const userName = 'John';
    const userEmail = 'john@abc.com';
    const userAge = 14;
    console.log('user2' + ' ' + userName + ' ' + userEmail + ' ' + userAge);

    // redeclare variable values - cannot reassign for const variables
    // userName = 'Charlie';
    // userEmail = 'charlie@abc.com';
    // userAge = 20;
    // console.log(userName + ' ' + userEmail + ' ' + userAge);   
}

// user3 block3
{
    let userName = 'John';
    let userEmail = 'john@abc.com';
    let userAge = 14;
    // console.log(userName + ' ' + userEmail + ' ' + userAge);   
    console.table([userName, userEmail, userAge])

    // redeclare vairable using let
    userName = 'Charlie';
    userEmail = 'charlie@abc.com';
    userAge = 20;
    // console.log(userName + ' ' + userEmail + ' ' + userAge);   
    console.table([userName, userEmail, userAge]);
}


// JS datatypes 
{
    let dtNumber= 1001;
    let dtString = 'JavaScript';
    let dtNull = null;
    let dtUndefined;
    let dtSymbol = Symbol('JS');
    let dtBigInt = (2**53)**53; 
    console.log(dtBigInt); 
    
    //print all datatypes
    console.table([typeof(dtNumber), typeof(dtString), typeof(dtNull),
        typeof(dtUndefined), typeof(dtSymbol), typeof(dtBigInt)
    ])

    // null is an object. rest of the datatypes are datatypes
    // meanwhile null is an object.
} 

// Datatype Conversion
{
    let accountNumber = 123456
    let accountNumberString = toString(accountNumber)

    // convert str back to number
    let accountNumber2 = Number(accountNumberString)

    console.table([typeof accountNumber, typeof accountNumberString, 
        typeof accountNumber2])

    let stringToNumberConversion = "12345abc"
    let numberConverted = Number(stringToNumberConversion)
    
    console.table([stringToNumberConversion, numberConverted])
    console.table([typeof stringToNumberConversion, typeof numberConverted])
}

console.log("Datatype of NaN is " + typeof NaN)
// NaN is number

// Operations
{
    // let value = 3
    // let negativeValue = -value
    // let negativeValue2 = (-1) * value
    // console.log((negativeValue, typeof(negativeValue)),
    //  (negativeValue2, typeof(negativeValue2)))

    console.log(1 + "2");
    console.log("1" + 2);
    console.log(1 + "2" + "2");
    console.log(1 + 2 + "2");

    // check typeof
    console.log(typeof("1" + 2));
}

// Comparisons of datatypes in JS
{
    console.log(2 > 1)
    console.log(2 >= 1)
    console.log(2 == 1)
    console.log(2 < 1)
    console.log(2 <= 1)

    console.log(typeof null)
    console.log(Number(null))
}

// deep and shallow copy
{
    let userName = "sam"
    userName = userName.toUpperCase()
    // stack and heap memory in js
}

// arrays
{
    let array1 = [5, 8, 12, 19, 22]
    array1.sort((a,b) => a-b)
    console.log(array1);
}

// // milliseconds after 12 am
// {
//     let hoursSeconds = h * 3600
//     let minuteSeconds = m * 60
//     let totalSeconds = hoursSeconds + minuteSeconds + s
//     let totalMilliseconds = totalSeconds * 1000
//     // after second
// }


// array
{
    let data = [1,2,'asdf','asdf','qweqwe',true, 123,34,12]
    console.log(data);
    
    let variants = new Array('16', '16 Plus', '16 Pro', '16 Pro Max')
    console.log(variants);   
}


//sort
{
    let array1 = [12,23,34,5,567,26,234,2,45,25,25,2,5]
    array1.sort((a,b) => b-a)
    console.log(array1);
}

// count vowels in str
{
    function getVowelCount(str){
        let vowels = ['a','e','i','o','u']
        let totalVowelCount = 0

        for(let i = 0; i < str.length; i++){
            if(vowels.includes(str[i])){
                totalVowelCount++
            }
        }
        return totalVowelCount
    }

    let ans = getVowelCount("askldfjsdlkfjasdfasvba")
    console.log(`\n Total count of vowels is ${ans}`);
}

// slice, splice in js
{
    
}