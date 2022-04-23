#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int subsetSum(uint32_t *S, int n, int a, int b, int c)
{
  // return true if the subset is found
  if ((a == 0) && (b == 0) && (c == 0))
  {
    return 1;
  }
  // base case: no items left
  if (n < 0)
  {
    return 0;
  }

  // Case 1. The current item becomes part of the first subset
  int A = 0;
  if ((a - S[n]) >= 0)
  {
    A = subsetSum(S, n - 1, a - S[n], b, c);
  }
  // Case 2. The current item becomes part of the second subset
  int B = 0;
  if (!A && ((b - S[n]) >= 0))
  {
    B = subsetSum(S, n - 1, a, b - S[n], c);
  }

  // Case 3. The current item becomes part of the third subset
  int C = 0;
  if ((!A && !B) && ((c - S[n]) >= 0))
  {
    C = subsetSum(S, n - 1, a, b, c - S[n]);
  }

  // return true if we get the solution
  return A || B || C;
}

int sum(uint32_t *arr, int length)
{
  int acc = 0;
  for (int i = 0; i < length; i++)
  {
    acc += arr[i];
  }
  return acc;
}

int Partition(uint32_t *S, int length)
{
  if (length < 3)
  {
    return 0;
  }

  // get the sum of all elements in the set
  int total = sum(S, length);

  // return true if the sum is divisible by 3 and the set `S` can
  // be divided into three subsets with an equal sum
  return (sum(S, length) % 3) == 0 && subsetSum(S, length - 1, floor(total / 3), floor(total / 3), floor(total / 3));
}

int main()
{
  uint32_t *S = malloc(sizeof(uint32_t) * 7);
  uint32_t arr[7] = {7, 3, 2, 1, 5, 4, 8};
  for (int i = 0; i < 7; i++)
  {
    S[i] = arr[i];
  }
  if (Partition(S, 7))
  {
    printf("%s", "Set can be partitioned");
  }
  else
  {
    printf("%s", "Set cannot be partitioned");
  }
  return 0;
}