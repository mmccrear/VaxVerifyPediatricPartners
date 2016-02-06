var today = new Date();
today.setHours(0,0,0,0);

Alloy.Globals.timeBetween = function(date1, date2, daysWeeksMonthsYears){
	var oneTimeUnit = 24*60*60*1000; // One day in miliseconds
	if(daysMonthsWeeksYears==="week"){
		oneTimeUnit=oneTimeUnit*7; //one week
	}
	if(daysMonthsWeeksYears==="month"){
		oneTimeUnit=oneTimeUnit*30; //one month
	}
	if(daysMonthsWeeksYears==="year"){
		oneTimeUnit=oneTimeUnit*365; //one year
	}

	var diff = Math.round(Math.abs((date1.getTime() - date2.getTime())/(oneTimeUnit)));
	return diff;
};

Alloy.Globals.age = function(date1){
	var days = Alloy.Globals.timeBetween(today, date1);
	var weeks, months, years;
	while(days>=365){
		years++;
		days-=365;
	}
	while(days>=30){
		months++;
		days-=30;
	}
	while(days>=7){
		weeks++;
		days-=7;
	}
	return [years, months, weeks, days];
};



