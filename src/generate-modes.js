import { readdir, readFile } from "fs/promises";
import { join, resolve } from "path";
import { stringify } from "yaml";

/**
 * Parses a mode markdown file to extract the mode name, role definition, and custom instructions
 * @param {string} content - The content of the markdown file
 * @returns {Object} An object containing the mode name, slug, role, and instructions
 */
function parseModeMd(content) {
  // Extract mode name from the first heading
  const nameMatch = content.match(/^# ([^\n]+) Mode/m);
  if (!nameMatch) {
    throw new Error('Could not find mode name in markdown file');
  }
  const name = nameMatch[1];
  
  // Generate slug from name
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  
  // Extract role definition
  const roleMatch = content.match(/## Role Definition\s+([^\n]+(?:\n(?!##)[^\n]+)*)/);
  if (!roleMatch) {
    throw new Error('Could not find role definition in markdown file');
  }
  const role = roleMatch[1].trim();
  
  // Extract custom instructions
  const instructionsMatch = content.match(/## Custom Instructions\s+([\s\S]+?)(?=\n## |$)/);
  if (!instructionsMatch) {
    throw new Error('Could not find custom instructions in markdown file');
  }
  const instructions = instructionsMatch[1].trim();
  
  return {
    name,
    slug,
    role,
    instructions
  };
}

/**
 * Main function to generate the .roomodes configuration file
 */
export async function generateModesConfig() {
  try {
    // Read all mode markdown files
    const modesDir = resolve(import.meta.dirname, 'modes');
    const files = await readdir(modesDir);
    const modeFiles = files.filter(file => file.endsWith('-mode.md'));
    
    console.log(`Found ${modeFiles.length} mode files`);
    
    // Parse each mode file
    const modes = [];
    for (const file of modeFiles) {
      console.debug(`Processing ${file}...`);
      const content = await readFile(join(modesDir, file), 'utf8');
      try {
        const mode = parseModeMd(content);
        
        // Add mode to the array
        modes.push({
          slug: mode.slug,
          name: mode.name,
          roleDefinition: mode.role,
          customInstructions: mode.instructions,
          groups: [
            "read",
            "edit",
            "browser",
            "command",
            "mcp"
          ],
        });
      } catch (error) {
        console.error(`Error parsing ${file}: ${error.message}`);
      }
    }
    
    // Sort modes alphabetically by name
    modes.sort((a, b) => a.name.localeCompare(b.name));
    
    // Format the modes into the .roomodes configuration
    const roomodesConfig = {
      customModes: modes
    };
    
    // Write the configuration to .roomodes file
    const configJson = stringify(roomodesConfig, null, 2);
    return configJson
  } catch (error) {
    console.error('Error generating modes configuration:', error);
    process.exit(1);
  }
}
