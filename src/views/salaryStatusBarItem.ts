import * as vscode from "vscode";

const SECONDS_PER_HOUR = 60 * 60;

let salaryConfig = vscode.workspace.getConfiguration("personalkit.salary");
let monthlySalary: number = salaryConfig.get("monthlySalary") || 10000;
let workStartTime: number = salaryConfig.get("workStartTime") || 9;
let workEndTime: number = salaryConfig.get("workEndTime") || 18;
let totalWorkDays: number = salaryConfig.get("totalWorkDays") || 22;

let dailySalary = monthlySalary / totalWorkDays;
let workHoursPerDay = workEndTime - workStartTime;
let secondsPerDay = workHoursPerDay * SECONDS_PER_HOUR;
let secondSalary = dailySalary / secondsPerDay;

let currentSalary = 0;

export let salaryStatusBarItem = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Right,
  100
);

function calculateAndDisplaySalary() {
  let now = new Date();
  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();
  let currentSecond = now.getSeconds();
  if (currentHour >= workStartTime && currentHour < workEndTime) {
    let secondsWorkedToday =
      (currentHour - workStartTime) * SECONDS_PER_HOUR +
      currentMinute * 60 +
      currentSecond;
    currentSalary = secondsWorkedToday * secondSalary;
  } else if (currentHour >= workEndTime) {
    currentSalary = secondsPerDay * secondSalary;
  } else {
    currentSalary = 0;
  }
  salaryStatusBarItem.text = `今日薪资：${currentSalary.toFixed(2)}`;
  salaryStatusBarItem.show();
}

export function initStatusBarItem() {
  calculateAndDisplaySalary();
  setInterval(() => {
    let now = new Date();
    let currentHour = now.getHours();
    if (currentHour >= workStartTime && currentHour < workEndTime) {
      currentSalary += secondSalary;
      salaryStatusBarItem.text = `今日薪资：${currentSalary.toFixed(2)}`;
    }
  }, 1000);
}

vscode.workspace.onDidChangeConfiguration((event) => {
  if (
    event.affectsConfiguration("personalkit.salary.monthlySalary") ||
    event.affectsConfiguration("personalkit.salary.workStartTime") ||
    event.affectsConfiguration("personalkit.salary.workEndTime") ||
    event.affectsConfiguration("personalkit.salary.totalWorkDays")
  ) {
    salaryConfig = vscode.workspace.getConfiguration("personalkit.salary");
    monthlySalary = salaryConfig.get("monthlySalary") || 10000;
    workStartTime = salaryConfig.get("workStartTime") || 9;
    workEndTime = salaryConfig.get("workEndTime") || 18;
    totalWorkDays = salaryConfig.get("totalWorkDays") || 22;
    dailySalary = monthlySalary / totalWorkDays;
    workHoursPerDay = workEndTime - workStartTime;
    secondsPerDay = workHoursPerDay * SECONDS_PER_HOUR;
    secondSalary = dailySalary / secondsPerDay;
    calculateAndDisplaySalary();
  }
});