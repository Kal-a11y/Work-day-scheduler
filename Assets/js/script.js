// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const workDayHours = [9, 10, 11, 12, 13, 14, 15, 16, 17] //hours in 24 hour time

function isAmOrPm(hour) {
  let meridiem;
  if (hour <= 11) {
    meridiem = "AM"
  } else if (hour >= 12 && hour <= 24) {
    meridiem = "PM"
  } else {
    console.log('invalide time')
  }
  return meridiem
}

function createTimeBlockElements() {
  //Element that holds all time blocks
  let allBlocks = $('#time-blocks')

  for (var i = 0; i < workDayHours.length; i++) {
    //Create elements
    let blockContainerEl = $('<div>', { class: 'row time-block' });
    let eventHourEl = $('<div>', { class: 'col-2 col-md-1 hour text-center py-3' });
    let eventTextEl = $('<textarea>', { class: 'col-8 col-md-10 description', rows: '3' });
    let eventSaveBtn = $('<button class="btn saveBtn col-2 col-md-1" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button>');

    //Set currentHour, id, and text
    let currentHour = workDayHours[i];
    blockContainerEl.attr('id', 'hour-' + currentHour)
    if (currentHour > 12) {
      eventHourEl.text((currentHour - 12) + isAmOrPm(currentHour));
    } else {
      eventHourEl.text(currentHour + isAmOrPm(currentHour));
    }

    //Append elements to screen
    blockContainerEl.append([eventHourEl, eventTextEl, eventSaveBtn])
    allBlocks.append(blockContainerEl)

  }
}

function updateWithCurrentTimeState(currentTimeState) {
  for (let index = 0; index < workDayHours.length; index++) {
    //Get element and its hour
    let elementHour = workDayHours[index]
    let myTime = $('#hour-' + elementHour);


    //Update classes
    if (elementHour == currentTimeState) {
      myTime.addClass('present')
      myTime.removeClass('past future')
    } else if (elementHour > currentTimeState) {
      myTime.addClass('future')
      myTime.removeClass('past present')
    } else {
      myTime.addClass('past')
      myTime.removeClass('present future')
    }

  }
}

function renderEventText() {
  for (let index = 0; index < workDayHours.length; index++) {
    //Get elements
    let timeBlock = $('#hour-' + workDayHours[index]);
    let eventText = $(timeBlock).children('.description')

    //Retrive from storage
    let storedEvent = localStorage.getItem('hour-' + workDayHours[index] + '-event')
    if (storedEvent != null) {
      eventText.val(storedEvent);
    }
  }
}

$(function () {

  createTimeBlockElements();
  renderEventText();

  //Display current day
  const currentDayElement = $('#currentDay');
  const currentDay = dayjs();
  currentDayElement.text(currentDay.format('dddd, MMMM D') + 'th');

  //Get all saveBnts
  const saveBtns = $('#time-blocks').children().children('button');


  //Add event with saveBtn
  saveBtns.on('click', function () {
    //Get elements
    let timeBlock = $(this).parent('.time-block')
    let eventText = $(timeBlock).children('.description').val();

    //Set event in storage
    localStorage.setItem(timeBlock.attr('id') + '-event', eventText);
    renderEventText();

    //Display that appointment was set
    let hourText = $(timeBlock).children('.hour').text()
    let apppointmentConfirmation = $('<p>').text('Your ' + hourText + ' appointment has been added ✅')
    let timeDisplayed = 5;
    $('header').append(apppointmentConfirmation)
    let displayAppointmentConfirmation = setInterval(function () {
      timeDisplayed--;

      if (timeDisplayed <= 0) {
        clearInterval(displayAppointmentConfirmation);
        apppointmentConfirmation.fadeOut()
      }
    }, 1000)
  })

  updateWithCurrentTimeState(currentDay.format('H'));
});


