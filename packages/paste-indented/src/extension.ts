import type { ExtensionContext, TextLine } from "vscode";
import { env, commands, window } from "vscode";

// TODO: determine what other languages aren't handled properly by builtin paste (consider a config option for this)
const supportedLanguages = ["note", "yaml", "python"];

export function activate(context: ExtensionContext) {
    context.subscriptions.push(
        commands.registerCommand("paste-indented.paste", async () => {
            const editor = window.activeTextEditor;
            if (!editor) {
                return;
            }

            if (!supportedLanguages.includes(editor.document.languageId)) {
                return await commands.executeCommand(
                    "editor.action.clipboardPasteAction",
                );
            }

            // TODO: handle tabs... (both for indent size and trimming...)
            const clipboardLines = (await env.clipboard.readText()).split("\n");
            const minIndentSpaces = clipboardLines.reduce(
                (pv, cv, i) =>
                    i === 0 ? pv : Math.min(pv, countIndentation(cv)),
                Number.MAX_SAFE_INTEGER,
            );

            const trimmedClipboardLines = clipboardLines.map((v, i) =>
                i === 0
                    ? v
                    : v.slice(
                          Math.max(
                              0,
                              // TODO: should really be indentSize (once supported)
                              minIndentSpaces - Number(editor.options.tabSize),
                          ),
                      ),
            );

            if (trimmedClipboardLines.length === editor.selections.length) {
                // one clipboard line per selection
                await editor.edit((editBuilder) => {
                    editor.selections.forEach((selection, i) => {
                        const clipboardLine = trimmedClipboardLines[i];
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
                        const text = indentToMatchLine(
                            trimmedClipboardLines,
                            line,
                        );

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

function countIndentation(str: string): number {
    let indentation = 0;

    for (const char of str) {
        if (char === " ") {
            indentation += 1;
        } else {
            break;
        }
    }

    return indentation;
}
