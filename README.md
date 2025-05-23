# main

This branch contains the basic development workflow of a [**rocket-powered**](https://github.com/NamesMT/roo-rocket) item for the [**Roo Marketplace registry**](https://github.com/RooCodeInc/Roo-Code-Marketplace).

## Usage

You would create folders in `src/assembly/` for the items you want to create, and then create a `rocket.config.ts` file in each of them, which will be the brain of each item.

### Item/Rocket crafting

See general crafting guide here: [**config-packs-template/CRAFTING_GUIDE**](https://github.com/NamesMT/config-packs-template/blob/main/CRAFTING_GUIDE.md)

### Development

To start development, do `pnpm run dev` in the root directory, this would runs a development cycle that would automatically watch for changes and re-assemble the item, you can open a new IDE instance at `.config-dev` directory to test the assembled item live.

Set the target development item in [`src/dev.ts`](./src/dev.ts) file.

### Bundling

Do `pnpm run bundle` in the root directory, and all items will be bundled to `dist/` directory, the console would also outputs the hash of the binaries.

Configure the items to be bundled in [`src/bundle.ts`](./src/bundle.ts) file.

### Publishing to marketplace

After you have your items binaries, upload them somewhere, and create valid metadata for them in the `registry/` directory.

Then, you can fork the [**Roo-Code-Marketplace**](https://github.com/RooCodeInc/Roo-Code-Marketplace) registry repo, and just copy whatever is under your `registry/` dir to the root of that repo, then push to a branch and create a PR.

You can also add this repo as a custom source, so you can test and verify that your metadatas is valid and working before you push to the main repo.
