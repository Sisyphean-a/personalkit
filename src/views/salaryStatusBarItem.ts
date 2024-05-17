import * as vscode from "vscode";

const SECONDS_PER_HOUR = 60 * 60;

// 月薪
let monthlySalary: number;
// 上班时间
let workStartTime: number;
// 下班时间
let workEndTime: number;
// 每月工作天数
let totalWorkDays: number;
// 每日工资
let dailySalary: number;
// 每日工作时长
let workHoursPerDay: number;
// 每日工作秒数
let secondsPerDay: number;
// 每秒工资
let secondSalary: number;

// 当前的工资
let currentSalary = 0;

/**
 * description: 计算每秒工资
 */
function calculateSalary() {
  // 获取配置
  let salaryConfig = vscode.workspace.getConfiguration("personalkit.salary");
  monthlySalary = salaryConfig.get("monthlySalary") || 10000;
  workStartTime = salaryConfig.get("workStartTime") || 9;
  workEndTime = salaryConfig.get("workEndTime") || 18;
  totalWorkDays = salaryConfig.get("totalWorkDays") || 22;
  // 计算每日工资、每日工作时长、每日工作秒数、每秒工资
  dailySalary = monthlySalary / totalWorkDays;
  workHoursPerDay = workEndTime - workStartTime;
  secondsPerDay = workHoursPerDay * SECONDS_PER_HOUR;
  secondSalary = dailySalary / secondsPerDay;
}

/**
 * description: 计算已工作的秒数
 * @return {number} 返回已工作的秒数
 */
function calculateWorkedSeconds(): number {
  let now = new Date();
  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();
  let currentSecond = now.getSeconds();
  if (currentHour >= workStartTime && currentHour < workEndTime) {
    return (
      (currentHour - workStartTime) * SECONDS_PER_HOUR +
      currentMinute * 60 +
      currentSecond
    );
  } else if (currentHour >= workEndTime) {
    return secondsPerDay;
  } else {
    return 0;
  }
}

/**
 * description: 更新状态栏
 */
function updateStatusBar() {
  salaryStatusBarItem.text = `今日薪资：${currentSalary.toFixed(2)}`;
  salaryStatusBarItem.show();
}

/**
 * description: 监听配置变化
 * @param {vscode.ConfigurationChangeEvent} event
 * @return {*}
 */
vscode.workspace.onDidChangeConfiguration((event) => {
  if (event.affectsConfiguration("personalkit.salary")) {
    calculateSalary();
    currentSalary = calculateWorkedSeconds() * secondSalary;
    updateStatusBar();
  }
});

// 创建状态栏项
export let salaryStatusBarItem = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Right,
  100
);

/**
 * description: 初始化状态栏项
 */
export function initStatusBarItem() {
  calculateSalary();
  currentSalary = calculateWorkedSeconds() * secondSalary;
  updateStatusBar();
  setInterval(() => {
    let now = new Date();
    let currentHour = now.getHours();
    if (currentHour >= workStartTime && currentHour < workEndTime) {
      currentSalary += secondSalary;
      updateStatusBar();
    }
  }, 1000);
}
