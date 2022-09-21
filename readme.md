# vscode-extensions

## develop

-   install

```bash
npm install
```

-   start extensions with `F5`

## update package version

-   `npm run bump-version -- <package-name>`
-   update changelog

<!-- TODO: remove? -->

## how repo was setup

### monorepo

-   `git init`
-   `nix flake new -t "github:numtide/devshell" .`
-   override `devshell.toml` with:

    ```toml
    # https://numtide.github.io/devshell
    [devshell]
    motd = ""
    packages = ["nodejs-18_x"]

    [[env]]
    name = "PATH"
    prefix = "$(npm bin)"
    ```

-   `npm init @pentible/package@latest`
    -   Package type: `monorepo`
-   fix ignore files (should be fixed in @pentible/create-package)
    -   append `/.direnv/` to `.*ignore` files
-   `npm i -D @pentible/eslint-config-node`
-   insert `- "@pentible/eslint-config-node"` into `.eslintrc.yml`
-   `npm i -D yo generator-code`

### note syntax

-   `mkdir -p packages`
-   `cd packages`
-   `yo code`
-   move `packages/note-syntax/.vscode` to `.vscode`
-   fix `.vscode/launch.json`
    -   rename configuration to `note-syntax`
    -   append `/packages/note-syntax` to `--extensionDevelopmentPath` arg
