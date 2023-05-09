import type { ExtensionContext } from "vscode";
import { commands, window } from "vscode";
import yaml from "yaml";

function convertCommand(converter: (text: string) => string) {
    return async () => {
        const editor = window.activeTextEditor;
        if (!editor) {
            return;
        }

        await editor.edit((editBuilder) => {
            editor.selections.forEach((selection) => {
                const text = editor.document.getText(selection);

                editBuilder.replace(selection, converter(text));
            });
        });
    };
}

// TODO: add validation (can probably just do nothing if text is invalid for the given format...)
export function activate(context: ExtensionContext) {
    context.subscriptions.push(
        commands.registerCommand(
            "convert.jsonToYaml",
            // TODO: would be nice to use json5 so comments don't break things
            // TODO: ^ if possible preserve comments too...
            convertCommand((text) => {
                const res: unknown = JSON.parse(text);
                if (res === undefined) {
                    // TODO: error instead?
                    return text;
                }

                return yaml.stringify(res);
            }),
        ),
        commands.registerCommand(
            "convert.yamlToJson",
            convertCommand((text) => {
                const res: unknown = yaml.parse(text);
                if (res === undefined) {
                    // TODO: error instead?
                    return text;
                }

                return JSON.stringify(res, null, 4);
            }),
        ),
    );
}
