import type { ExtensionContext, TextLine } from "vscode";
import { env, commands, window } from "vscode";

export function activate(context: ExtensionContext) {
    context.subscriptions.push(
        commands.registerCommand("paste-indented.paste", async () => {
            const editor = window.activeTextEditor;
            if (!editor) {
                return;
            }

            const clipboardText = await env.clipboard.readText();

            await editor.edit((editBuilder) => {
                editor.selections.forEach((selection) => {
                    const line = editor.document.lineAt(selection.start);
                    const text = indentToMatchLine(clipboardText, line);

                    editBuilder.replace(selection, text);
                });
            });
        }),
    );
}

function indentToMatchLine(text: string, line: TextLine) {
    const indent = line.text.slice(0, line.firstNonWhitespaceCharacterIndex);

    return text
        .split("\n")
        .map((line, i) => (i === 0 || line === "" ? line : indent + line))
        .join("\n");
}
