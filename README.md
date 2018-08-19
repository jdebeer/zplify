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

#### Create table with default formatting:
```
const rows = ['Vitamin A', 'Vitamin B'];
const columns = ['']
zplify.generateTable();
```

#### Create table with custom formatting:
```

```

## Custom table configuration


## A bit about the logic

ZPL II is not backwards compatable with ZPL I [1], which is to say that an interpreter expecting ZPL II code will not return the correct results given an input in the ZPL I format, necessarily. As such, I've elected to use the more recent version, ZPL II.

I may choose to add more features in following versions. If you'd like to request a feature, please reach out to zplify@ajdebeer.com. Here are some I'm thinking might be useful:

1. configuration option to produce output in the ZPL I format. 
2. overflow detection for a cell & handling protocol (wrap, throw error, or custom handler)

## Resources

Learn more about the Zebra programming language here:

1. [Wikipedia article](https://en.wikipedia.org/wiki/Zebra_(programming_language))
