Alloy.Globals.Navigator = {
	
	/**
	 * Handle to the Navigation Controller
	 */
	navGroup: $.nav,
	
	open: function(controller, payload){
		var win = Alloy.createController(controller, payload || {}).getView();
		
		
			
			// added this property to the payload to know if the window is a child
			if (payload.displayHomeAsUp){
				
				win.addEventListener('open',function(evt){
					var activity=win.activity;
					activity.actionBar.displayHomeAsUp=payload.displayHomeAsUp;
					activity.actionBar.onHomeIconItemSelected=function(){
						evt.source.close();
					};
				});
				
			}
			
			win.open();
		
	}
};

var win = Ti.UI.currentWindow;
var noteDataSet = {};
$.index.addEventListener('focus', function(evt){
					Ti.API.info("On Parent Screen Again !!");
					load_page();				    
				});
				

load_page();
function load_page(){
	var newDataSet = require('NoteDataSet');
	noteDataSet = newDataSet.returnData();
	var sectionHeader = Ti.UI.createView({
				 	backgroundColor: "#ececec",
				 	width: Ti.UI.FIll,
				 	height: 30
				 });
	var sectionLabel = Ti.UI.createLabel({
				 	text: 'MOM Notes',
				 	left: 20,
				 	font:{
				 		fontSize: 20
				 	},
				 	color: "#666"
				 });
				 sectionHeader.add(sectionLabel);	
	var section = Ti.UI.createListSection({ headerView: sectionHeader});	


	section.setItems(noteDataSet);
	$.listView.sections[0].setItems(noteDataSet);
}
function doClick(e) {
    alert($.label.text);
}
var onSearchChange,onSearchCancel;
onSearchChange = function onChange(e){
		if($.searchBar.value !==''){
			$.closeBtn.visible = true;
		}
		else{
			$.closeBtn.visible = false;
		}
		
		$.listView.searchText = $.searchBar.value;
	};
onSearchCancel = function onCancel(e){
		$.closeBtn.visible = false;
		$.searchBar.value = '';
		$.searchBar.blur();
	};
	
function onItemClick(e){
	//Ti.Analytics.featureEvent(Ti.Platform.osname+"."+title+".contact.clicked");
	var item = $.listView.sections[e.sectionIndex].items[e.itemIndex];
	var data = [{'item':item,'index':e.itemIndex,'dataset':noteDataSet}];
	Alloy.Globals.Navigator.open("notes", data);
}	

function onAddNotes(){
	Ti.API.info("Current Dataset: "+noteDataSet.length);
	var data = [{'index':noteDataSet.length,'dataset':noteDataSet}];
	Alloy.Globals.Navigator.open("notes", data);
}
//section.items = noteDataSet;

$.index.open();
