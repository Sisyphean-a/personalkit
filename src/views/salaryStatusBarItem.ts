import * as vscode from "vscode";

let monthlySalary = 10000; // 月薪
let workStartTime = 9; // 上班时间，以24小时制表示
let workEndTime = 18; // 下班时间，以24小时制表示
let totalWorkDays = 22; // 总工作天数

let dailySalary = monthlySalary / totalWorkDays; // 日薪
let workHoursPerDay = workEndTime - workStartTime; // 每天工作小时数
let secondsPerDay = workHoursPerDay * 60 * 60; // 每天工作秒数
let secondSalary = dailySalary / secondsPerDay; // 秒薪

let salary = 0;
export let salaryStatusBarItem = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Right,
  100
);

export function initStatusBarItem() {
  let now = new Date();
  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();
  let currentSecond = now.getSeconds();
  if (currentHour >= workStartTime && currentHour < workEndTime) {
    let secondsWorkedToday = ((currentHour - workStartTime) * 60 * 60) + (currentMinute * 60) + currentSecond;
    salary = secondsWorkedToday * secondSalary;
  } else {
    salary = 0;
  }
  salaryStatusBarItem.text = `今日薪资：${salary.toFixed(2)}`;
  salaryStatusBarItem.show();
  setInterval(() => {
    let now = new Date();
    let currentHour = now.getHours();
    if (currentHour >= workStartTime && currentHour < workEndTime) {
      salary += secondSalary;
      salaryStatusBarItem.text = `今日薪资：${salary.toFixed(2)}`;
    }
  }, 1000);
}