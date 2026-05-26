---
title: SQL
fileOrder: 8
card_icon: /assets/img/code/sql_icon.svg
sidebar: false
---

  On Ada Computer Science, we have an embedded SQL editor that runs in the browser based on our sample databases. You can see examples of this in our [SQL topic and the linked scenarios](https://adacomputerscience.org/topics/sql), within the implementation stage of our [database projects](https://adacomputerscience.org/projects), and in some of our [SQL questions](https://adacomputerscience.org/questions?topics=sql).

The Ada SQL editor allows users to write and execute SQL statements on a local instance of a database which is run in the browser. Each SQL editor block is linked to a specific database. Each database uses SQLite as the database engine; as such, the SQL keywords and data types used in the majority of the examples is written using the SQLite syntax.

More information on the Ada SQL editor can be found on the [teacher](https://adacomputerscience.org/support/teacher/code#sql-editor) and [student support page](https://adacomputerscience.org/support/student/code#sql-editor), and the details on syntax of SQLite can be found on the [SQLite site](https://www.sqlite.org/lang.html).

## Naming conventions

As in most programming languages, there are rules about the identifiers that can be used for table and field names. Here are the important rules:

- Names must begin with a letter
- Names can only consist of letters, numbers, and underscores
- Names cannot be SQL keywords (watch out for ORDER)
- Names should not include spaces

As well as rules that must be followed so as to not cause errors, there are also guidelines around naming conventions that developers tend to use, though these are not strictly enforced by the language. However, you will find that different developers and applications may adopt different naming conventions. The most important thing is to be **consistent** within a database or application.

The most common naming conventions are camelCase, PascalCase (upper camelCase) and snake_case. In the sports club database, pascal case is used for the table names, e.g. `Customer`, and the field names, e.g. `CustomerId`. Whilst in the Repair & Reform database, snake case is used for the table names, e.g. `customer`, and the field names, e.g. `customer_id`.

Throughout the site, we have used different naming conventions in the example databases so that you become familiar with each type. The key point though is that we consistently use only one naming convention within each particular databases. You should check if there is a convention that is more commonly used by your specific exam board.
## Spaces

- Each statement is written on a new line e.g. line 1: `SELECT...`, line 2: `FROM...` for clarity
- Single space between the keyword and the table name
- CREATE TABLE: each field and constraint should be indented by two spaces. The final closing bracket and semicolon should be on a new line with no indentation

# Comments

- Single line comments: Must start with two hyphens -- (recommend ending with -- for style purposes)
- Multi-line comments: Must start with /* and end with */

# Exemplar code

The following code is from our Ada Computer Science database scenario on Vanessa's art studio, which includes an ER digram, sample data, related questions, and the embedded SQL editor in the "Try it now!" section.

Each statement is written in SQL using the storage class (a more general data type) as specified in the [SQLite page on data types](https://www.sqlite.org/datatype3.html).

## Create table

```
CREATE TABLE IF NOT EXISTS sale (
  painting_id INTEGER NOT NULL,
  print_number INTEGER NOT NULL,
  customer_id INTEGER NOT NULL,
  sale_date TEXT NOT NULL,
  sale_price REAL NOT NULL,
  PRIMARY KEY (painting_id, print_number),
  FOREIGN KEY (painting_id) REFERENCES painting (painting_id),
  FOREIGN KEY (customer_id) REFERENCES customer (customer_id)
);
```

In the example above, the primary key `painting_id` is an **auto incrementing** primary key. The SQLite documentation recommends [not using the AUTOINCREMENT keyword](https://www.sqlite.org/autoinc.html) as it adds overheads that is usually not needed. In SQLite, a column with type INTEGER PRIMARY KEY is an alias for the ROWID. On an INSERT, if the ROWID or INTEGER PRIMARY KEY column is not explicitly given a value, then it will be filled automatically with an unused integer, usually one more than the largest ROWID currently in use. This is true regardless of whether or not the AUTOINCREMENT keyword is used.

## Select

```
SELECT painting_id, print_number, customer_id, sale_price, sale_date
FROM sale
WHERE sale_date BETWEEN '2022-01-01' AND '2022-01-31'
ORDER BY painting_id, print_number;
```

Dates are in the format YYYY-MM-DD and times are in the format HH:MM:SS. Both are usually stored within a SQLite database as TEXT values and should therefore be enclosed in single quotation marks.

## Multi-table select
```
SELECT painting.painting_name, sale.print_number, sale.sale_date
FROM painting, sale
WHERE painting.painting_id = sale.painting_id
AND sale.sale_date > '2022-12-31';
```

Most examples on the site show the older style syntax for an inner join, using the WHERE clause, since this is often used in exam papers. We also usually provide an alternative version showing the same functionality using INNER JOIN e.g.

```
SELECT painting.painting_name, sale.print_number, sale.sale_date
FROM painting
INNER JOIN sale
ON painting.painting_id = sale.painting_id
AND sale.sale_date > '2022-12-31';
```

## Insert
```
INSERT INTO sale (painting_id, print_number, customer_id, sale_date, sale_price) VALUES
(1,1,1,'2021-06-15',150.0),
(1,2,2,'2021-07-20',140.0),
(2,1,1,'2021-09-05',160.0);
```

Note that the `sale` table contains a composite key made up of `painting_id` and `print_number`. If a table has an auto-incrementing primary key then the id value should **not** be specified explicitly.

## Update
```
UPDATE sale
SET sale_price = 205
WHERE painting_id = 8 AND print_number = 2;
```

## Delete
```
DELETE FROM sale
WHERE painting_id = 9 AND print_number = 5;
```

# Data types in SQLite

In SQLite, a [limited range of data types](https://www.sqlite.org/datatype3.html) is supported. The most common are:

- NULL - a NULL value
- INTEGER - a signed integer
- REAL - a real number (can have a decimal part)
- TEXT - a text string
- BLOB - a "binary large object" - generally used to store images or media files

More information can be found on our [SQL Data Definition Language (DDL) page](https://adacomputerscience.org/concepts/sql_ddl#sqlite-types).

## Table names

It is conventional to name the table with an identifier that describes the entity. Table names are usually singular, e.g. customer, booking, appointment. Some developers prefix table names with 'tbl', e.g. tblCustomer, tblBooking, tblAppointment.

## Field names

Field names should clearly define their purpose. The names of fields (attributes) can be duplicated across different tables. For example, in the sports club database both the `Member` and `Instructor` tables have a `FirstName` and `LastName` attribute. This will not cause a problem.

Where a field name is ambiguous (i.e. appears in more than one table), you will need to prefix it with the table name in your SQL statements when selecting data from multiple tables. For example, if you are retrieving the first names of both the member and instructor in a single query, you would need to use the syntax `Member.FirstName` and `Instructor.FirstName`. Even if the attribute identifiers are unique, it is still good practice to include the table names as a prefix in a multitable query.