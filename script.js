const textInput = document.getElementById('text-input');
textInput.value = 'Hello world, my name is SkyNet and I am here to destroy you.';

const voiceSelect = document.getElementById('voice-select');
const synth = window.speechSynthesis;
let voices;

function addVoicesToSelect() {
  voices = synth.getVoices();
  console.log('voices', voices);

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement('option');
    option.textContent = `${voices[i].name} - ${voices[i].lang}`;

    if (voices[i].default) {
      option.textContent += ' (DEFAULT)';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
}

function onSubmit(e) {
  e.preventDefault();

  const utterThis = new SpeechSynthesisUtterance(textInput.value);

  const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
  console.log('selectedOption', selectedOption);

  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }

  console.log(utterThis);
  synth.speak(utterThis);
}

addVoicesToSelect();

if(synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = addVoicesToSelect;
}

document.getElementById('form').addEventListener('submit', onSubmit);