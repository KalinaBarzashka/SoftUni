function main(steps, lengthFootprint, speedKm)
{
  let totalDistanceM = steps *  lengthFootprint;
  let speedMetersPerHour = speedKm * 1000; //m per hour
  let timeHours = totalDistanceM / speedMetersPerHour;
  let restSec = Math.floor(totalDistanceM / 500) * 60;
  let timeSec = timeHours * 3600 + restSec;

  let timeHr = Math.floor(timeSec / 3600);
  let timeMin = Math.floor(timeSec / 60);
  let finalTimeSec = Math.round(timeSec % 60);
  
  console.log((timeHr < 10 ? "0" : "") + timeHr + ":" + (timeMin < 10 ? "0" : "") + timeMin + ":" + (finalTimeSec < 10 ? "0" : "") + finalTimeSec);
}