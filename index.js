/* Your Code Here */
function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  function createEmployeeRecords(arrays) {
    const newArr = arrays.map((array) => {
      return createEmployeeRecord(array);
    });
    return newArr;
  }
  function createTimeInEvent(timeStamp) {
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(timeStamp.slice(timeStamp.indexOf(" ") + 1)),
      date: timeStamp.slice(0, timeStamp.indexOf(" ")),
    });
    return this;
  }
  function createTimeOutEvent(timeStamp) {
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(timeStamp.slice(timeStamp.indexOf(" ") + 1)),
      date: timeStamp.slice(0, timeStamp.indexOf(" ")),
    });
    return this;
  }
  function hoursWorkedOnDate(timeStamp) {
    const indate = this.timeInEvents.find((timeInEvent) => {
      return timeInEvent.date === timeStamp;
    });
    const outdate = this.timeOutEvents.find((timeInEvent) => {
      return timeInEvent.date === timeStamp;
    });
    let hour1 = 0;
    let hour2 = 0;
    hour2 = parseInt(outdate.hour.toString().slice(0, 2));
    hour1 = parseInt(indate.hour.toString().slice(0, 2));
    if (outdate.hour.toString().length === 3) {
      hour2 = parseInt(outdate.hour.toString().slice(0, 1));
    }
    if (indate.hour.toString().length === 3) {
      hour1 = parseInt(indate.hour.toString().slice(0, 1));
    }
    return hour2 - hour1;
  }
  function wagesEarnedOnDate(timeStamp) {
    const result = hoursWorkedOnDate.call(this, timeStamp);
    return result * this.payPerHour;
  }
  function findEmployeeByFirstName(arrayOfEmployes, fName) {
    const result = arrayOfEmployes.find((e) => e.firstName === fName);
    return result;
  }
  
  const allWagesFor = function () {
      const eligibleDates = this.timeInEvents.map(function (e) {
          return e.date
      })
    let sum = 0;
  
      const payable = eligibleDates.reduce(function (memo, d) {
          return memo + wagesEarnedOnDate.call(this, d)
      }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
    this.timeInEvents.map((day) => {
      sum += wagesEarnedOnDate.call(this, day.date);
    });
    return sum;
    
      return payable
  };
  function calculatePayroll(array) {
    let sum = 0;
    array.map((person) => {
      sum += allWagesFor.call(person);
    });
    return sum;
  }


