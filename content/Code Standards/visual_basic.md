---
title: Visual Basic
fileOrder: 7
card_icon: /assets/img/code/visualbasic_icon.png
sidebar: false
---

Our guidance is based on the [Visual Basic](https://learn.microsoft.com/en-us/dotnet/visual-basic/programming-guide/program-structure/coding-conventions "Visual Basic Coding Conventions") coding standards. 
##  Naming conventions

| Element    | Guidance                            | Example         |
| ---------- | ----------------------------------- | --------------- |
| Class      | PascalCase (singular noun)          | `GamePlayer`    |
| Methods    | PascalCase                          | `CalculatePay`  |
| Functions  | PascalCase                          | `CalculatePay`  |
| Parameters | PascalCase                          | `HoursWorked`   |
| Variables  | CamelCase                           | `totalPay`      |
| Constants  | Declared `Const`, named in ALL CAPS | `HOURLYRATE`    |
| Strings    | Always in double quotes             | `"Hello world"` |
| Characters | Always in single quotes             | `'H'`           |

##  Spaces

* No space between the function identifier and the parameter list
* Single space either side of operators (unless used as a parameter)
* Single space after commas in lists
* Two lines between functions (or methods)
* Use white space (single line) within a function if it helps readability

##  Comments

* Comments start with a single quote ('). 
* Insert one space between the comment delimiter (') and the comment text. 
* Start the comment text with an uppercase letter, and end comment text with a full stop. 
* Multiline comments: Start each line with a single quote
* Use a single line comment above each function with important information about the function

##  Declaring variables

Always use the Dim keyword as this is best practice.

##  Declaring an array

Use the syntax `Dim LetterList As String() = {"a", "b", "c"}`

##  String formatting

Example: `Console.WriteLine($"The sum of 1 to {n} is {result}")`

## Exemplar code

The following code is from our Ada Computer Science content page on the [binary search algorithm (recursive)](https://adacomputerscience.org/concepts/search_binary?topic=searching#algorithm_recursive), which includes a detailed explanation of the algorithm.

The exemplar code in the [GitHub version](https://github.com/raspberrypilearning/ada-code-samples/tree/main/searching-algorithms/binary-search) also includes the `Main()` subroutine with test data and a call to `BinarySearchRecursive()`.

```
Function BinarySearchRecursive(ByVal items As Integer(), ByVal searchItem As Integer, ByVal first As Integer, ByVal last As Integer) As Integer
    If first > last Then
        Return -1
    Else
        Dim midpoint As Integer = (first + last) \ 2

        If items(midpoint) = searchItem Then
            Return midpoint
        ElseIf searchItem > items(midpoint) Then
            first = midpoint + 1
            Return BinarySearchRecursive(items, searchItem, first, last)
        Else
            last = midpoint - 1
            Return BinarySearchRecursive(items, searchItem, first, last)
        End If
    End If
End Function
```

### Main method

* VisualBasic applications always use the `Main` method as their entry point. 
* `Main` can be used for the whole program if the application is small and there is no need for additional subroutines. 

```
Sub Main()
   Dim n as Integer = 6
   Dim result as Integer = SumToN(n)
   Console.WriteLine($"The sum of 1 to {n} is {result}")
End Dub
```

## Comment for top of GitHub file

The very first lines of code should be the default comment below which explains how to run the Visual Basic program. This comment should appear before the first programming statement or `Imports` statement.

```
' Raspberry Pi Foundation
' Developed as part of Ada Computer Science 
' Usage licensed under CC BY-NC-SA 4.0
' Note: This file is designed to be copied out and compiled on your machine.
' To run this file you need to:
' 1. Copy the contents
' 2. Paste them into the Visual Basic IDE of your choice (Visual Studio, for example)
' 3. Compile the program
' 4. Run the program
```
