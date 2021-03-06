var _date;
var _format = 'dddd, Do MMMM YYYY';
var month = new Date().getMonth() + 1;
var month = new Date().getYear();


function dt() {
	$(function () {
		$('#date').datetimepicker({
			inline: true,
			sideBySide: false,
			defaultDate: _date
		});
		
		$('#date').on("dp.change", function (e) {
			_date = $('#date').data('DateTimePicker').date();
			$('#dateval').text(_date.format(_format));
			$('[data-toggle="popover"]').blur();
			$('[data-toggle="popover"]').popover("hide");
			CalendarTable();
		});
	
	});

}


function dateInit() {
	_date = moment();
	$('#dateval').text(_date.format(_format));
}

$(document).ready(function(){
    $('[data-toggle="popover"]').popover({
		html: true,
		content: "<div id=\"date\"></div><script>dt();<\/script>" // Embedded end script element breaks js, remember to split it.
	});
});

function dateSet(rewind) {
	if(rewind) {
		_date.subtract(1, 'month');
		CalendarTable();
		
	} else {
		_date.add(1, 'month');
		CalendarTable();

	}
	$('#dateval').text(_date.format(_format));
	

}


function loadMonthView() {
	dateInit();

}

 	
			function CalendarTable(){
				
		var getDaysInMonth = function(month,year) {  
 
			//Day 0 is the last day in the previous month  
			return new Date(year, month, 0).getDate(); 
		}		
		month = new Date(_date).getMonth() + 1;
		var currYear = new Date(_date).getYear();
		var yearHolder = "20" + currYear.toString().substr(1);
		year = parseInt(yearHolder);
		var daysInCurrentMonth = getDaysInMonth(month, year);
		var daysInPreviousMonth = getDaysInMonth(month - 1, year);
		var currentMonthStartDay = new Date(year + "-" + month + "-01").getDay() - 1;
		console.log(currentMonthStartDay);
		var days = 0;		
		var daysPrior= daysInPreviousMonth - currentMonthStartDay;
		
		console.log(_date._d);

			var div = document.getElementById('monthView');
			
			div.innerHTML = "<table  class='table' id='clndr'><tr><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th><th>Sunday</th></tr></table>";
			 var table = div.getElementsByTagName('tbody')[0];
				//creates rows and cell to be added to table
				
				

				
				function calDays(){
					if(daysPrior < daysInPreviousMonth){
						daysPrior++;
						return daysPrior;
					}
				if(days > -1 && days <daysInCurrentMonth){
					days++;
					}
				else{
				
				days = 1
					return 1;
				}
				
				return days;
				}
				
				for(var i = 1; i<=6;i++){
					var row = table.insertRow(i);
					var cell1 = row.insertCell(0);
					var cell2 = row.insertCell(1);
					var cell3 = row.insertCell(2);
					var cell4 = row.insertCell(3);
					var cell5 = row.insertCell(4);
					var cell6 = row.insertCell(5);
					var cell7 = row.insertCell(6);
					
					cell1.setAttribute("id",calDays());
					cell2.setAttribute("id",calDays());
					cell3.setAttribute("id",calDays());
					cell4.setAttribute("id",calDays());
					cell5.setAttribute("id",calDays());
					cell6.setAttribute("id",calDays());
					cell7.setAttribute("id",calDays());
					cell1.innerHTML = cell1.getAttribute("id") + "<div id='"+cell1.getAttribute("id")+"/"+month+"'></div>";
					cell2.innerHTML = cell2.getAttribute("id") + "<div id='"+cell2.getAttribute("id")+"/"+month+"'></div>";
					cell3.innerHTML = cell3.getAttribute("id") + "<div id='"+cell3.getAttribute("id")+"/"+month+"'></div>";
					cell4.innerHTML = cell4.getAttribute("id") + "<div id='"+cell4.getAttribute("id")+"/"+month+"'></div>";
					cell5.innerHTML = cell5.getAttribute("id") + "<div id='"+cell5.getAttribute("id")+"/"+month+"'></div>";
					cell6.innerHTML = cell6.getAttribute("id") + "<div id='"+cell6.getAttribute("id")+"/"+month+"'></div>";
					cell7.innerHTML = cell7.getAttribute("id") + "<div id='"+cell7.getAttribute("id")+"/"+month+"'></div>";

				}
			getEvents();
			}
			function hasEvent(date){
				var thisDay = date +"/"+month+"";
				var dayToAdd = document.getElementById(thisDay);
				//console.log(dayToAdd);
				dayToAdd.innerHTML = "<button onclick= 'showEventsByDate(this.parentNode.parentNode.id)'>Events</button>";
			}
			


			function getEvents(){
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

						var return_data = xmlhttp.responseText;
						//decodes JSON file
						var parsed = JSON.parse(return_data);
						//console.log(parsed);
						
						for (var x = 0; x < parsed.length; x++){
							//console.log(parsed[x].date_time_start);
							var str = parsed[x].date_time_start;
							var useMonth;
							
							if( month.toString().length == 1){
								var useMonth = "0"+month;
								console.log("true");
								//console.log(currYear);
							}
							else{
								var useMonth = month;
								//console.log(currYear);
								console.log("False");
							}
							
							if (str.indexOf(year +"-"+useMonth+"") >= 0){
								var res = str.substr(8, 2);
								
								var s = res;
								while(s.charAt(0) === '0'){
									s = s.substr(1);
								}
								//console.log(s);
								hasEvent(s);
								
							}
						}						
						
					}
					};
				xmlhttp.open("GET", "calendarMonthAPI.php" , true);
				xmlhttp.send();
			}
						
			
			
	function showEventsByDate(date) {
	  var xhttp;    
	  if (date == "") {
		document.getElementById("eventData").innerHTML = "";
		return;
	  }
	  xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
		  document.getElementById("eventData").innerHTML = xhttp.responseText;
		}
	  };
		if( date.length == 1){
		date = "0"+date;
		}
		
		var useMonth;
							
		if( month.toString().length == 1){
			var useMonth = "0"+month;
			console.log("true");
		}
		else{
			var useMonth = month;
			console.log("False");
		}
		
		var newDate= year + "-"+useMonth+"-"+date;
		console.log(newDate);
		xhttp.open("GET", "showEventsMonth.php?task="+newDate, true);
		xhttp.send();
	}