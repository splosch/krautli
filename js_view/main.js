var MyHerbStuff = function (app){

/*
    as an performant improvement, provide data-storage on capable browsers offline storage
    //["Url http://www.kaesekessel.de/kraeuter/", "geschützt", "Name", "Jan", "Feb", "März", "Apr", "Mai", "Jun", "Jul", "Aug", "Sept", "Okt", "Nov", "Dez", "Gefahr", "Anwendung", "Gebiete"]
    // Todo: move to server side (evtl.) This Object can be provided by Server - Cliend side parsing is for Prototyping only
*/
this.helpers({
    initLocalHerbs: function(ha){
        var herbData = {},
            hObjs = {},
            suggestedHerbs = [],
            i;
        
        for(var h in ha){
            hObjs[h] = {};
            hObjs[h].url = ha[h][0];
            hObjs[h].protectedPlant = ha[h][1] === "" ? false : true;
            hObjs[h].name = ha[h][2];
            hObjs[h].cal = [];
            hObjs[h].hazardous = ha[h][15];
            hObjs[h].usage = ha[h][16];
            hObjs[h].loc_desc = ha[h][17];
            
            //fill calender month
            for(i == 3; i < 15; i++){
                hObjs[h].cal.push(ha[h][i] || "");
            }
    
            //push global suggestions (not goood :))
            if (h !== 0){
                suggestedHerbs.push({name : ha[h][2], refId : h});
            }
        }
    
        herbData.obj = hObjs;
        herbData.list = suggestedHerbs;
    
        if(herbData.obj && herbData.list){
            app.trigger('statusMsg', {type:"initApp", msg:"Es stehen "+ herbData.list.length +" zur Verfügung.", log:"DONE: initLocalHerbs"});
        }else{
            app.trigger('errorMsg', {type:"initApp", msg:"Es wurden keine Pflanzendaten gefunden", log:"FAIL: initLocalHerbs"});        
        }
        return herbData;
    }
});

/*
 * Clientside support for suggesting Herbals by name while typing
 * this function uses a datalist to provide browserpowered suggestions
 * for browsers not capable of the datalist feature usage of a gapfiller is provided
 */
function renderDataListForHerbs(hObjs){
    var dataListId = "herbalNameData";
    
    $("#herbalName").after("<datalist id='"+dataListId+"'></datalist>");
    
    for(var h in hObjs){
        //skip the first (not the best implementation to always exec that condition...)
        if(h !== 0 && hObjs[h] && hObjs[h].name){
            $("#"+dataListId).append("<option refId='"+h+"' value='"+hObjs[h].name+"' />");
        }
    }
    
    if($("#"+dataListId).children().length > 0){
        app.trigger('statusMsg', {type:"initApp", log:"DONE: renderDataListForHerbs -> #"+dataListId+" : "+$("#"+dataListId).children().length});
    }else{
        app.trigger('errorMsg', {type:"initApp", log:"FAIL: renderDataListForHerbs -> #"+dataListId});        
    }
}

function initAutoSuggest(herbalList){
    // only use this approach if datalist with included autosuggest is not available
    // Todo: modernizer etc - check
    $("#herbalName").autocomplete(herbalList, {
        matchContains: true,
        width:300,
        scrollHeight: false,
        minChars: 0,
        max: false,
        autoFill: false,
        formatItem: function(row, i, max) {
            return row.name + " °" + row.refId;
        }, 
        formatMatch: function(row, i, max) {
            return row.name;
        },
        formatResult: function(row) {
            return row.name;
        }
    });
    
    
    if(Modernizr.websqldatabase){
        app.trigger('statusMsg', {type:"support", msg:"", log:"DONE: renderDataListForHerbs -> #"+dataListId+" : "+$("#"+dataListId).children().length});
    }else{
        app.trigger('errorMsg', {type:"support", log:"FAIL: renderDataListForHerbs -> #"+dataListId});        
    }
    
    
    if(Modernizr.websqldatabase && Modernizr.geolocation){
        db = db?db:initDB();
        jQuery(window).ready(function(){
            jQuery("#btnInit").click(initiate_geolocation);
            //jQuery("#btnGetData").click(getAllPlants);
        });
    }else{
        console.error("No WebSQL Support");
    }

}


/* DB Tools    */
        function getFirstMatchingPlantId(plantName){
			//to be implemented, get first matching herbal from a list by its name // might fail
			var id;
			id = $("#herbalNameData option[value='"+plantName+"']").attr("refId");
			
			return id;
		}

		function getChoosenPlant(){
			//assuming a inputfield #herbalName && a dataobject herbs
			var plant = {},
				refId = $("#herbalName").attr("refId") || getFirstMatchingPlantId($("#herbalName").val());
			
			plant = herbs[refId];
			
			return plant;
		}

		function updateUIMessages(type, msgContainer){
			var msgObject = [];
			// handle all kinds of errors by pushing data to a msgObject later the UI gets updsted by that data
				if (console[type]) console[type](msgContainer);				
			return msgObject;
		}
		
		function nullDataHandler(transaction, results) { 
			//
		}
		
		function errorHandler(transaction, error)
		{
			// REMOVE!!! Propper Error handling (code 9 is "table alredy exists")
			if(error.code != 9){
				// error.message is a human-readable string.
				// error.code is a numeric error code
				alert('Oops.  Error was '+error.message+' (Code '+error.code+')');
				// Handle errors here
				var we_think_this_error_is_fatal = true;
				if (we_think_this_error_is_fatal){ 
					return true;
				}
			}
			return false;
		}

		function dataHandler(transaction, results)
		{
			var i,row;
			// Handle the results
			var string = "Pos:\n\n";
			for (i=0; i<results.rows.length; i++) {
				// Each row is a standard JS array indexd by
				// column names.
				row = results.rows.item(i);
				string = string + " (ID "+row.id+" "+row.pos_long+" "+row.pos_lat+")\n";
			}
			alert(string);
		}
		
		function createTables(db){
			if(db){
				db.transaction(
					function (transaction) {
						/* The first query causes the transaction to (intentionally) fail if the table exists. */
						transaction.executeSql('CREATE TABLE IF NOT EXISTS plantpositions(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL DEFAULT "Pflanze", pos_long NUMBER NOT NULL DEFAULT "0.0", pos_lat NUMBER NOT NULL DEFAULT "0.0");', [], nullDataHandler, errorHandler);
						/* These insertions will be skipped if the table already exists. */
						transaction.executeSql('insert into plantpositions (name, pos_long, pos_lat) VALUES ("Ref_Pos", "0.12345", "-1.2345");', [], nullDataHandler, errorHandler);
					}
				);
				console.log("createTables - SUCCESS");
			}
			else{
				console.Error("createTables(db) - FAILED - No DB found");
			}
		}
		
		//Plantobject contains various infos on that plant - so take what you need
		function storePlantPos(db, position, plantObj){
			if(db){
				plantname = plantObj.name?plantObj.name:"Pflanze_X";
			
				db.transaction(
					function (transaction) {
						transaction.executeSql('insert into plantpositions (name, pos_long, pos_lat) VALUES ("'+plantname+'", "'+position.coords.longitude+'", "'+position.coords.latitude+'");', [], nullDataHandler, errorHandler);
						console.log("inserted "+plantname+" "+position.coords.longitude+" "+position.coords.latitude);
					}
				);
			}
			else{
				console.Error("storePlantPos(db, position, plantname) - FAILED - No DB found");
			}
		}
		
		function getAllPlants(){
			db.transaction(
				function (transaction) {
					transaction.executeSql("SELECT * from plantpositions",
						[], // array of values for the ? placeholders
						dataHandler, errorHandler);
				}
			);
		}
		
		
		
		function initDB(){
			try {
				if (!window.openDatabase) {
					console.error('Your Browser doesnt support the used SQLite DB API');
				} else {
					var shortName = 'mydatabase';
					var version = '1.0';
					var displayName = 'My Important Database';
					var maxSize = 65536; // in bytes
					var db = openDatabase(shortName, version, displayName, maxSize);
					// You should have a database instance in db.
					
					createTables(db);
					return db;
				}
			} catch(e) {
				// Error handling code goes here.
				if (e === 2) {
					// Version number mismatch.
					console.warning("Invalid database version.");
				} else {
					console.warning("Unknown error "+e+".");
				}
				return null;
			}
		}

		function handle_geolocation_query(position){
			if (!position.error){
				var image_url = "http://maps.google.com/maps/api/staticmap?sensor=false&center=" + position.coords.latitude + ',' + position.coords.longitude + 
								"&zoom=14&size=300x400&markers=color:blue|label:S|" + position.coords.latitude + ',' + position.coords.longitude;

				jQuery("#map").remove();
				jQuery(document.body).append(
					jQuery(document.createElement("img")).attr("src", image_url).attr('id','map')
				);
			}else{
				// handle a visual position-error
				updateUIMessages("warning", position.error);
			}

			storePlantPos(db, position, getChoosenPlant());
		}	
		
		function handle_error(error){
			switch(error.code)
			{
				case error.PERMISSION_DENIED: console.error("user did not share Geolocation data");
					break;
				case error.POSITION_UNAVAILABLE: console.error("could not detect current position");
					break;
				case error.TIMEOUT: console.error("retrieving position timedout");
					break;
				default: alert("unknown error");
					break;
			}
			
			initiate_geolocation(true);
			
			return error.code || "error.UNKNOWN";
		}

		function normalize_yql_response(response)
		{
			var error,
				position = {
						coords : {
						latitude: 0,
						longitude: 0
					},
					address : {
						city: "",
						region: "",
						country: ""
					}
				};
			
			
			if (response.error){
				error = { code : 0 };
				// position aquiry failed - anyway we are optimistic :) 
				position.error = handle_error(error);
				// return;
				
			}else{
				position = {
						coords : {
						latitude: response.place.centroid.latitude,
						longitude: response.place.centroid.longitude
					},
					address : {
						city: response.place.locality2.content,
						region: response.place.admin1.content,
						country: response.place.country.content
					}
				};
			}

			handle_geolocation_query(position);
		}	
		
		function initiate_geolocation(tryGeoLocFallback) {
			var noGPS = tryGeoLocFallback || false;
			if (navigator.geolocation && !noGPS){
				navigator.geolocation.getCurrentPosition(handle_geolocation_query, handle_error);
			}
			else{
				if(noGPS) 
					yqlgeo.get('visitor', normalize_yql_response);
			}
		}
};