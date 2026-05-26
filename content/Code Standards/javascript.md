---
title: Javascript
fileOrder: 6
card_icon: /assets/img/code/javascript_icon.svg
sidebar: false
---

Our guidance is based on the [StandardJS](https://standardjs.com/rules.html "StandardJS Javascript Coding Standards") coding standards.
### Naming conventions

| Element    | Guidance                                       | Example                             |
| ---------- | ---------------------------------------------- | ----------------------------------- |
| Class      | Concept name in **PascalCase**                 | `BinarySearch`                      |
| Methods    | Purpose-reflecting name in **camelCase**       | `binarySearchRecursive`             |
| Constants  | Declared with `const`, named in **camelCase**  | `hourlyRate`                        |
| Parameters | Named in **camelCase**                         | `totalPay`                          |
| Variables  | Named in **camelCase**                         | `totalPay`                          |
| Strings    | Prefer single quotes for literals              | `'Hello world'`                     |
|            | Use double quotes to avoid escaping            | `"Bob's cake"`                      |
|            | Use backticks for interpolation with variables | `` `The totalPay is ${totalPay}` `` |

### Spaces

* Two spaces for indentation
* Single space between closing parentheses and new curly brace
* Single space between function identifier and parameter list
* Single space either side of operators
* Single space after commas in arrays and lists
* Two lines between functions (or methods)
* Use white space (single line) within function if it helps readability

### Brackets

* Open curly brace goes on the same line as preceding construct (method, if statement, loop, etc), with a space between closing parentheses and new curly brace
* Closing brace goes on a new line

### Comments

* Single line comment (`//`) above function with important information about the function
* All comments: Space after "`//`", capital letter at start and no full stop

### String formatting

Example: ```console.log(`The sum of 1 to ${n} is: ${result}`)```

## Exemplar code

The following code is from our Ada Computer Science content page on the [binary search algorithm (recursive)](https://adacomputerscience.org/concepts/search_binary?topic=searching#algorithm_recursive), which includes a detailed explanation of the algorithm.

```js
// Performs a binary search recursively
function binarySearchRecursive (items, searchItem, first, last) {
  // Base case for recursion: The recursion will stop when the
  // index of the first item is greater than the index of last
  if (first > last) {
    return -1 // Return -1 if the search item is not found
  }
  // Recursively call the function
  else {
    // Find the midpoint position (in the middle of the range)
    let midpoint = (first + last) / 2

    // Compare the item at the midpoint to the search item
    if (items[midpoint] === searchItem) {
      // If the item has been found, return the midpoint position
      return midpoint
    }
    // Check if the search item is greater than the item at the midpoint
    else if (searchItem > items[midpoint]) {
      // Focus on the items after the midpoint
      first = midpoint + 1
      return binarySearchRecursive(items, searchItem, first, last)
    }
    // Otherwise the item at the midpoint is greater than the search item
    else {
      // Focus on the items before the midpoint
      last = midpoint - 1
      return binarySearchRecursive(items, searchItem, first, last)
    }
  }
}
```
### Comment for top of GitHub file

```
/*
Raspberry Pi Foundation
Developed as part of Ada Computer Science 
Usage licensed under CC BY-NC-SA 4.0
*/
```

### Calling the functions with test data (no main)

Often the exemplar code in the GitHub repo contains extra code for calling the function(s) with test data. In JavaScript, it is not standard practice to include a `main()` function like it is in some other languages. Therefore, any calls to the function(s) for testing should be made just before the first function definition. For example:

```js
// Testing: Perform a binary search on the test data
let test_items = [10,11,13,15,18,25,29]
let first_index = 0
let last_index = test_items.length - 1
console.log(test_items)

// Search for a value and return the found index
let item_to_find = 18
console.log(`\nThe search item is ${item_to_find}`)
let index = binarySearchRecursive(test_items, item_to_find, first_index, last_index)

if (index == -1) {
  console.log(`\n${item_to_find} was not found in the list`)
} else {
  console.log(`\n${item_to_find} was found at index ${index}`)
}


// Performs a binary search recursively
function binarySearchRecursive (items, searchItem, first, last) {
  ...
}
```
