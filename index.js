const currentDate = document.querySelector(".current__date");
const daysTags = document.querySelector(".days");
const prevTags = document.querySelectorAll(".icons .fa-solid");
// getting new date current year and month

let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCalendar = () => {
  //Getting the first day of month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  console.log(firstDayOfMonth);
 
  let liTag = "";

  // Getting the last date of the current month
  const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  //Getting last date of previous month
  const lastDateOfPreviousMonth = new Date(
    currentYear,
    currentMonth,
    0
  ).getDate();

  //Getting last day of  month
  const lastDayOfMonth = new Date(
    currentYear,
    currentMonth,
    lastDateOfPreviousMonth
  ).getDay();

  for (let i = firstDayOfMonth; i > 0; i--) {
    // creating li of previous months last days
    liTag += `<li class='inactive'>${lastDateOfPreviousMonth - i + 1}</li>`;
  }


  for (let i = 1; i <= lastDateOfMonth; i++) {
    // creating li of all days of current month
    let isToday =
      i === date.getDate() &&
      currentMonth === date.getMonth() &&
      currentYear === date.getFullYear()
        ? "active"
        : "";
    liTag += `<li class=${isToday}>${i}</li>`;
  }

  for (let i = lastDayOfMonth; i < 6; i++) {
    // creating li of next months first days
    // It helps determine how many days from the next month need to be displayed to complete the last week of the current month in the calendar.
    liTag += `<li class='inactive'>${i - lastDayOfMonth + 1}</li>`;
  }

  // Updating the HTML content with the current month and year
  currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
  daysTags.innerHTML = liTag;
};

// Initial rendering
renderCalendar();

prevTags.forEach((icon) => {
  // adding click events to bogh icons
  icon.addEventListener("click", (e) => {
    currentMonth = e.target.id === "prev" ? currentMonth - 1 : currentMonth + 1;
    if (currentMonth < 0 || currentMonth > 11) {
      // currentMonth===-1 date=new Date(2024,-1) so it will return 2023 date
      // else currentMonth===12 date=new Date(2024,12) so it will return 2025 date
      date = new Date(currentYear, currentMonth);
      currentYear = date.getFullYear();
      currentMonth = date.getMonth();
      console.log(date);
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});
