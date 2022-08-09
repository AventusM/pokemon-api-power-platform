import Pokedex from 'pokedex-promise-v2';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const P = new Pokedex();
const app = express();
const publicPath = path.join(__dirname, 'public');

app.get('/pokemon', async (req, res) => {
  try {
    const pokemonId = req.query.id;
    // Any function with the designation "ByName" can also be passed an integer ID.
    const pokemonData = await P.getPokemonByName(Number(pokemonId));
    res.send({
      name: pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1),
      sprite: Math.random() < 0.2 ? pokemonData.sprites.front_shiny : pokemonData.sprites.front_default,
      pokedexEntry: pokemonData.id,
      mainType: pokemonData.types[0].type.name // Main type
    });
  } catch (e) {
    console.error('error', e);
  }
});

app.get("/pokeball", async(req, res) => {
  try{
    const pokeBallName = req.query.name
    const pokeBallData = await P.getItemByName(pokeBallName)
    console.log(pokeBallData)
  
    res.send(pokeBallData)
  } catch (e){
    console.error('error', e)
  }
})

app.get('/', async (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.use(express.static(publicPath))
app.get('*', (_req, res) => {
  res.send({ message: 'Unknown endpoint.' });
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
