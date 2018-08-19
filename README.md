# ZPLify

## Background

The ZPL language is used to pass data to Zebra thermal printers, which are commonly used to print receipts.  In the case of this module, the principle focus is printing a food label based on a set of input data.

## Install

In terminal, in the same directory as your `node_modules` directory:
```npm install zplify --save```

In your module:
```
(function() {
  const zplify = require('zplify');

  // your code here
})();
```

## Usage

### Create a table:

```
zplify.generateTable({
  rows: [
    ['col1', 'col2'],
    ['row1col1', 'row1col2']
  ],
  config: {
    columnRatios: [.3, .7]
  }
});

// returns a table with 2 rows and 2 columns, where row contains the column names
```


## Config parameters

* `columnRatios` - specifiy custom widths for the table columns

  * must contain an equal number of items as the `columns` array
  * entries must add up to 1
  * each entry must be greater than 0 and less than 1

  ex: ```
    zplify.generateTable({
      rows: [
        ['id', 'name', 'qty', 'price'],
        ['1', 'Delicious Dog Food', '2', '42']
      ],
      config: {
        columnRatios: [.1, .7, .1, .1]
      }
    });
  ```


## A bit about the logic

ZPL II is not backwards compatable with ZPL I [1], which is to say that an interpreter expecting ZPL II code will not necessarily return the correct results given an input in the ZPL I format. As such, I've elected to use the more recent version, ZPL II.

I may choose to add more features in following versions. If you'd like to request a feature, please reach out to zplify@ajdebeer.com. Here are some I'm thinking might be useful:

1. configuration option to produce output in the ZPL I format. 
2. overflow detection for a cell & handling protocol (wrap, throw error, or custom handler)

## Resources

Learn more about the Zebra programming language here:

1. [Wikipedia article](https://en.wikipedia.org/wiki/Zebra_(programming_language))
