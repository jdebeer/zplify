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

The main method to be used is `generateTable`, which takes an object with 2 properties:
1. `rows` - a _matrix_ (array of arrays), in which each entry corresponds to a table row
2. `config` - an object containing properties for modifying the default formatting

It is assumed that the first item in the `rows` array will an array of column titles,
which receive slightly different styling than the rest of the rows.

### Example:

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


### Config parameters

* `columnRatios`

  * type: `Array`
  * default: `[]` _(evaluates to evenly spaced columns)_
  * description: _specifiy custom widths for the table columns_
  * notes:

    * must contain an equal number of items as the `columns` array
    * entries must add up to 1
    * each entry must be greater than 0 and less than 1

  _example_: 

  ```
    zplify.generateTable({
      rows: [
        ['id', 'name', 'qty', 'price'],
        ['1', 'Delicious Dog Food', '2', '42']
      ],
      config: {
        columnRatios: [.1, .7, .1, .1] // same number of values as the first row
      }
    });
  ```


* `labelWidth`

  * type: `Number`
  * unit: `inches`
  * default: `4`
  * descripton: _specify the total width of the label_
  * notes:

    * _width must be greater than 0_

* `labelHeight`

  * type: `Number`
  * unit: `inches`
  * default: `6`
  * description: _specify the total height of the label_
  * notes:

    * _height must be greater than 0_

* `printDensity`

  * type: `Number`
  * unit: `DPI` _(dots per inch)_
  * default: `203` _(8 dpmm)_
  * description: _specify the dot resolution of the print_

* `labelPadding`

  * type: `Number`
  * unit: `dots`
  * default: `50`
  * description: _specify the amount of space you'd like around the table_

* `borderWidth`
  
  * type: `Number`
  * unit: `dots`
  * default: `3`
  * description: _specify how thick youd like the lines on the table to be_


* `fontSize`

  * type: `Number`
  * unit: `dots`
  * default: `30`
  * description: _specify how big you'd like the font to be_


* `maxRowHeight`

  * type: `Number`
  * unit: `dots`
  * default: _twice the `fontSize` (so, `60` dots; see above)_
  * description: _specify the maximum height you'd like a row to be_

* `rowHeight`

  * type: `Number`
  * unit: `dots`
  * default: _equal to the `maxRowHeight` (so, `60` dots; see above)_
  * description: _specify the height that you'd like each row to be_

* `cellPadding`

  * type: `Number`
  * unit: `dots`
  * default: `20`
  * description: _specify the amount of space you'd like to the left of each cell value_
  * notes:
    * _this does not apply to cells that have been horizontally centered_

### Testing

To see how the table you generated looks, you can use [Labelary](http://labelary.com/viewer.html).

## A bit about the logic

ZPL II is not backwards compatable with ZPL I [1], which is to say that an interpreter expecting ZPL II code will not necessarily return the correct results given an input in the ZPL I format. As such, I've elected to use the more recent version, ZPL II.

I may choose to add more features in following versions. If you'd like to request a feature, please reach out to zplify@ajdebeer.com. Here are some I'm thinking might be useful:

1. configuration option to produce output in the ZPL I format. 
2. overflow detection for a cell & handling protocol (wrap, throw error, or custom handler)

## Resources

Learn more about the Zebra programming language here:

1. [Wikipedia article](https://en.wikipedia.org/wiki/Zebra_(programming_language))
