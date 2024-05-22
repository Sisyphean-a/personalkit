import * as vscode from "vscode";
import { disposable } from "./commands/helloWorld";
import {
  todoTreeView,
  addTodoCommand,
  renameTodoCommand,
} from "./commands/todo";
import {
  salaryStatusBarItem,
  initStatusBarItem,
} from "./views/salaryStatusBarItem";

export function activate(context: vscode.ExtensionContext) {
  // 注册 helloWorld 命令
  context.subscriptions.push(disposable);
  // 注册 todoTreeView 视图
  context.subscriptions.push(todoTreeView);
  // 注册 addTodo 命令
  context.subscriptions.push(addTodoCommand);
  // 注册 renameTodo 命令
  context.subscriptions.push(renameTodoCommand);

  //   初始化状态栏
  initStatusBarItem();
  //   注册状态栏
  context.subscriptions.push(salaryStatusBarItem);
}

export function deactivate() {}
