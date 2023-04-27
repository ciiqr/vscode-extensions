import type { ExtensionContext } from "vscode";
import { commands, window } from "vscode";

export function activate(context: ExtensionContext) {
    context.subscriptions.push(
        commands.registerCommand("reindent.reindentTo2", async () => {
            const editor = window.activeTextEditor;
            if (!editor) {
                return;
            }

            await commands.executeCommand("editor.action.indentationToTabs");
            editor.options.tabSize = 2;
            editor.options.indentSize = 2;
            await commands.executeCommand("editor.action.indentationToSpaces");
        }),
        commands.registerCommand("reindent.reindentTo4", async () => {
            const editor = window.activeTextEditor;
            if (!editor) {
                return;
            }

            await commands.executeCommand("editor.action.indentationToTabs");
            editor.options.tabSize = 4;
            editor.options.indentSize = 4;
            await commands.executeCommand("editor.action.indentationToSpaces");
        }),
    );
}
