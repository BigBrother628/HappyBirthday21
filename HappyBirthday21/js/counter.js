function initCounter() {
  const startDate = new Date(2021, 11, 21, 0, 0, 0);
  const birthdayDate = new Date(2005, 5, 21);

  function update() {
    const now = new Date();
    const diff = now - startDate;

    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    const years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    if (now.getDate() < startDate.getDate()) months--;
    if (months < 0) { months += 12; }

    const seconds = totalSeconds % 60;
    const minutes = totalMinutes % 60;
    const hours = totalHours % 24;

    document.getElementById('counter-years').textContent = years;
    document.getElementById('counter-months').textContent = months;
    document.getElementById('counter-days').textContent = totalDays;
    document.getElementById('counter-hours').textContent = hours;
    document.getElementById('counter-minutes').textContent = minutes;
    document.getElementById('counter-seconds').textContent = seconds;

    const bdayThisYear = new Date(now.getFullYear(), 5, 21);
    const bdaysTogether = now >= bdayThisYear
      ? now.getFullYear() - 2022 + 1
      : now.getFullYear() - 2022;

    animateNumber('stat-birthdays', Math.max(0, bdaysTogether));
  }

  function animateNumber(elId, target) {
    const el = document.getElementById(elId);
    const current = parseInt(el.textContent.replace(/\s/g, ''));
    if (current === target) return;
    const step = Math.max(1, Math.ceil(Math.abs(target - current) / 20));
    const next = current < target ? current + step : current - step;
    el.textContent = (Math.abs(next - target) < step ? target : next).toLocaleString();
  }

  update();
  return setInterval(update, 1000);
}
