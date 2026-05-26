---
title: Java
fileOrder: 5
card_icon: /assets/img/code/java_icon.svg
sidebar: false
---

## Naming conventions

| Element    | Guidance                                                    | Example                 |
| ---------- | ----------------------------------------------------------- | ----------------------- |
| Class      | Concept name in **PascalCase**                              | `BinarySearch`          |
| Methods    | Purpose-reflecting name in **camelCase**                    | `binarySearchRecursive` |
| Constants  | Declared `static final`, named in ALL_CAPS_WITH_UNDERSCORES | `HOURLY_RATE`           |
| Parameters | Named in **camelCase**                                      | `totalPay`              |
| Variables  | Named in **camelCase**                                      | `totalPay`              |
| Strings    | Always in double quotes                                     | `"Hello world"`         |
| Characters | Always in single quotes                                     | `'H'`                   |

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

Example: `System.out.println("The sum of 1 to " + n + " is: " + result);`

## Exemplar code

The following code is from our Ada Computer Science content page on the [binary search algorithm (recursive)](https://adacomputerscience.org/concepts/search_binary?topic=searching#algorithm_recursive), which includes a detailed explanation of the algorithm.

The exemplar code in the [GitHub version](https://github.com/raspberrypilearning/ada-code-samples/tree/main/searching-algorithms/binary-search) also includes the `main()` method with test data and a call to `binarySearchRecursive()`.

```
// Performs a binary search recursively
public static int binarySearchRecursive(int[] items, int searchItem, int first, int last) {
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
            return binarySearchRecursive(items, searchItem, first, last);
        }
        // Otherwise the item at the midpoint is greater than the search item
        else {
            // Focus on the items before the midpoint
            last = midpoint - 1;
            return binarySearchRecursive(items, searchItem, first, last);

        }
    }
}
```

### Main method

* All Java examples use the `main` method as their entry point. `main` can be used for the whole program if the intended use is a basic programming construct. 

* `main` has the signature: `public static void main(String[] args)` as shown in the example below.

```
// The main method is the entry point for all Java programs
public static void main(String[] args)
{
    int n = 6;
    int result = sumToN(n);
    System.out.println("The sum of 1 to " + n + " is: " + result);
}
```

### Comment above main method

`// The main method is the entry point for all Java programs`

* GitHub - this comment should **always** appear above the `main` method.
* Platform - this comment should **not** be included in the version on the platform. 

### Comment for top of GitHub file

The very first lines of code should be the default comment below which explains how to run the Java program. This comment should appear before the first programming statement.

```
/*
Raspberry Pi Foundation
Developed as part of Ada Computer Science
Usage licensed under CC BY-NC-SA 4.0

Note: This file is designed to be copied out and compiled on your machine.
In order for the program to compile properly in some IDEs, you need to ensure that the
class filename is the same as the class name with the main method in it.

To run this file you need to:
1. Copy the contents
2. Create a Java project in the IDE of your choice (Eclipse, for example)
3. Create a new Java Class that uses the same name as the class containing the main method in this program
4. Paste the contents into the new Java Class
5. Save and run the program
*/
```
