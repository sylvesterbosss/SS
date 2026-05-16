var fieldIds = [
  "fullName",
  "email",
  "phone",
  "age",
  "membershipType",
  "startDate",
  "emergencyContact",
  "fitnessGoals"
];

function showError(fieldId, message) {
  var input = document.getElementById(fieldId);
  var errorEl = document.getElementById(fieldId + "Error");
  if (input) input.classList.add("error");
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add("visible");
  }
}

function clearError(fieldId) {
  var input = document.getElementById(fieldId);
  var errorEl = document.getElementById(fieldId + "Error");
  if (input) input.classList.remove("error");
  if (errorEl) errorEl.classList.remove("visible");
}

function clearAllErrors() {
  for (var i = 0; i < fieldIds.length; i++) {
    clearError(fieldIds[i]);
  }
}

function isValidEmail(value) {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value);
}

function isValidPhone(value) {
  var digits = value.replace(/\D/g, "");
  return digits.length === 10 || digits.length === 11;
}

function isValidAge(value) {
  var num = parseInt(value, 10);
  return !isNaN(num) && num >= 16 && num <= 99;
}

function isValidDate(value) {
  var pattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
  return pattern.test(value);
}

function validateForm() {
  clearAllErrors();

  var errors = [];
  var isValid = true;

  var checks = [
    {
      id: "fullName",
      test: function(v) { return v.trim().length >= 2; },
      msg: "Please enter your full name."
    },
    {
      id: "email",
      test: isValidEmail,
      msg: "Enter a valid email address."
    },
    {
      id: "phone",
      test: isValidPhone,
      msg: "Enter a valid US phone number."
    },
    {
      id: "age",
      test: isValidAge,
      msg: "Age must be between 16 and 99."
    },
    {
      id: "membershipType",
      test: function(v) { return v !== ""; },
      msg: "Please select a membership plan."
    },
    {
      id: "startDate",
      test: isValidDate,
      msg: "Enter a valid date (MM/DD/YYYY)."
    },
    {
      id: "emergencyContact",
      test: function(v) { return v.trim().length >= 2; },
      msg: "Please provide an emergency contact."
    },
    {
      id: "fitnessGoals",
      test: function(v) { return v.trim().length >= 10; },
      msg: "Please describe your fitness goals (at least 10 characters)."
    }
  ];

  for (var i = 0; i < checks.length; i++) {
    var check = checks[i];
    var el = document.getElementById(check.id);
    if (!el) continue;

    var value = el.value;

    if (!check.test(value)) {
      showError(check.id, check.msg);
      errors.push(check.id);
      isValid = false;
    }
  }

  if (isValid) {
    var banner = document.getElementById("successBanner");
    if (banner) {
      banner.classList.add("visible");
      banner.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    for (var j = 0; j < fieldIds.length; j++) {
      var field = document.getElementById(fieldIds[j]);
      if (field) {
        if (field.tagName === "SELECT") {
          field.selectedIndex = 0;
        } else {
          field.value = "";
        }
      }
    }
  }
}

for (var k = 0; k < fieldIds.length; k++) {
  (function(id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", function() {
        clearError(id);
      });
    }
  })(fieldIds[k]);
}

