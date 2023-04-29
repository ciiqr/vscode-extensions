import type { ExtensionContext } from "vscode";
import { commands, window } from "vscode";

export function activate(context: ExtensionContext) {
    context.subscriptions.push(
        window.onDidChangeTextEditorVisibleRanges(async (e) => {
            // TODO:
            await window.showInformationMessage(`ugh: ${JSON.stringify(e)}`);
        }),
        commands.registerCommand("fold-comments.toggle", () => {
            const editor = window.activeTextEditor;
            if (!editor) {
                return;
            }

            // TODO:
            console.log("");
        }),
        commands.registerCommand("fold-comments.fold", async () => {
            const editor = window.activeTextEditor;
            if (!editor) {
                return;
            }

            // TODO:
            console.log("");
            // TODO: only required to loop if theres no better way to handle the
            // - folding (otherwise can pass all to setDecorations)
            editor.selections.forEach((s) => {
                const foldedDecoration = window.createTextEditorDecorationType({
                    before: {
                        // TODO: not sure if this is enough
                        // TODO: definitely still breaks if we end in the middle of a line...
                        // - if just folding comments will only matter for inline comments...
                        contentText: s.isSingleLine
                            ? "┄" // "…" // "***"
                            : undefined,
                        color: "#E6DB74",
                        backgroundColor: "#444",
                        border: "1px dotted",
                        borderColor: "#88846f",
                    },
                    // after: {},
                    textDecoration: "none; display: none;",
                    // cursor: "pointer",
                });
                editor.setDecorations(foldedDecoration, [s]);
            });
            await commands.executeCommand(
                "editor.createFoldingRangeFromSelection",
            );
        }),
        commands.registerCommand("fold-comments.unfold", () => {
            const editor = window.activeTextEditor;
            if (!editor) {
                return;
            }

            // TODO:
            console.log("");
        }),
    );
}
