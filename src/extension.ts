import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.removeConsoleLogs', () => {
        vscode.workspace.textDocuments.forEach(async (document) => {
    
            const regex = /console\.log\s*\(([^)]+)\);?/g;

            const updatedContent = document.getText().replace(regex, '');

            const edit = new vscode.WorkspaceEdit();
            edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), updatedContent);
            await vscode.workspace.applyEdit(edit);

            await document.save();
        });
        vscode.window.showInformationMessage('Removed all console.log statements.');
    });

    context.subscriptions.push(disposable);
}
