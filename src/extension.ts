import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "personalkit" is now active!');

  let salary = 0;
  let salaryStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  salaryStatusBarItem.text = `当前薪资：${salary}`;
  salaryStatusBarItem.show();
  context.subscriptions.push(salaryStatusBarItem);

  let disposable = vscode.commands.registerCommand(
    "personalkit.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello World from PersonalKit!");
    }
  );

  context.subscriptions.push(disposable);
  
  setInterval(() => {
    salary += 100; // 按照你的需求调整这个值
    salaryStatusBarItem.text = `当前薪资：${salary}`;
  }, 1000); // 按照你的需求调整这个值
}

export function deactivate() {}
