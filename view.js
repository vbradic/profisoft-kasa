let $ = require('jquery')  // jQuery now loaded and assigned to $
require('./node_modules/select2/dist/js/select2')($);
let count = 0
$('#click-counter').text(count.toString())
$('#countbtn').on('click', () => {
   count ++ 
   $('#click-counter').text(count)
}) 