// list of workouts/
var workouts = [
  {
    name: "Iron Foundation",
    exercises: [
      "5 x 5 Back Squat @ 80% 1RM",
      "4 x 8 Romanian Deadlift",
      "3 x 10 Goblet Squat",
      "3 x 12 Leg Press"
    ],
    tip: "Drive through your heels on the squat. If your knees cave inward, reduce the load and rebuild from the ground up."
  },
  {
    name: "Upper Push Day",
    exercises: [
      "5 x 5 Bench Press @ 80% 1RM",
      "4 x 10 Incline Dumbbell Press",
      "3 x 12 Overhead Dumbbell Press",
      "3 x 15 Lateral Raises"
    ],
    tip: "Retract your shoulder blades before you unrack. Keeping your upper back tight protects your shoulder joint and improves force transfer."
  },
  {
    name: "Pull Session",
    exercises: [
      "4 x 6 Weighted Pull-Ups",
      "4 x 10 Barbell Row",
      "3 x 12 Cable Row",
      "3 x 15 Face Pulls"
    ],
    tip: "Initiate every pull from the lat, not the bicep. Think about driving your elbows to your hip pockets."
  },
  {
    name: "Deadlift Focus",
    exercises: [
      "5 x 3 Conventional Deadlift @ 85% 1RM",
      "3 x 8 Trap Bar Deadlift",
      "3 x 10 Good Mornings",
      "4 x 12 Hamstring Curls"
    ],
    tip: "Before you pull, push the floor away. The deadlift starts as a leg press — the pull comes after the bar breaks the floor."
  },
  {
    name: "Conditioning Circuit",
    exercises: [
      "4 rounds: 10 Kettlebell Swings + 10 Box Jumps",
      "3 x 500m Rowing Sprint",
      "4 x 20 Assault Bike Sprints (10 sec on / 20 sec off)",
      "3 x 15 Wall Ball Shots"
    ],
    tip: "Rest is part of the workout. Take your prescribed rest periods seriously — compressing them makes conditioning less effective, not more."
  },
  {
    name: "Shoulder & Arms",
    exercises: [
      "4 x 8 Strict Press",
      "3 x 12 Arnold Press",
      "4 x 10 Barbell Curl",
      "4 x 10 Tricep Dips"
    ],
    tip: "On pressing movements, keep your core braced. A soft core bleeds force out of your lift and stresses your lower back unnecessarily."
  }
];

var coachingTips = [
  "Sleep is your most underrated performance tool. Seven to nine hours changes everything.",
  "Consistency beats intensity every time. Show up four days a week for a year — that's the formula.",
  "Track your lifts. If you're not measuring, you're guessing.",
  "Protein at every meal. Shoot for 0.8 to 1 gram per pound of bodyweight.",
  "Warm up with purpose. Ten minutes of focused mobility work prevents weeks of injury recovery."
];

//random workout generator//

function generateWOD() {
  var index = Math.floor(Math.random() * workouts.length);
  var workout = workouts[index];

  var tipIndex = Math.floor(Math.random() * coachingTips.length);

  var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  var today = new Date().getDay();
  var dayName = days[today === 0 ? 6 : today - 1];

  var nameEl = document.getElementById("wodName");
  var dayEl = document.getElementById("wodDay");
  var listEl = document.getElementById("wodList");
  var tipEl = document.getElementById("wodTip");

  if (!nameEl || !listEl) return;

  nameEl.textContent = workout.name;
  dayEl.textContent = dayName + "'s WOD";
  tipEl.textContent = "Coach's Note: " + coachingTips[tipIndex];

  listEl.innerHTML = "";

  for (var i = 0; i < workout.exercises.length; i++) {
    var li = document.createElement("li");
    var numSpan = document.createElement("span");
    numSpan.className = "ex-num";
    numSpan.textContent = "0" + (i + 1);
    li.appendChild(numSpan);
    li.appendChild(document.createTextNode(workout.exercises[i]));
    listEl.appendChild(li);
  }
  //countdown function//
}

function updateCountdown() {
  var target = new Date("July 1, 2026 06:00:00").getTime();
  var now = new Date().getTime();
  var diff = target - now;

  var daysEl = document.getElementById("cdDays");
  var hoursEl = document.getElementById("cdHours");
  var minsEl = document.getElementById("cdMins");
  var secsEl = document.getElementById("cdSecs");

  if (!daysEl) return;

  if (diff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minsEl.textContent = "00";
    secsEl.textContent = "00";
    return;
  }

  var d = Math.floor(diff / (1000 * 60 * 60 * 24));
  var h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  var s = Math.floor((diff % (1000 * 60)) / 1000);

  daysEl.textContent = d < 10 ? "0" + d : d;
  hoursEl.textContent = h < 10 ? "0" + h : h;
  minsEl.textContent = m < 10 ? "0" + m : m;
  secsEl.textContent = s < 10 ? "0" + s : s;
}

if (document.getElementById("cdDays")) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

if (document.getElementById("wodBox")) {
  generateWOD();
}
