/*************************************
 ************ALERT BANNER*************
 *************************************/

const alertBanner = document.getElementById("alert");
const dot = document.querySelector(".dot");
alertBanner.innerHTML = `
<div class="alert-banner">
<p><strong>Alert:</strong> You have <strong>6</strong> overdue tasks to complete.</p>
<p class="alert-banner-close">x</p>
</div>
`;

alertBanner.addEventListener("click", (e) => {
  const element = e.target;
  if (element.classList.contains("alert-banner-close")) {
    alertBanner.style.display = "none";
  }
});

/*************************************
 *********NOTIFICATION BOX************
 *************************************/

const popUp = document.getElementById("pop-up-notification");
const span = document.querySelector(".close");
const bell = document.querySelector("#notifications");
let clicks = 0;

bell.addEventListener("click", () => {
  clicks++;
  if (clicks > 1) {
    popUp.style.display = "none";
  } else {
    popUp.style.display = "block";
    dot.style.display = "none";
  }
});

span.addEventListener("click", () => {
  popUp.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target == popUp) {
    popUp.style.display = "none";
  }
});

/*************************************
 **********TRAFFIC CHART*************
 *************************************/

const trafficCanvas = document.getElementById("traffic-chart");

const chartData = {
  hourly: [0, 750, 1250, 2000, 1000, 1500, 1000, 1750, 1250, 1750, 2250],
  daily: [0, 750, 1250, 1000, 500, 750, 1250, 1750, 1550, 900, 2250],
  weekly: [0, 750, 1250, 1000, 1500, 2000, 1500, 1750, 1250, 1750, 2250],
  monthly: [0, 750, 1250, 1000, 1000, 2100, 1550, 1750, 850, 900, 2250],
};

let trafficData = {
  labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
  datasets: [
    {
      data: chartData["weekly"],
      backgroundColor: "rgba(116, 119, 191, .3)",
      pointBackgroundColor: "rgba(255,255,255,1)",
      pointBorderColor: "rgba(116, 119, 191, 1)",
      borderWidth: 1,
      lineTension: 0,
    },
  ],
};

let trafficOptions = {
  aspectRatio: 2.5,
  animation: {
    duration: 0,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 4,
      hoverRadius: 6,
    },
  },
};

let trafficChart = new Chart(trafficCanvas, {
  type: "line",
  data: trafficData,
  options: trafficOptions,
});

document.querySelector(".traffic-nav").addEventListener("click", (e) => {
  if (e.target.classList.contains("traffic-nav-link")) {
    trafficChart.data.datasets[0].data = chartData[e.target.id];
    trafficChart.update();

    document.querySelector(".traffic-nav .active").classList.remove("active");
    e.target.classList.add("active");
  }
});

/*************************************
 ********DAILY TRAFFIC CHART**********
 *************************************/

const dailyCanvas = document.getElementById("daily-chart");

const dailyData = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [
    {
      label: "# of Hits",
      data: [75, 115, 175, 125, 225, 200, 100],
      backgroundColor: "#7477BF",
      borderWidth: 1,
    },
  ],
};

const dailyOptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  legend: {
    display: false,
  },
};

let dailyChart = new Chart(dailyCanvas, {
  type: "bar",
  data: dailyData,
  options: dailyOptions,
});

/*************************************
 ********MOBILE USERS CHART***********
 *************************************/

const mobileCanvas = document.getElementById("mobile-users-chart");

const mobileData = {
  labels: ["Desktop", "Tablet", "Phones"],
  datasets: [
    {
      label: "# of Users",
      data: [2000, 550, 500],
      borderWidth: 0,
      backgroundColor: ["#7477BF", "#78CF82", "#51B6C8"],
    },
  ],
};

const mobileOptions = {
  legend: {
    position: "right",
    labels: {
      boxWidth: 20,
      fontStyle: "bold",
    },
  },
};

let mobileChart = new Chart(mobileCanvas, {
  type: "doughnut",
  data: mobileData,
  options: mobileOptions,
});

/*************************************
 ********MESSAGING SECTION************
 *************************************/

const user = document.getElementById("userField");
const message = document.getElementById("messageField");
const send = document.getElementById("send");

send.addEventListener("click", () => {
  if (user.value === "" && message.value === "") {
    alert("Please fill out user and message fields before sending");
  } else if (user.value === "") {
    alert("Please fill out user field before sending");
  } else if (message.value === "") {
    alert("Please fill out message field before sending");
  } else {
    alert(`Message successfully sent to: ${user.value}`);
  }
});

/*************************************
 *******AUTOCOMPLETE FUNCTION*********
 *************************************/
$(function () {
  let availableTags = ["Dale Byrd", "Dawn Wood", "Dan Oliver", "Victoria Chambers"];
  $("#userField").autocomplete({
    source: availableTags,
  });
});

/*************************************
 *****SAVING SETTINGS PREFERENCES*****
 *************************************/

const email = document.getElementById("email");
const profile = document.getElementById("profile");
const timezone = document.getElementById("timezone");

const emailCheckbox = localStorage.getItem("emailCheckbox");
const profileCheckbox = localStorage.getItem("profileCheckbox");

const loadSettings = function () {
  if (emailCheckbox !== null) {
    email.checked = emailCheckbox === "true";
  }
  if (profileCheckbox !== null) {
    profile.checked = profileCheckbox === "true";
  }
  const selectTimezone = localStorage.getItem("selectTimezone");
  timezone.selectedIndex = localStorage.getItem("selectTimezone");
};

function testStorage() {
  const test = "test";
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

if (testStorage() === true) {
  document.getElementById("save").addEventListener("click", function () {
    localStorage.setItem("emailCheckbox", email.checked);
    localStorage.setItem("profileCheckbox", profile.checked);
    localStorage.setItem("selectTimezone", timezone.selectedIndex);
    alert("Settings successfully saved!");
  });

  document.getElementById("cancel").addEventListener("click", function () {
    const cancel = confirm("Are you sure you want to cancel changes?");

    if (cancel) {
      localStorage.setItem("emailCheckbox", (email.checked = null));
      localStorage.setItem("profileCheckbox", (profile.checked = null));
      localStorage.setItem("selectTimezone", (timezone.selectedIndex = 0));
    }
  });
  loadSettings();
}
