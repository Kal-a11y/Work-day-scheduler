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

    //Set currentHour, id, and text
    let currentHour = workDayHours[i];
    blockContainerEl.attr('id','hour-'+currentHour)
    if (currentHour > 12){
      eventHourEl.text((currentHour - 12) + isAmOrPm(currentHour));
    }else{
      eventHourEl.text(currentHour + isAmOrPm(currentHour));
    }
    

    //TODO: Show event block text. update the text when added or retrieve the saved text from local storage
      
    //Append elements to screen
    blockContainerEl.append([eventHourEl,eventTextEl,eventSaveBtn])
    allBlocks.append(blockContainerEl)
      
    }
  }
  
function updateWithCurrentTimeState(currentTimeState){
  for (let index = 0; index < workDayHours.length; index++) {
    let elementHour = workDayHours[index]
    let myTime = $('#hour-'+ elementHour);

    
    
    if (elementHour == currentTimeState){
      myTime.addClass('present')
      myTime.removeClass('past future')
    } else if (elementHour > currentTimeState){
      myTime.addClass('future')
      myTime.removeClass('past present')
    } else{
      myTime.addClass('past')
      myTime.removeClass('present future')
    }
        
  }
}

function renderEventText(){
  //find row by id
  //find row text area
  //set .val to storage
  for (let index = 0; index < workDayHours.length; index++) {
    let timeBlock = $('#hour-'+workDayHours[index]);
    let eventText = $(timeBlock).children('.description')

    // let storedEvent = localStorage.getItem('hour-'+ workDayHours[index] +'event')
    let storedEvent = localStorage.getItem('hour-'+ workDayHours[index] +'-event')
    if (storedEvent != null){
      eventText.val(storedEvent);
    }
    console.log(storedEvent)
    
  }
}

$(function () {
  
  createTimeBlockElements();
  renderEventText();

  //Display current day
  const currentDayElement = $('#currentDay');
  const currentDay = dayjs();
  currentDayElement.text(currentDay.format('dddd, MMMM D') + 'th');

  const saveBtns = $('#time-blocks').children().children('button');

  saveBtns.on('click',function(){
    let timeBlock = $(this).parent('.time-block')
    let eventText = $(timeBlock).children('.description').val();
   
    localStorage.setItem(timeBlock.attr('id')+'-event',eventText);
    renderEventText();
    
    let hourText = $(timeBlock).children('.hour').text()
    let apppointmentConfirmation = $('<p>').text('Your '+ hourText + ' appointment has been added ✅')
    let timeDisplayed = 5;
    $('header').append(apppointmentConfirmation)
    let displayAppointmentConfirmation = setInterval(function(){
      timeDisplayed--;

      if (timeDisplayed <= 0){
        clearInterval(displayAppointmentConfirmation);
        apppointmentConfirmation.fadeOut()
      }
    },1000)
  })
 
  updateWithCurrentTimeState(currentDay.format('H'));
  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  //collect time block by id
  //find button of time block
  //add event listener to button
    //in event listener
    //collect sibling textarea value
    //save sibling value to local storage (id+'event',value)
    //create element to show 'time pm' + 'apppointment added to local storage' +(check emoji)
    //append to header for 5 seconds and then remove
});
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  

