import type { ExtensionContext, TextLine } from "vscode";
import { env, commands, window } from "vscode";

export function activate(context: ExtensionContext) {
    context.subscriptions.push(
        commands.registerCommand("paste-indented.paste", async () => {
            const editor = window.activeTextEditor;
            if (!editor) {
                return;
            }

            const clipboardLines = (await env.clipboard.readText()).split("\n");

            if (clipboardLines.length === editor.selections.length) {
                // one clipboard line per selection
                await editor.edit((editBuilder) => {
                    editor.selections.forEach((selection, i) => {
                        const clipboardLine = clipboardLines[i];
                        if (clipboardLine === undefined) {
                            throw new Error(
                                "Unreachable: clipboard/selection counts matched",
                            );
                        }

                        const line = editor.document.lineAt(selection.start);
                        const text = indentToMatchLine([clipboardLine], line);

                        editBuilder.replace(selection, text);
                    });
                });
            } else {
                // whole clipboard into each selection
                await editor.edit((editBuilder) => {
                    editor.selections.forEach((selection) => {
                        const line = editor.document.lineAt(selection.start);
                        const text = indentToMatchLine(clipboardLines, line);

                        editBuilder.replace(selection, text);
                    });
                });
            }
        }),
    );
}

function indentToMatchLine(textLines: string[], line: TextLine) {
    const indent = line.text.slice(0, line.firstNonWhitespaceCharacterIndex);

    return textLines
        .map((line, i) => (i === 0 || line === "" ? line : indent + line))
        .join("\n");
}
