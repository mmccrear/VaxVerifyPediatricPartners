var args = arguments[0] || {};

function generateSections(){
	alert(args);
	for(var aptTime in args){
		var vax = args[aptTime];
		var section = Ti.UI.createTableViewSection();
		section.setHeaderTitle(aptTime);
		for (var i=0;i<vax.length;i++){
			row = Ti.UI.createTableViewRow();
			row.title = vax[i];
			section.add(row);
		}
		$.resultsTable.appendSection(section);
	}
	
}
