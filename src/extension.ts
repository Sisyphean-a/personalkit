import * as vscode from "vscode";
import { disposable } from "./commands/helloWorld";
import {
  salaryStatusBarItem,
  initStatusBarItem,
} from "./views/salaryStatusBarItem";

export function activate(context: vscode.ExtensionContext) {
  // 注册 helloWorld 命令
  context.subscriptions.push(disposable);

  //   初始化状态栏
  initStatusBarItem();
  //   注册状态栏
  context.subscriptions.push(salaryStatusBarItem);
}

export function deactivate() {}
