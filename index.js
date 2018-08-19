const zplify = (function() {

  function getArraySum(arrayOfNums) {
    return arrayOfNums.reduce((sum, proportion) => {
      if (!isNaN(proportion) && proportion > 0 && proportion <= 1) {
        return sum+proportion;
      }
      return 0;
    }, 0);
  }

  function getColumnWidths(columnRatios, columns, tableWidth) {

    const columnRatiosSum = getArraySum(columnRatios);

    if (columnRatios.length === columns.length
        && (Math.abs(columnRatiosSum - 1) < Number.EPSILON)) {
      return columnRatios.map(proportion => Math.floor(proportion*tableWidth));
    }
    return columns.map(col => Math.floor(tableWidth/columns.length));
  };

  function createBorderBox (labelPadding, tableHeight, tableWidth, borderWidth) {
    return '^FO'+labelPadding
           +','+labelPadding
           +'^GB'+tableWidth
           +','+tableHeight
           +','+borderWidth
           +'^FS\n';
  };

  function createVerticalSeparators(
    columns,
    columnWidths,
    labelPadding,
    tableHeight,
    borderWidth
  ) {
    let runningSum = 0;
    let separators = '';
    columns.forEach((column, index) => {
      if (index === columns.length-1) return;
      runningSum += columnWidths[index];
      separators += '^FO'+(labelPadding+runningSum)
               +','+labelPadding
               +'^GB1,'+tableHeight
               +','+borderWidth
               +'^FS\n';
    });
    return separators;
  };

  function createHorizontalSeparators(
    rows,
    rowHeight,
    labelPadding,
    tableWidth,
    borderWidth
  ) {
    let runningSum = 0;
    let separators = '';
    rows.forEach((row, index) => {
      if (index === rows.length-1) return;
      runningSum += rowHeight;
      separators += '^FO'+labelPadding
               +','+(labelPadding+runningSum)
               +'^GB'+tableWidth
               +',1'
               +','+borderWidth
               +'^FS\n';
    });
    return separators;
  };

  function createAllCellContent(
    fontSize,
    labelPadding,
    rowHeight,
    columns,
    rows,
    cellPadding,
    columnWidths
  ) {
    const cells = [];
    cells.push('^CF0,'+fontSize+','+fontSize);
    let runningYSum = labelPadding;
    rows.forEach((row, rowIndex) => {
      const yOffset = runningYSum+(rowHeight-fontSize)/1.5;
      runningYSum += rowHeight;

      let runningXSum = labelPadding;
      columns.forEach((col, colIndex) => {
        let xOffset = runningXSum;
        if (rowIndex !== 0) {
          xOffset += cellPadding;
        }
        runningXSum += columnWidths[colIndex];
        let cell = '^FO'+xOffset+','+yOffset;
        if (rowIndex === 0) {
          cell += '^A0N,'
               +fontSize
               +','+(fontSize+2)
               +'^FB'+columnWidths[colIndex]
               +',1,0,C^FD';
        }
        else {
          cell += '^FD';
        }
        cell += (typeof row[colIndex] === 'undefined' ? '' : row[colIndex])+'^FS';
        cells.push(cell);
      });
    });

    return cells.join('\n') + '\n';
  };

  function generateTable({ rows = [], config = {} }) {
    const columns = rows[0]; // 

    const {
      labelWidth: labelWidthInches = 4, // inches
      labelHeight: labelHeightInches = 6, // inches
      printDensity = 203, // dots per inch (dpi)
      labelPadding = 50, // dots
      borderWidth = 3, // dots
      columnRatios = [], // array of decimal ratios that must add up to 1
      fontSize = 30, // dots
      maxRowHeight = 2*fontSize, // dots
      rowHeight = maxRowHeight, // dots
      cellPadding = 20 // dots
    } = config;

    const labelWidth = labelWidthInches*printDensity;
    const labelHeight = labelHeightInches*printDensity;

    const tableWidth = labelWidth - 2*labelPadding;
    const tableHeight = rows.length*rowHeight;

    const columnWidths = getColumnWidths(columnRatios, columns, tableWidth);

    // there are 6 steps

    // 1. Create opening
    let zplTable = '^XA\n';

    // 2. Create border box
    zplTable += createBorderBox(labelPadding, tableHeight, tableWidth, borderWidth);

    // 3. Create vertical separators
    zplTable += createVerticalSeparators(columns, columnWidths, labelPadding, tableHeight, borderWidth);

    // 4. Create horizontal separators
    zplTable += createHorizontalSeparators(rows, rowHeight, labelPadding, tableWidth, borderWidth);

    // 5. Fill in content
    zplTable += createAllCellContent(fontSize, labelPadding, rowHeight, columns, rows, cellPadding, columnWidths);

    // 6. Create closing
    zplTable += '^XZ';

    return zplTable;
  };

  return {
    getArraySum,
    getColumnWidths,
    createBorderBox,
    createVerticalSeparators,
    createHorizontalSeparators,
    createAllCellContent,
    generateTable
  };
})();

module.exports = zplify;
