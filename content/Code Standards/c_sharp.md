---
title: C#
fileOrder: 9
card_icon: /assets/img/code/c_sharp_icon.svg
sidebar: false
---
## Naming conventions

| Element    | Guidance                                  | Example                 |
| ---------- | ----------------------------------------- | ----------------------- |
| Namespace  | Always `AdaCodeSamples` (PascalCase)      | `AdaCodeSamples`        |
| Class      | Concept name in **PascalCase**            | `BinarySearch`          |
| Methods    | Purpose-reflecting name in **PascalCase** | `BinarySearchRecursive` |
| Constants  | Declared `const`, named in **PascalCase** | `HourlyRate`            |
| Parameters | Named in **camelCase**                    | `totalPay`              |
| Variables  | Named in **camelCase**                    | `totalPay`              |
| Strings    | Always in double quotes                   | `"Hello world"`         |
| Characters | Always in single quotes                   | `'H'`                   |

## Spaces

* Single space between closing parentheses and new curly brace
* No space between function identifier and parameter list
* Single space either side of operators
* Single space after commas in arrays and lists
* Two lines between functions (or methods)
* Use white space (single line) within function if it helps readability

## Brackets

* Open curly brace goes on the same line as preceding construct (method, if statement, loop, etc), with a space between closing parentheses and new curly brace
* Closing brace goes on a new line

## Comments

* Single line comment (//) above function with important information about the function
* All comments: Space after "//", capital letter at start and no full stop

## String formatting

Example: `Console.WriteLine($"The sum of 1 to {n} is: {result}");`

## Exemplar code

The following code is from our Ada Computer Science content page on the [binary search algorithm (recursive)](https://adacomputerscience.org/concepts/search_binary?topic=searching##algorithm_recursive), which includes a detailed explanation of the algorithm.

The exemplar code in the [GitHub version](https://github.com/raspberrypilearning/ada-code-samples/tree/main/searching-algorithms/binary-search) also includes the `Main()` method with test data and a call to `BinarySearchRecursive()`.

```
// Performs a binary search recursively
public static int BinarySearchRecursive(int[] items, int searchItem, int first, int last) {
    // Base case for recursion: The recursion will stop when the
    // index of the first item is greater than the index of last
    if (first > last) {
        return -1; // Return -1 if the search item is not found
    }
    // Recursively call the function
    else {
        // Find the midpoint position (in the middle of the range)
        int midpoint = (first + last) / 2;

        // Compare the item at the midpoint to the search item
        if (items[midpoint] == searchItem) {
            // If the item has been found, return the midpoint position
            return midpoint;
        }
        // Check if the search item is greater than the item at the midpoint
        else if (searchItem > items[midpoint]) {
            // Focus on the items after the midpoint
            first = midpoint + 1;
            return BinarySearchRecursive(items, searchItem, first, last);
        }
        // Otherwise the item at the midpoint is greater than the search item
        else {
            // Focus on the items before the midpoint
            last = midpoint - 1;
            return BinarySearchRecursive(items, searchItem, first, last);

        }
    }
}
```

#### Main method

* All C## examples use the `Main` method as their entry point. `Main` can be used for the whole program if the intended use is a basic programming construct. 

* `Main` has the signature: `public static void Main()` as shown in the example below.

```
// The Main method is the entry point for all C## programs
public static void Main()
{
    int n = 6;
    int result = SumToN(n);
    Console.WriteLine($"The sum of 1 to {n} is: {result}");
}
```

#### Comment above Main method

`// The Main method is the entry point for all C## programs`

* GitHub - this comment should **always** appear above the `Main` method.
* Platform - this comment should **not** be included in the version on the platform. 

#### Comment for top of GitHub file

The very first lines of code should be the default comment below which explains how to run the C## program. This comment should appear before the first programming statement `using System;`.

```
/*
Raspberry Pi Foundation
Developed as part of Ada Computer Science 
Usage licensed under CC BY-NC-SA 4.0

Note: This file is designed to be copied out and compiled on your machine.
In order for it to compile properly you need to ensure that the project name is the same as the "namespace" in this file.

To run this file you need to:
1. Copy the contents
2. Paste them into the C## IDE of your choice (Visual Studio, for example)
3. Change the namespace to match your project (if necessary)
4. Compile the program
5. Run the program
*/
```
