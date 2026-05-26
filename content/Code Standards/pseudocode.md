---
title: Pseudocode
fileOrder: 2
card_icon: /assets/img/code/pseudocode_icon.png
sidebar: false
---

### Naming conventions

| Concept / Construct | Pseudocode                              | Example               |
| ------------------- | --------------------------------------- | --------------------- |
| Constant            | Capitalised snake case                  | `BIRTH_YEAR`          |
| Variable            | Lowercase snake case                    | `user_name`           |
| Global Variable     | Denoted by capitalised `GLOBAL` keyword | `GLOBAL score`        |
| Assignment Operator | Single equals sign `=`                  | `user_name = "Biffo"` |

A variable is declared the first time a value is assigned. It assumes the data type of the value it is given. Variables declared inside a function or procedure are local to that subroutine.

### Data types and casting

| Concept / Construct | Pseudocode                         | Example                                                  |
| ------------------- | ---------------------------------- | -------------------------------------------------------- |
| String              | Double quotes                      | `user_name = "Bobi"`                                     |
| Integer             | Whole number, positive or negative | `score = 230`                                            |
| Float               | Real number, positive or negative  | `temperature = -23.4`                                    |
| Datetime            | Represents dates and times         | `midnight = STR_TO_TIME("00:00", "HH:mm")`               |
| Boolean Values      | `True`, `False`                    | `found = False`                                          |
| Null Values         | `Null`                             | `this_node.next = Null`                                  |
| Cast to String      | `STR()`                            | `STR(age)`                                               |
| Cast to Integer     | `INT()`                            | `INT("5")`                                               |
| Cast to Float       | `FLOAT()`                          | `FLOAT("5.2")`                                           |
| Cast to Date        | `STR_TO_DATE(string, format)`      | `STR_TO_DATE("1/1/2022", "dd MMM yyyy")` → `01 Jan 2022` |
| Cast to Time        | `STR_TO_TIME(string, format)`      | `STR_TO_TIME("11:25:40", "HH:mm")` → `11:25`             |

## Operators

### Arithmetic operators

Concept / construct | Pseudocode | Example | Notes
-- | -- | -- | --
Plus, minus, multiply, divide | `+, -, *, /` | `3 * 4` |  
Exponentiation | `**` | `2 ** 3` | Result is 8
Modulo (remainder) | `MOD` | `7 MOD 2` | Result is 1
Integer / floor division | `DIV` | `7 DIV 2` | Result is 3

### Binary shift operators

Concept / construct | Pseudocode | Example | Notes
-- | -- | -- | --
Binary left shift | `<<` | `001 << 1` | Result is 010
Binary right shift | `>>` | `110 >> 1` | Result is 011

### Comparison operators

Concept / construct | Pseudocode | Example | Notes
-- | -- | -- | --
Equal to | `==` | `score == 10` | If score is 5,returns False
Not equal to | `!=` | `score != 6` | If score is 5,returns True
Greater than | `>` | `score > 7` | If score is 5,returns False
Greater than or equal to | `>=` | `score >= 5` | If score is 5,returns True
Less than | `<` | `score < 9` | If score is 5,returns True
Less than or equal to | `<=` | `score <= 4` | If score is 5,returns False

### Logical operators

Concept / construct | Pseudocode | Example | Notes
-- | -- | -- | --
and | `AND` | `score == 5 AND attempts < 5` | If `score` is 5 and `attempts` is 3,returns `True`
or | `OR` | `score == 5 OR attempts < 5` | If `score` is 6 and `attempts` is 3,returns `True`
not | `NOT` | `IF NOT already_guessed` | If `already_guessed` is `False`,returns `True`

## Comments

Concept / construct | Pseudocode | Example
-- | -- | --
Single line comment | `//` | `// This is a comment`
Multi line comment | `/* ... */` | `/* I need a long comment that goes over several lines */`

## Input and output

Concept / construct | Pseudocode | Example | Notes
-- | -- | -- | --
User input | `INPUT(prompt)` | `user_age = INPUT("Enter your age")` | Inputs are assumed to be received as strings
Output | `PRINT(data to print)` | `PRINT(user_age)PRINT("Hello")` |  
Concatenation within print string | `+` | `PRINT("Hello " + name)PRINT ("The total is: " + STR(total))` |  
