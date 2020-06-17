const axios = require('axios');
const core = require('@actions/core');

async function run() {
  const character = core.getInput('character');

  console.log(character);

  const response = await axios.get('https://futuramaapi.herokuapp.com/api/characters/dr-zoidberg/1');
  const { data = [] } = response;
  const firstEntry = data[0];
  console.log(`${firstEntry.character}: ${firstEntry.quote}`);
}

run();