---
title: General Principles
fileOrder: 1
card_icon: /assets/img/code/general_icon.png
sidebar: false
---

These are general code standards guidelines which apply across all of our products and when using all coding languages.

## 1. Avoid cognitive overload

> [!TIP]
> Avoid combining multiple actions into a single statement.  
> Break down steps to make them easier to follow.

| **Type**           | Don’t do this                             | Do this                                                              |
| ------------------ | ----------------------------------------- | -------------------------------------------------------------------- |
| Combined statement | `amount = int(input("Enter the amount"))` | `response = input("Enter the amount")`<br />`amount = int(response)` |
| Combined statement | `print(get_total(n1, n2))`                | `total = get_total(n1, n2)`<br />`print(total)`                      |

---

## 2. Naming Conventions

### Functions and Methods

Begin names with a **verb**, except when implementing a standard algorithm.  

> [!EXAMPLES:] 
>- `calculate_pay`  
>- `validate_input`  
>- `linear_search` (standard algorithm)  

### Classes, Structures, Modules, and Properties

Begin these names with a **noun**.  

> [!EXAMPLE:]  
> - `EmployeeName` (case depends on language used)  


---
## 3. Explaining Code in Content

### Subroutines

- Use the term **subroutine**, **function**, or **procedure** as appropriate.  
- Focus on the CS distinction between procedures and functions., and use **subroutine** if it is clearer.  
- The subroutine call does not need to be shown but it must be clear in the narrative that nothing will happen unless it is called. 

### Parameters and Arguments

- A **parameter** represents a value that the subroutine expects when called. The subroutine's declaration defines its parameters.
- An **argument** is the value passed to the subroutine when it is called.  

### Code Segments

- When referring to part of a subroutine, use **code segment** or **code example**.  

> [!WARNING]
>Avoid calling these a “subroutine” or “program.”  

---