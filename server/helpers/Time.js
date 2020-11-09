const pad = require(`./pad`);
const padZero = (str) => pad(str, -2, `0`);

class Time {
  constructor(date = new Date()) { // Assigns date to the present time by default
    // Date
    this.fullDate = date;
    this.date     = date.getDate();
    this.month    = date.getMonth() + 1; // date.getMonth() counts from 0 because JavaScript
    this.year     = date.getFullYear();

    // Time
    this.hours   = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();

    // Date formatted
    this.slashDate  = `${padZero(this.date)}/${padZero(this.month)}/${this.year}`;
    this.dashDateUS = `${this.year}-${this.month}-${this.date}`;

    // Time formatted
    this.colonTime = `${padZero(this.hours)}:${padZero(this.minutes)}:${padZero(this.seconds)}`;
  }

  // Updates the object. Defaults to update to present time.
  update(date = new Date()) {
    this.constructor(date);
  }
}

module.exports = Time;
