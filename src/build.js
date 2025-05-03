import { cp, mkdir, rm, writeFile } from 'fs/promises'
import { exec } from 'child_process';
import { promisify } from 'util';
import { generateModesConfig } from './generate-modes.js';
import { join, resolve } from 'path';

const execAsync = promisify(exec)

async function createBundle() {
  const srcDir = resolve(import.meta.dirname)
  const distDir = resolve(srcDir, '../dist')

  // Clean old dist and mkdir
  await rm(distDir, { recursive: true, force: true })
  await mkdir(join(distDir, 'frame', '.roo'), { recursive: true })

  // Generate the modes
  const roomodesJson = await generateModesConfig()
  await writeFile(join(distDir, 'frame', '.roomodes'), roomodesJson)
  console.log("Generated .roomodes file")

  // Copy the existing built `shariqriazz-vertex-mcp` rocket to dist (ref: https://github.com/NamesMT/config-packs-template)
  await cp(join(srcDir, 'mcp-rocket/'), distDir, { recursive: true })
  console.log("Copied mcp-rocket to dist")

  // Creates zip archive
  const { stdout } = await execAsync(`npx -y config-rocket@latest zip --cwd="${distDir}" -i="**" -f`)
  console.log(stdout)
}
createBundle()
