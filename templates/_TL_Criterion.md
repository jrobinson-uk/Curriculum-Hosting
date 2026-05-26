---
type: criterion 
aliases: [] 
principle: "[[<% tp.file.folder(true) %>]]" 
--- 

# <% tp.file.title %> 

## Description (A brief description of this criterion) 

## Examples of Practice 
- [[link-to-good-example.md]] 
- [[link-to-non-example.md]] 
- 
- ## Review History for this Criterion 

  ```dataview 
  TABLE 
    product, 
    status, 
    review_cycle, 
    file.day AS "Date" 
    FROM #review 
    WHERE criterion = [[]] 
    SORT file.day DESC
    ```
    