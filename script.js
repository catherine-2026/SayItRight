/* JAVASCRIPT WITH ACCENT SWITCHING */
function startAnalysis() {
  const text = document.getElementById('userInput').value.trim();
  const display = document.getElementById('displayArea');
  const accentType = document.querySelector('input[name="accent"]:checked').value; // Get UK or US
  
  if (!text) { display.innerHTML = "Please type something first!"; return; }

  // 1. Highlight Logic (Same as before)
  const words = text.split(/\s+/);
  let outputHtml = "";
  words.forEach(word => {
    const clean = word.toLowerCase().replace(/[^a-z]/g, "");
    const syls = clean.match(/[^aeiouy]*[aeiouy]+(?:[^aeiouy](?![aeiouy]))*/g) || [clean];
    outputHtml += `<div class="word-container">`;
    syls.forEach((s, i) => {
      let stressClass = (syls.length <= 2 && i === 0) || (syls.length > 2 && i === syls.length - 2) ? "is-stressed" : "";
      outputHtml += `<span class="syl ${stressClass}">${s}</span>${i < syls.length - 1 ? "-" : ""}`;
    });
    outputHtml += `</div> `;
  });
  display.innerHTML = outputHtml;

  // 2. Pronunciation Logic (The Accent Part)
  window.speechSynthesis.cancel();
  const msg = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  
  // Find the specific voice
  if (accentType === 'UK') {
    msg.voice = voices.find(v => v.lang.includes('GB') || v.name.includes('Google UK')) || voices[0];
  } else {
    msg.voice = voices.find(v => v.lang.includes('US') || v.name.includes('Google US')) || voices[0];
  }
  
  window.speechSynthesis.speak(msg);
}