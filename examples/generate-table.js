(function() {

  const zplify = require('../');

  const zplTable = zplify.generateTable({
    rows: [
      ['Pet name','Item','qty','grams'],
      ['Roxy', 'BIODEGRADABLE_TRAY_00', 2, 0],
      ['Roxy', 'PORK02_05', 2, 333],
      ['Phenom', 'BEEF02_05', 2, 333],

      // ['Roxy', 'BIODEGRADABLE_TRAY_00', 2, 0],
      ['Roxy', 'BIODEGRADABLE_TRAY_00'],

      ['Roxy', 'PORK02_05', 2, 333],
      ['Phenom', 'BEEF02_05', 2, 333],
      ['Roxy', 'BIODEGRADABLE_TRAY_00', 2, 0],
      ['Roxy', 'PORK02_05', 2, 333],
      ['Phenom', 'BEEF02_05', 2, 333],
      ['Roxy', 'BIODEGRADABLE_TRAY_00', 2, 0],
      ['Roxy', 'PORK02_05', 2, 333],
      ['Phenom', 'BEEF02_05', 2, 333],
      ['Roxy', 'BIODEGRADABLE_TRAY_00', 2, 0],
      ['Roxy', 'PORK02_05', 2, 333],
      ['Phenom', 'BEEF02_05', 2, 333],
      ['Phenom', 'PORK02_05', 2, 333]
    ],
    config: {
      columnRatios: [.2, .55, .1, .15], // must add up to 1
      // borderWidth: 10
      // titleRowHeight: 100
      // hasTitleRow: false,
      // maxRowHeight: 100,
      // printDensity: 300
      // rowHeight: 100
    }
  });

  console.log('zpl table: ', zplTable);

})();