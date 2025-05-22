import { bundleConfigPack } from 'config-rocket'
import { resolve } from 'pathe'
import { prepareDirectory } from './helpers/fs'

async function entry() {
  const outDir = resolve(import.meta.dirname, '../dist')

  // Clean old dist files
  await prepareDirectory({
    path: outDir,
    clean: true,
  })

  // Add as much `bundleConfigPack` as you want here

  await bundleConfigPack({
    frameDir: resolve(import.meta.dirname, 'assembly/context7'),
    fuelDir: resolve(import.meta.dirname, 'assembly/@fuel-garage'),
    outDir,
    outName: 'context7',
  })
}
await entry()
