import { paragraphs } from './paragraph.js';
const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
timeTag =  document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistakes span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
tryAgainBtn = document.querySelector("button");

import posthog from 'posthog-js';

posthog.init('phc_BhcKkSq9sLgM3DdFarnwMUGB4cn3dNp8LBzSLAkUxX6x', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only', // або 'always' для анонімних користувачів
    capture_pageview: true,
    persistence: 'localStorage',
});

import * as Sentry from "@sentry/browser";
Sentry.init({
  dsn: "https://24b83f829f2d8406e206239bdc6e8b0b@o4511161083035648.ingest.de.sentry.io/4511161086115920",
  
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(), // Додає запис сесій 
  ],
  environment: "development",
  tracePropagationTargets: ["localhost", /^https:\/\/your-app\.github\.io/], 
  tracesSampleRate: 1.0,
  // Налаштування реплеїв (запису екрану)
  replaysSessionSampleRate: 0.1, // 10% звичайних сесій
  replaysOnErrorSampleRate: 1.0, // 100% сесій, де сталася помилка

  sendDefaultPii: true,
});

Sentry.setUser({
  id: "12345",
  email: "student@example.com",
  segment: "premium_user" // Приклад кастомного тегу для сегментації
  });

// myUndefinedFunction();
// myUndefinedFunction2();

// posthog.onFeatureFlags(() => {
//   // Перевіряємо, чи увімкнено прапорець 'show-urgent-filter' у кабінеті PostHog
//   if (posthog.isFeatureEnabled('show-urgent-filter')) {
//       const btn = document.getElementById('urgent-btn');
//       if (btn) {
//           btn.style.display = 'block'; // Показуємо кнопку, якщо прапорець активний
//           console.log('Feature flag active: Showing urgent button');
//       }
//   } else {
//       console.log('Feature flag inactive');
//   }
// });
// // const appStatus = import.meta.env.VITE_APP_STATUS || "local";
// const statusElement = document.querySelector("#env-status");

// if (appStatus) {
//   statusElement.innerText = `Mode: ${appStatus}`;
//   statusElement.style.color = appStatus === "Development" ? "orange" : "green";
// }

// let paragraphsArray;
// if (typeof module !== 'undefined' && typeof require !== 'undefined') {
//     paragraphsArray = require("./paragraph").paragraphs;
// } else {
//     paragraphsArray = window.paragraphs;
// }

let timer;
let maxTime = 60;
let timeLeft = maxTime;

let charIndex = 0;
let mistakes = 0;
let isTyping = false;

function randomParagraph() {
     if (!typingText) return;
     let randIndex = Math.floor(Math.random() * paragraphs.length);
     typingText.innerHTML = "";
     paragraphs[randIndex].split("").forEach(span => {
         let spanTag = `<span>${span}</span>`;
         typingText.innerHTML += spanTag;
     });
     typingText.querySelectorAll("span")[0].classList.add("active");

    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
    //console.log(paragraphs[randIndex])
}

  function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length-1 &&  timeLeft > 0){
      if(!isTyping){
        timer = setInterval(initTimer, 1000);
        isTyping = true;
      }
      if(typedChar == null){
          charIndex--;
         if(characters[charIndex].classList.contains("incorrect")){
          mistakes--;
         }
          characters[charIndex].classList.remove("correct","incorrect");
      } else{
  
        if(characters[charIndex].innerText === typedChar){
          //console.log("correct");
           characters[charIndex].classList.add("correct");
        }
       else{
        mistakes++;
           characters[charIndex].classList.add("incorrect");
  //console.log("incorrect");
     }     
  charIndex++;
      }
  characters.forEach(span => span.classList.remove("active"));
  characters[charIndex].classList.add("active");
  
  let wpm = Math.round((((charIndex - mistakes) /5) / (maxTime - timeLeft)) * 60);
  wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
  mistakeTag.innerText = mistakes;
  wpmTag.innerText = wpm;
  cpmTag.innerText = charIndex - mistakes;
    }else{
      inpField.value = "";
        clearInterval(timer);
    }
 }

 function initTimer() {
  if(timeLeft>0){
    timeLeft--;
    timeTag.innerText = timeLeft;
  }
  else{
    clearInterval(timer);
  }
 }

 function resetGame(){
  randomParagraph();
  inpField.value = "";
        clearInterval(timer);
  timeLeft = maxTime,
  charIndex = mistakes = isTyping = 0;
  timeTag.innerHTML = timeLeft;
  mistakeTag.innerText = mistakes;
  wpmTag.innerText = 0;
  cpmTag.innerText = 0;

  posthog.capture('task_created', {
    priority: 'high',
    category: 'typing_test',
    is_authenticated: false // якщо у тебе немає логіна
});
 }

randomParagraph();
if (inpField) {
  inpField.addEventListener("input", initTyping);
}
if (tryAgainBtn) {
  tryAgainBtn.addEventListener("click", resetGame);
}

