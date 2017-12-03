function id(element) {
    return document.getElementById(element);
}

//var db = null;

function init(){
       
	id("gotoPage2").addEventListener("click", function(){
    gotoPage2();
	});
    
	id("query_button").addEventListener("click", function(){
    var rs =queryDb();
    console.log('item 1'+JSON.stringify(rs.rows.item(0)));
	});
    
	id("delete_button").addEventListener("click", function(){
    deleteDb();
	});
        

	   
	db = window.sqlitePlugin.openDatabase({name: 'notifications.db', location: 'default'});
   
   db.sqlBatch([
   'CREATE TABLE IF NOT EXISTS notifications (event, date)',
   [ 'INSERT INTO DemoTable VALUES (?,?)', ['Meeting', '12/12/2017'] ],
   [ 'INSERT INTO DemoTable VALUES (?,?)', ['Breakfast', '13/12/2017'] ],
   ], function() {
	   console.log('Populated database OK');
	   alert("Table created successfully");
   }, function(error) {
	   console.log('SQL batch ERROR: ' + error.message);
	   alert("Error occurred while creating the table.");
   }); 
    
	
	document.getElementById("submit").addEventListener("click", newnoti, false);
	db = window.sqlitePlugin.openDatabase({ name: 'schedule.db', location: 'default' }, function (db) {

	    db.transaction(function (tx) {
	    
	    tx.executeSql('CREATE TABLE appointments (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, date TEXT)');
		}, function (error) {
		    //alert('transaction error: ' + error.message);
		}, function () {
		    alert('transaction ok');
		});

	}, function (error) {
		 alert('Open database ERROR: ' + JSON.stringify(error));
	});	
}


function insertDb(dateIn, eventIn){
    db.sqlBatch([
        ['INSERT INTO notifications VALUES (?,?)', ['Dinner',14/12/2017']]
    ], function(){
        console.log('insert ok');
    }, function(error){
        console.log('insert ERROR: '+ error.message);
    });
}


function delteDb(){
    db.sqlBatch([
        'delete FROM notifications'
    ], function(){
        console.log('delete OK');
    }, function(error) {
        consolo.log('delete ERROR '+ error.message);
    });
               
}




function gotoPage2(){
    $.mobile.navigate("#page2", {info:"info goes here"});
}

function loadList(){
    var data = {"notifications":["08/12/2017 - 11:30","07/12/2017 - 12:30","22/12/2017 - 15:30"]}
    
    var myHtml ="";
    
    for (i=0;i<data.notifications.length;i++){
        myHtml += "<li>" + data.notifications[i] + "</li>";
    }
    
   id("myList").innerHTML = myHtml;
    
}
