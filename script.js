const typingText = document.querySelector('.typing-test p')
const input = document.querySelector('.wrapper .input-field')
const time = document.querySelector('.time span b')
const mistakes = document.querySelector('.mistake span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('button');

//set value
let timer;
let maxTime= 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake =0;
let isTyping = false;


function loadParagraph(){
    const paragraph= [ " Avoid daydreaming about the years to come.","You are the most important person in your whole life.","Always be true to who you are, and ignore what other people have to say about you.","Always be true to who you are, and ignore what other people have to say about you.","Only demonstrate your strength when it’s really required","Surround yourself with supportive people. Stay true to your path and take control of your happiness.","Success is about the journey. Enjoy the process and keep improving each day for future achievements.","Happiness comes from within. Appreciate the little things, stay present, and choose peace daily."
];

const randomIndex = Math.floor(Math.random()*paragraph.length);
typingText.innerHTML='';
for(const char of paragraph[randomIndex]){
console.log(char);
typingText.innerHTML+= `<span>${char}</span>`;
}
// typingText.querySelectorAll('span')[0].classList.add('active');
document.addEventListener('keydown',()=>input.focus());
typingText.addEventListener("click",()=>{
    input.focus()})
}

//Handle user input
function initTyping() {
    const chars = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    const isBackspace = event.inputType === 'deleteContentBackward'; // Check if the user pressed backspace

    if (charIndex < chars.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }

        if (isBackspace && charIndex > 0) {
            // Handle backspace: move the index back and reset the styles
            char[charIndex].classList.remove('active', 'incorrect', 'correct');
            charIndex--;
            char[charIndex].classList.remove('correct', 'incorrect');
            char[charIndex].classList.add('active');
        } else {
            if (chars[charIndex].innerText === typedChar) {
                chars[charIndex].classList.add('correct');
            } else {
                mistake++;
                chars[charIndex].classList.add('incorrect');
            }
            charIndex++;

            // Make sure we don't exceed the number of characters
            if (charIndex < chars.length) {
                chars[charIndex].classList.add('active');
            }

            mistakes.innerText = mistake;
            cpm.innerText = charIndex - mistake;
        }
    } else {
        clearInterval(timer);
        input.value = ''; // Clear input when done
    }
}


function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText=timeLeft;
        let wpmVal = Math.round(((charIndex - mistake)/5) /(maxTime - timeLeft)*60);
        wpm.innerText = wpmVal;
    }
    else{
        clearInterval(timer);
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText= timeLeft;
    input.value='';
    charIndex = 0;
    mistake =0;
    isTyping = false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistakes.innerText=0;
}

input.addEventListener("input",initTyping);
btn.addEventListener("click",reset);
loadParagraph();