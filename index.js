setInterval(() => {
    d = new Date();
    htime = d.getHours();
    mtime = d.getMinutes();
    stime = d.getSeconds();
    hrotation = 30*htime + mtime/2;
    mrotation = 6*mtime;
    srotation = 6*stime;

    hour.style.transform = `rotate(${hrotation}deg)`;
    minute.style.transform = `rotate(${mrotation}deg)`;
    second.style.transform = `rotate(${srotation}deg)`;
}, 1000);

const hourHand = document.getElementById('hour');
const minuteHand = document.getElementById('minute');
const secondHand = document.getElementById('second');
const alarmHand = document.getElementById('alarm');

let isDragging = false;

alarmHand.addEventListener('mousedown', (e) => {
  isDragging = true;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const clockRect = hourHand.getBoundingClientRect();
    const mouseX = e.clientX - clockRect.left;
    const mouseY = e.clientY - clockRect.top;

    const angle = Math.atan2(mouseY - clockRect.height / 2, mouseX - clockRect.width / 2);
    const rotation = angle * (180 / Math.PI) + 90;

    alarmHand.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
  }
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;

    const alarmRotation = getRotation(alarmHand);
    const hourRotation = getRotation(hourHand);

    const alarmHour = Math.floor(alarmRotation / 30); // Each hour is 30 degrees
    const currentHour = Math.floor(hourRotation / 30);

    if (alarmHour === currentHour) {
      // Trigger your alarm action here
      console.log('Alarm triggered!');
    }
  }
});

function getRotation(element) {
  const transform = window.getComputedStyle(element).getPropertyValue('transform');
  if (transform === 'none') return 0;

  const matrix = transform.split('(')[1].split(')')[0].split(',');
  const a = matrix[0];
  const b = matrix[1];
  const radians = Math.atan2(b, a);
  return radians * (180 / Math.PI);
}