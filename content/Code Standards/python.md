---
title: Python
fileOrder: 4
card_icon: /assets/img/code/python_icon.svg
sidebar: false
---

Our guidance is based on the [PEP8](https://peps.python.org/pep-0008/ "PEP8 Python Coding Standards") coding standards.
## Naming conventions

| Element              | Guidance                   | Example            |
| -------------------- | -------------------------- | ------------------ |
| Variables/Parameters | Lowercase with underscores | `user_name`        |
| Constants            | Uppercase with underscores | `LONDON_WEIGHTING` |
| Functions/Methods    | Lowercase with underscores | `calculate_pay`    |
| Strings              | Use double quotes          | `"Hello world"`    |
| Characters           | n/a                        |                    |
| Classes              | PascalCase                 | `UtilityVehicle`   |

* Code blocks - use 4 spaces per indentation level
* No space between function identifier and parameter list
* No space on function calls between function identifier and arguments
* Leave space on either side of operators
* Leave space after commas in lists
* Use white space (single line) if it helps readability
* Two lines between functions (or methods)

## Comments

* Single line docstring (triple quoted) with important information
* In-line comments: 2 spaces before ## and 1 after
* All comments: Capital letter at start and no full stop

## String formatting

Use f-strings, e.g.

`print(f"The sum of 1 to {n} is {result}")`

## Import statements

* Position import statements at the top of the module (below licence info)
* If a single function is needed, use a specific import, e.g. from math import randint. Otherwise import whole module, e.g. import math (and then prefix all functions with the name of the module, e.g. math.randint.


## Examples from Ada Computer Science

The repository for the code samples on Ada Computer Science are located here:

https://github.com/raspberrypilearning/ada-code-samples

### GitHub structure

* Each **topic** has a folder, e.g. recursion.
* Within each topic folder, there is a folder for each **concept** page, e.g. recursion-basics
* Within each concept folder there is a folder for each **programming language**, e.g. python
* Within each code folder there is one or more code samples with meaningful names, e.g. `sum_to_n_iterative.py`

For example, the path for the file `sum_to_n_iterative.py` is: 

`recursion/recursion-basics/python/sum_to_n_iteractive.py`

### Exemplar code

The following code is from our Ada Computer Science content page on the [binary search algorithm (recursive)](https://adacomputerscience.org/concepts/search_binary?topic=searching#algorithm_recursive), which includes a detailed explanation of the algorithm.

The exemplar code in the [GitHub version](https://github.com/raspberrypilearning/ada-code-samples/tree/main/searching-algorithms/binary-search) also includes a `main()` procedure with test data and a call to `binary_search_recursive()`.

```python
def binary_search_recursive(items, search_item, first, last):
    """A recursive binary search algorithm"""

    ## Base case for recursion: The recursion will stop when the
    ## index of the first item is greater than the index of last
    if first > last:
        return -1 ## Return -1 if the search item is not found

    ## Recursively call the function
    else:
        ## Find the midpoint position (in the middle of the range)
        midpoint = (first + last) // 2
        
        ## Compare the item at the midpoint to the search item
        if items[midpoint] == search_item:
            ## If the item has been found, return the midpoint position
            return midpoint
     
        ## Check if the item at the midpoint is less than the search item 
        elif items[midpoint] < search_item:
            ## Focus on the items after the midpoint
            first = midpoint + 1
            return binary_search_recursive(items, search_item, first, last)

        ## Otherwise the item at the midpoint is greater than the search item
        else:
            ## Focus on the items before the midpoint
            last = midpoint - 1 
            return binary_search_recursive(items, search_item, first, last)
```

### Main function

* On the platform do **not** use `if __name__ == "__main__":` (unless needed to meet a learning objective).
* On GitHub, always use `if __name__ == "__main__":`. The statements that follow should call a function named `main` (or another sensibly named function) or occasionally provide initial code to be executed when a module is run.

* When `if __name__ == "__main__":` is used, this comment should always be added immediately before the statement:

```python
## This code will run if this file is executed directly
## i.e. not called by another program
if __name__ == "__main__":
    #### CODE TO RUN GOES HERE ###
```

### Comment for top of GitHub file

```python
## Raspberry Pi Foundation
## Developed as part of Ada Computer Science
## 
## Usage licensed under CC BY-NC-SA 4.0