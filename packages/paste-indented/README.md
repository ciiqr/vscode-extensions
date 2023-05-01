# Paste Indented

Paste indented to the same level as the current line

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
