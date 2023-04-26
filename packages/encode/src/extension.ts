import { createHash } from "crypto";
import type { ExtensionContext } from "vscode";
import { commands, window } from "vscode";

function encodeCommand(encoder: (text: string) => string) {
    return async () => {
        const editor = window.activeTextEditor;

        await editor?.edit((editBuilder) => {
            editor.selections.forEach((selection) => {
                const text = editor.document.getText(selection);

                editBuilder.replace(selection, encoder(text));
            });
        });
    };
}

// TODO: add validation (can probably just do nothing if text is invalid for the given format...)
export function activate(context: ExtensionContext) {
    context.subscriptions.push(
        commands.registerCommand(
            "encode.hashMd5",
            encodeCommand((text) =>
                createHash("md5").update(text).digest("hex"),
            ),
        ),
        commands.registerCommand(
            "encode.hashSha1",
            encodeCommand((text) =>
                createHash("sha1").update(text).digest("hex"),
            ),
        ),
        commands.registerCommand(
            "encode.hashSha256",
            encodeCommand((text) =>
                createHash("sha256").update(text).digest("hex"),
            ),
        ),
        commands.registerCommand(
            "encode.hashSha512",
            encodeCommand((text) =>
                createHash("sha512").update(text).digest("hex"),
            ),
        ),
        commands.registerCommand(
            "encode.encodeBase16Hex",
            encodeCommand((text) => Buffer.from(text).toString("hex")),
        ),
        commands.registerCommand(
            "encode.decodeBase16Hex",
            encodeCommand((text) => Buffer.from(text, "hex").toString()),
        ),
        commands.registerCommand(
            "encode.encodeBase64",
            encodeCommand((text) => Buffer.from(text).toString("base64")),
        ),
        commands.registerCommand(
            "encode.decodeBase64",
            encodeCommand((text) => Buffer.from(text, "base64").toString()),
        ),
        commands.registerCommand(
            "encode.encodeBase64UrlSafe",
            encodeCommand((text) => Buffer.from(text).toString("base64url")),
        ),
        commands.registerCommand(
            "encode.decodeBase64UrlSafe",
            encodeCommand((text) => Buffer.from(text, "base64url").toString()),
        ),
        commands.registerCommand(
            "encode.encodeJsonString",
            encodeCommand((text) => JSON.stringify(text)),
        ),
        commands.registerCommand(
            "encode.decodeJsonString",
            encodeCommand((text) => {
                const res: unknown = JSON.parse(text);
                if (typeof res !== "string") {
                    // TODO: error instead?
                    return text;
                }

                return res;
            }),
        ),
        commands.registerCommand(
            "encode.encodeUrlRfc2396",
            encodeCommand((text) => encodeURIComponent(text)),
        ),
        commands.registerCommand(
            "encode.decodeUrlRfc2396",
            encodeCommand((text) => decodeURIComponent(text)),
        ),
        // TODO: consider support for:
        // - Base32
        // - URL (RFC 3986)
        // - HTTP Header (RFC 5987)
        // - XML Value (entities? idk what the most correct name for the values inside elements would be)
        // - XML Attribute
        // - HTML?
    );
}
