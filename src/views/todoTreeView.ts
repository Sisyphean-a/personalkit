import * as vscode from "vscode";

/**
 * 表示待办事项的树节点
 */
export class TodoItem extends vscode.TreeItem {
  /**
   * 构造函数
   * @param label 节点显示的文本
   * @param collapsibleState 节点的可折叠状态
   * @param command 节点的命令
   */
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
  }
}

export class TodoDataProvider implements vscode.TreeDataProvider<TodoItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<
    TodoItem | undefined | void
  > = new vscode.EventEmitter<TodoItem | undefined | void>();

  readonly onDidChangeTreeData: vscode.Event<TodoItem | undefined | void> =
    this._onDidChangeTreeData.event;

  private todos: string[] = [];

  /**
   * 获取树节点的显示项
   * @param element 树节点
   * @returns 树节点的显示项
   */
  getTreeItem(element: TodoItem): vscode.TreeItem {
    return element;
  }

  /**
   * 获取树节点的子节点
   * @param element 父节点
   * @returns 子节点的数组
   */
  getChildren(element?: TodoItem): Thenable<TodoItem[]> {
    if (element) {
      return Promise.resolve([]);
    } else {
      return Promise.resolve(
        this.todos.map(
          (todo) =>
            new TodoItem(todo, vscode.TreeItemCollapsibleState.None, {
              command: "extension.todo",
              title: "",
              arguments: [todo],
            })
        )
      );
    }
  }

  /**
   * 添加待办事项
   * @param todo 待办事项
   */
  addTodo(todo: string) {
    this.todos.push(todo);
    this._onDidChangeTreeData.fire();
  }

  /**
   * 删除待办事项
   * @param todo 待办事项
   */
  deleteTodo(todo: string) {
    this.todos = this.todos.filter((t) => t !== todo);
    this._onDidChangeTreeData.fire();
  }

  /**
   * 重命名待办事项
   * @param oldTodo 旧的待办事项
   * @param newTodo 新的待办事项
   */
  renameTodo(oldTodo: string, newTodo: string) {
    const index = this.todos.indexOf(oldTodo);
    if (index > -1) {
      this.todos[index] = newTodo;
      this._onDidChangeTreeData.fire();
    }
  }
}
