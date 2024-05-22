import * as vscode from "vscode";
import { TodoDataProvider } from "../views/todoTreeView";

const todoDataProvider = new TodoDataProvider();

export let todoTreeView = vscode.window.registerTreeDataProvider(
  "todoTreeView",
  todoDataProvider
);

async function addTodo() {
  const todo = await vscode.window.showInputBox({
    prompt: "新增todo",
  });
  if (todo) {
    todoDataProvider.addTodo(todo);
  }
}

export let addTodoCommand = vscode.commands.registerCommand(
  "extension.addTodo",
  addTodo
);

async function renameTodo() {
  const oldTodo = await vscode.window.showInputBox({
    prompt: "要重命名的todo",
  });
  if (oldTodo) {
    const newTodo = await vscode.window.showInputBox({
      prompt: "重命名todo",
    });
    if (newTodo) {
      todoDataProvider.renameTodo(oldTodo, newTodo);
    }
  }
}

export let renameTodoCommand = vscode.commands.registerCommand(
  "extension.renameTodo",
  renameTodo
);

async function deleteTodo() {
  const todo = await vscode.window.showInputBox({
    prompt: "新增todo",
  });
  if (todo) {
    todoDataProvider.deleteTodo(todo);
  }
}

export let deleteTodoCommand = vscode.commands.registerCommand(
  "extension.deleteTodo",
  deleteTodo
);
