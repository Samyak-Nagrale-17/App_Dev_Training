const language = ["js", "Cpp", "c", "c#", "java", "python"]

// this foreach will not return anything
// const uppercaseLanguage = language.forEach((item)=>{
//     return item.toUpperCase()
// })

// console.log(uppercaseLanguage);

// for returning values, we can use filter
// const cLanguage = language.filter((item) => {
//     return item.toLowerCase().startsWith('c')
// })
// console.log(cLanguage);

// filter: returns a copy of the filtered values based on condition
// returns a shallow copy
const books = [
    { title: 'Book One', genre: 'Fiction', publish: 1981, edition: 2004 },
    { title: 'Book Two', genre: 'Non-Fiction', publish: 1992, edition: 2008 },
    { title: 'Book Three', genre: 'History', publish: 1999, edition: 2007 },
    { title: 'Book Four', genre: 'Non-Fiction', publish: 1989, edition: 2010 },
    { title: 'Book Five', genre: 'Science', publish: 2009, edition: 2014 },
    { title: 'Book Six', genre: 'Fiction', publish: 1987, edition: 2010 },
    { title: 'Book Seven', genre: 'History', publish: 1986, edition: 1996 },
    { title: 'Book Eight', genre: 'Science', publish: 2011, edition: 2016 },
    { title: 'Book Nine', genre: 'Non-Fiction', publish: 1981, edition: 1989 },
  ];

// console.log(books.filter((book) => book.genre === "History"));

// console.log( books.filter((book) => book.publish > 2000) );


// map: applies a fucntion to all values, creates a new array
const numberArray = [1,2,3,4,5,6,7,8,9,10]
let numberArrayMap = numberArray.map((num) => num*10).map((num) => num+1)
console.log(numberArrayMap);

//reduce: returns a single value
const shoppingCart = [
    {
        item:"Fruits",
        price:300
    },
    {
        item:"Cheese",
        price:450
    },
    {
        item:"Chips",
        price:120
    },
    {
        item:"Detergent",
        price:249
    }
]
    
// calculate total shopping cart
const totalPriceToPay = shoppingCart.reduce((price,currval) => price + currval.price,0)
console.log(`Shopping cart total is ${totalPriceToPay}`);
