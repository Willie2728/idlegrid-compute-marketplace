(()=>{
  const audio=document.querySelector('#replyAudio'),play=document.querySelector('#playVoice'),stop=document.querySelector('#stopVoice'),orb=document.querySelector('#voiceOrb'),status=document.querySelector('#voiceStatus');
  if(!audio||!play||!stop||!orb)return;
  const start=async()=>{try{window.speechSynthesis?.cancel();await audio.play()}catch(error){status.textContent='Playback was blocked. Use the audio player directly above.'}};
  const halt=()=>{audio.pause();audio.currentTime=0;orb.classList.remove('speaking');play.textContent='▶ Play reply';status.textContent='Stopped. Press Play to listen again.'};
  play.onclick=()=>audio.paused?start():audio.pause();orb.onclick=()=>audio.paused?start():audio.pause();stop.onclick=halt;
  audio.onplay=()=>{orb.classList.add('speaking');play.textContent='❚❚ Pause';status.textContent='Playing with Microsoft David Desktop…'};
  audio.onpause=()=>{orb.classList.remove('speaking');play.textContent='▶ Play reply';if(audio.currentTime>0&&audio.currentTime<audio.duration)status.textContent='Paused.'};
  audio.onended=()=>{orb.classList.remove('speaking');play.textContent='▶ Play again';status.textContent='Finished reading the reply.'};
  audio.onerror=()=>status.textContent='The audio file could not load. Refresh the page and try again.';
})();
