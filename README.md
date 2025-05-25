# base

This branch contains the basic sample for source versioning your simple no-configuration item, and publishing to [**Roo Marketplace registry**](https://github.com/RooCodeInc/Roo-Code-Marketplace).

## Usage

You would place the source files under `src/` directory, structured just like how it would be in a user's project, like: `.roomodes`, `.roo/mcp.json`, etc.

### Bundling

Just simply zip everything under your `src/` folder, and upload it anywhere, maybe a GH release, or in this repo itself, like `binaries/v1.0.0.zip`.

*Tips: you can use `npx -y config-rocket@latest zip --cwd=src -i="**" -o=binaries/v1.0.0.zip` to easily create a zip binary and get the hash*

### Publishing to marketplace

After you have your item's binary, get it's SHA256 hash in base64url format.
Then, create valid metadatas for it in the `registry/` directory (refer to the [**Roo Marketplace registry**](https://github.com/RooCodeInc/Roo-Code-Marketplace) for structure and tutorial).

Then, you can fork the [**Roo-Code-Marketplace**](https://github.com/RooCodeInc/Roo-Code-Marketplace) registry repo, and just copy whatever is under your `registry/` dir to the root of that repo, then push to a branch and create a PR.

You can also add this repo as a custom source, so you can test and verify that your metadatas is valid and working before you create your PR.
