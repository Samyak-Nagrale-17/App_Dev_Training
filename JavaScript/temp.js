function findOdd(A) {
    let map = new Map()
    
    for(let x of A){
      if(!map.get(x)){
        map.set(x, 1)
      }
      else{
        map.set(x, map.get(x) + 1)
      }
    }

    // iterate over map
    for(let [key,value] of map.entries()){
        if(value%2 != 0){
            return key
        }
    }
}

let ans = findOdd([1,2,2,3,3,3,4,3,3,3,2,2,1])
console.log(ans)
