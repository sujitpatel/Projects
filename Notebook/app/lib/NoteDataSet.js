var noteDataSet = [];
var updateflg = false;
function loadData() {
	noteDataSet = [
		    { noteName: {text: 'Notes 1'}, noteDate: {text: 'Today'}, noteDetail: {text:'Detail 1'}},
		    { noteName: {text: 'Notes 2'}, noteDate: {text: 'On 22 Jun 2015'}, noteDetail: {text:'Detail 2'}},
		    { noteName: {text: 'Notes 3'}, noteDate: {text: 'On 21 Jun 2015'}, noteDetail: {text:'Detail 3'}}
		];
	
	var dataset = JSON.parse(Ti.App.Properties.getString("notedata"));
	if(dataset == undefined){	
		Ti.App.Properties.setString("notedata", JSON.stringify(noteDataSet));	
	}
	else {
		noteDataSet = dataset;
	}
	return noteDataSet;	
};

exports.returnData = function(){
	Ti.API.info("Flg: "+updateflg);
	if(updateflg){
		noteDataSet = JSON.parse(Ti.App.Properties.getString("notedata"));
		return noteDataSet;
	}
	else
		return loadData();
};

exports.updateData = function(index,name,detail,date){
	updateflg  = true;
	noteDataSet[index] = {noteName: {text: name}, noteDate: {text: date}, noteDetail: {text:detail}};
	Ti.App.Properties.setString("notedata", JSON.stringify(noteDataSet));	
};

exports.addData = function(name,detail,date){
	updateflg  = true;
	noteDataSet.push({noteName: {text: name}, noteDate: {text: date}, noteDetail: {text:detail}});
	Ti.App.Properties.setString("notedata", JSON.stringify(noteDataSet));	
	return noteDataSet;
};

exports.deleteData = function(index){
	updateflg  = true;
	noteDataSet.splice(index, 1);
	Ti.App.Properties.setString("notedata", JSON.stringify(noteDataSet));	
	return noteDataSet;
};
