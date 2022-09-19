# vscode-extensions

## develop

```bash
npm install
```

<!-- TODO: document `menu` to see commands -->

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
