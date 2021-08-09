// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('extension "vscheck-vue-style-scoped" is now active!');

	vscode.workspace.onDidChangeTextDocument((e) => {
    const langId = vscode.window.activeTextEditor?.document.languageId;
		const bar = null;

    if (langId === 'vue' && !pass()) {
			vscode.window.showWarningMessage('vue 组件 <style> 需要添加 scoped.');
    }
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}

function pass() {
	const editor = vscode.window.activeTextEditor;

	if (!editor) return true;

	const text = editor.document.getText();
	const style = text?.match(/<style[^>]*>/ig);

	if(style) {
    let scoped = style.some((s) => {
      return s.indexOf('scoped') > -1;
    });

    return scoped;
  }

	return true;
}