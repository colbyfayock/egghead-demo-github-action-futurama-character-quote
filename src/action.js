const axios = require('axios');
const core = require('@actions/core');

const DEFAULT_CHARACTER = 'dr-zoidberg';

const AVAILABLE_CHARACTERS = [
  'bender',
  'fry',
  'leela',
  'dr-zoidberg'
];

async function run() {
  const character = core.getInput('character') || DEFAULT_CHARACTER;

  core.debug(`[Futurama] Input Character: ${character}`)

  if ( !AVAILABLE_CHARACTERS.includes(character) ) {
    core.setFailed(`Unknown character: ${character}`)
    return;
  }

  core.debug(`[Futurama] Retrieving quote for: ${character}`);

  const response = await axios.get(`https://futuramaapi.herokuapp.com/api/characters/${character}/1`);
  core.debug(`[Futurama] Successfully retrieved quote for: ${character}`)

  const { data = [] } = response;

  core.debug(`[Futurama] Data: ${JSON.stringify(data)}`)

  const firstEntry = data[0];
  console.log(`${firstEntry.character}: ${firstEntry.quote}`);

  core.setOutput('quote', firstEntry)
}

run();