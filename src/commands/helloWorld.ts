import * as vscode from "vscode";

function helloWorld() {
  vscode.window.showInformationMessage("Hello World from PersonalKit!");
}

export let disposable = vscode.commands.registerCommand(
  "personalkit.helloWorld",
  helloWorld
);
