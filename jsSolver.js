
//Helper function for solving 3 partition problem.
//It returns true if there exist three subsets with the given sum
const subsetSum = (S, n, a, b, c) => {
  //return true if the subset is found
    if (a === 0 && b === 0 && c === 0) return true
    //base case: no items left
    if (n < 0) return false
 
    //Case 1. The current item becomes part of the first subset
    let A = false
    if (a - S[n] >= 0) {
      A = subsetSum(S, n - 1, a - S[n], b, c)
    } 
        
 
    //Case 2. The current item becomes part of the second subset
    let B = false
    if (!A && (b - S[n] >= 0)) {
      B = subsetSum(S, n - 1, a, b - S[n], c)
    } 
        
 
    //Case 3. The current item becomes part of the third subset
    let C = false
    if ((!A && !B) && (c - S[n] >= 0)) {
      C = subsetSum(S, n - 1, a, b, c - S[n])
    }
        
 
    //return true if we get the solution
    return A || B || C
} 
 
    
 const sum = (arr) => {
   return arr.reduce((partialSum, a) => partialSum + a, 0);
 }  
 
//Function for solving the 3–partition problem. It returns true if the given
//set `S[0…n-1]` can be divided into three subsets with an equal sum.
const partition = (S) => {
  if (S.length < 3) return false
 
    //get the sum of all elements in the set
    let total = sum(S)
 
    //return true if the sum is divisible by 3 and the set `S` can
    //be divided into three subsets with an equal sum
    return (sum(S) % 3) === 0 && subsetSum(S, S.length - 1, Math.floor(total/3), Math.floor(total/3), Math.floor(total/3))
} 
 
    
 //Input: a set of integers
/* S = [7, 3, 2, 1, 5, 4, 8]

if (partition(S)) {
  console.log('Set can be partitioned')
} 
    
else {
  console.log('Set cannot be partitioned')
} */
  

export default partition;