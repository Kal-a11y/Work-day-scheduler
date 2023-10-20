// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const workDayHours = [9,10,11,12,13,14,15,16,17] //hours in 24 hour time

function isAmOrPm(hour){
  let meridiem;
  if (hour <= 11){
    meridiem = "AM"
  }else if (hour >= 12 && hour <= 24){
    meridiem = "PM"
  }else{
    console.log('invalide time')
  }
  return meridiem
}

function createTimeBlockElements(){
  //Element that holds all time blocks
  let allBlocks = $('#time-blocks')
  
  for (var i = 0; i < workDayHours.length; i++){
    //Create elements
    let blockContainerEl = $('<div>', {class: 'row time-block'});
    let eventHourEl = $('<div>', {class: 'col-2 col-md-1 hour text-center py-3'});
    let eventTextEl = $('<textarea>', {class: 'col-8 col-md-10 description', rows: '3'});
    let eventSaveBtn = $('<button class="btn saveBtn col-2 col-md-1" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button>');

    //Set currentHour and contaier id.
    let currentHour = workDayHours[i];
    blockContainerEl.attr('id','hour-'+currentHour)
    if (currentHour > 12){
      currentHour -= 12
    }
    
    //Show hour block text
    eventHourEl.text(currentHour + isAmOrPm(currentHour));

    //TODO: Show event block text. update the text when added or retrieve the saved text from local storage

    //TODO: Check if currentHour matches the time of day shown at top of screen.
      //yes add id of present
      //hasnt happend add id of future
      //already happend add id of past

    //Append elements to screen
    blockContainerEl.append([eventHourEl,eventTextEl,eventSaveBtn])
    allBlocks.append(blockContainerEl)
    
  }
}
$(function () {
  
  createTimeBlockElements();

});
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

