# Paste Indented

Paste indented to the same level as the current line

## Why?

While many languages already auto indent on paste, certain languages do not
(notably yaml and python). This extension fixes pasting in these languages (and
falls back to default behavior for all others).

## Commands

-   `Paste Indented`

## Recommended Keybindings

### macOS

```json
// paste & indent
{
    "key": "cmd+v",
    "command": "paste-indented.paste",
    "when": "editorTextFocus && !editorReadonly"
},
{
    "key": "cmd+v",
    "command": "editor.action.clipboardPasteAction",
    "when": "!editorTextFocus"
},
{
    "key": "cmd+shift+v",
    "command": "editor.action.clipboardPasteAction",
    "when": "editorTextFocus && !editorReadonly"
}
```

### Linux/Windows

```json
// paste & indent
{
    "key": "ctrl+v",
    "command": "paste-indented.paste",
    "when": "editorTextFocus && !editorReadonly"
},
{
    "key": "ctrl+v",
    "command": "editor.action.clipboardPasteAction",
    "when": "!editorTextFocus"
},
{
    "key": "ctrl+shift+v",
    "command": "editor.action.clipboardPasteAction",
    "when": "editorTextFocus && !editorReadonly"
}
```
