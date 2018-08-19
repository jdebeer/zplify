## my approach

I started by looking at the labelary and zebra docs, which each provide
essentially a very large table of keys and values.

I did a bunch of googling and couldn't come up with anything particularly convenient.

I even thought to download the driver for a printer in zebra and print a google doc
to that printer, but that started taking too long and feeling out of the way.

So, eventually, I just used the example in labelary. The 4th section of the example
is basically a table with one row and two cells, so I went with that to get the basic
idea down and extrapolated from there.

## zpl language

### get relevant ZPL language parts for table generation

This produced a table with one row and two columns.

```
^XA

^FO50,900^GB700,250,3^FS
^FO400,900^GB1,250,3^FS
^CF0,40
^FO100,960^FDShipping Ctr. X34B-1^FS
^FO100,1010^FDREF1 F00B47^FS
^FO100,1060^FDREF2 BL4H8^FS
^CF0,190
^FO485,965^FDCA^FS

^XZ
```

Which indicates, referencing the docs [1]:

```
XA -> begin doc                                           // start format

  FO -> x, y alignment                                    // field origin

    GB -> width, height, thickness, color, rounding       // graphic box

      FD -> data                                          // field data

      FS                                                  // field separator
 
  CF -> fontName, height, width                           // change default font

XZ -> end doc                                             // end format
```

Assume
1. _203 dpi -> 203 dots per inch_
2. _all units are in dots_

So the same ZPL with variables would be something like:
```
^XA
^FO{ labelPadding },{ labelPadding + rowNumber\*rowHeight }^GB{ tableWidth },{ rowHeight },{ borderWidth }^FS
^FO400,900^GB1,250,3^FS
^CF0,40
^FO100,960^FDShipping Ctr. X34B-1^FS
^FO100,1010^FDREF1 F00B47^FS
^FO100,1060^FDREF2 BL4H8^FS
^CF0,190
^FO485,965^FDCA^FS
^XZ
```


## drawing a table with the components above

config vars:

- labelWidth (default: 4 inches)
- labelHeight (default: 6 inches)
- printDensity (default: 8 dpmm -> 203dpi)
- labelPadding (default: 50 dots)
- borderWidth: (default: 3 dots)
- titleFontSize (default: calculated as half row height, in dots)
- cellFontSize (default: calculated as half row height, in dots)
- titleRowHeight (default: calculated as equal to cell height)

inferred vars (from column titles/rows object array)

- number of labels (1)
- number of columns (2)
- number of rows (1)

calculated vars

- rowHeight = (labelHeight - labelPadding\*2)/(1+numberRows)
- tableWidth = labelWidth - 2\*labelPadding
- title font size
- title font weight


## Algorithm overview

1. Create opening
2. Create border box
3. Create vertical separators
4. Create horizontal separators
5. Fill in content
6. Create closing











## iterating on the lablary example

### 1 - move it to the top
```
^XA

^FO50,50^GB700,250,3^FS
^FO400,50^GB1,250,3^FS
^CF0,40
^FO100,100^FDShipping Ctr. X34B-1^FS
^FO100,160^FDREF1 F00B47^FS
^FO100,210^FDREF2 BL4H8^FS
^CF0,190
^FO485,115^FDCA^FS

^XZ
```

### 2 - add another row
```
^XA

^FO50,50^GB700,500,3^FS
^FO400,50^GB1,500,3^FS
^FO50,300^GB700,1,3^FS

^CF0,40
^FO100,100^FDShipping Ctr. X34B-1^FS
^FO100,160^FDREF1 F00B47^FS
^FO100,210^FDREF2 BL4H8^FS
^CF0,190
^FO485,115^FDCA^FS

^XZ
```

### 2 - add another column
```
^XA

^FO50,50^GB700,500,3^FS
^FO283,50^GB1,500,3^FS
^FO516,50^GB1,500,3^FS
^FO50,300^GB700,1,3^FS

^CF0,40
^FO100,100^FDOrder 1287^FS
^FO100,160^FDREF1 F00^FS
^FO100,210^FDREF2 BAR^FS

^FO333,100^FDOrder 1287^FS
^FO333,160^FDREF1 F00^FS
^FO333,210^FDREF2 BAR^FS

^FO566,100^FDOrder 1287^FS
^FO566,160^FDREF1 F00^FS
^FO566,210^FDREF2 BAR^FS




^FO100,350^FDOrder 1287^FS
^FO100,410^FDREF1 F00^FS
^FO100,460^FDREF2 BAR^FS

^FO333,350^FDOrder 1287^FS
^FO333,410^FDREF1 F00^FS
^FO333,460^FDREF2 BAR^FS

^FO566,350^FDOrder 1287^FS
^FO566,410^FDREF1 F00^FS
^FO566,460^FDREF2 BAR^FS


^XZ
```




# Resources

1. http://labelary.com/docs.html
