(function() {
   require('./node_modules/select2/dist/js/select2')($);
   const mysqlConnection = require('./db/mysqlConnection');
   const connection = mysqlConnection.connection;

   var autocomplete = require('./utils/autocomplete');
   //var names = [];
   var artikli = [];
   var artikli_naziv = [];

   function getArtikli(input) {
      console.log('input:'+input);

      var query = 'SELECT naziv FROM artikal WHERE naziv ';

      var inputKeywords = input.split(" ");

      for(i=0;i<inputKeywords.length;i++){
         if(i == 0) {
            query += 'LIKE \'%'+ inputKeywords[i] + '%\'';
         } else {
            query += ' AND naziv LIKE \'%'+ inputKeywords[i] + '%\'';
         }
      }

      query += ' ORDER BY naziv desc LIMIT 20';

      console.log('query::'+query);


      //var sql = connection.query('SELECT naziv FROM artikal WHERE naziv LIKE \'%'+ input + '%\' ORDER BY naziv desc LIMIT 20', function(err, result) {
      var sql = connection.query(query, function(err, result) {
      if(err) {
         console.log(err);
      }
      var rows = JSON.parse(JSON.stringify(result));

      //$('#color-select').val(null).trigger('change');
      artikli = [];
      artikli_naziv = [];

         


         //console.log('row number:'+rows.length);

         for(i=0; i< rows.length; i++) {
            //names.push(result[i]['first_name']);
            artikli.push(result[i]);
            artikli_naziv.push(result[i]['naziv']);
         }

         //setTimeout(() => {
         //console.log('artikli::'+JSON.stringify(artikli_naziv));
         autocomplete(document.getElementById("myInput"), artikli_naziv, input);
         //}, 2000)
         

         //console.log(JSON.stringify(artikli));
         $("#color-select").select2({
               data:artikli_naziv,
               closeOnSelect: false
         });

      //    $('#olor-select').select2().on('change', function() {
      //       $('#value').select2({data:data[$(this).val()]});
      //   }).trigger('change');

         // $(document).ready(function(){
         //    //var colorList=["orange","white","red"];
         //    var colorList=artikli_naziv;
         //    $("#color-select").select2({
         //    data:colorList
         //    });
         // });

         // $(document).ready(function(){
         //    //var colorList=["orange","white","red"];
         //    var colorList=artikli_naziv;
         //    $("#color-select2").select2({
         //    data:colorList
         //    });
         // });
      });
   }

   //let $ = require('jquery') 




   var search1 = '';
   var search2 = '';
   var limit = 10;

   // $(document.body).on("change","#color-select",function(){
   //    alert(this.value);
   //   });
   //##################################################
   $('#color-select').on('select2:open', function (e) {
      console.log('mf open');
      

      $('.select2-search__field').on('keydown', function(e) {
         //alert('mf on keydown1');
         search1+= String.fromCharCode(e.keyCode);
         getArtikli(limit);
         this.limit = 5;
      });
   });

   //##################################################



   $('#color-select2').on('select2:open', function (e) {
      console.log('mf open2');
      
      $('.select2-search__field').on('keydown', function(e) {
         console.log('mf on keydown2:'+String.fromCharCode(e.keyCode));
         search2+= String.fromCharCode(e.keyCode);
         //var y = $('#color-select2').find('.select2-search__field').val();
         console.log('search2='+search2);

         var value = $('#color-select2').data('select2').search;
         console.log('color-select2:current value:'+value);

      });
   });

   //##################################################



   //   $(document.body).on("change","#color-select",function(){
   //    alert(this.value);
   //   });


   //getArtikli(20);

   $("#myInput").keyup(function(e){
      console.log('current key:'+ String.fromCharCode(e.keyCode));
      var inputValue = $('#myInput').val();
      console.log('input field value:'+ inputValue);
      if((inputValue.length == 2 || inputValue.length > 3) && e.keyCode != 40 && e.keyCode != 38) {
         getArtikli(inputValue);
      }
      //$("input").css("background-color", "pink");
   });



   //autocomplete(document.getElementById("myInput"), artikli_naziv);
})()
   
