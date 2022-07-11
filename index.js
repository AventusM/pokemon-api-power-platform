import Pokedex from 'pokedex-promise-v2';
import express from 'express';

const P = new Pokedex();
const app = express();

app.get('/pokemon/:id', async (req, res) => {
  try {
    const pokemonId = req.params.id;
    // Any function with the designation "ByName" can also be passed an integer ID.
    const pokemonData = await P.getPokemonByName(Number(pokemonId));
    res.send({
      name: pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1),
      sprite: Math.random() < 0.2 ? pokemonData.sprites.front_shiny : pokemonData.sprites.front_default,
    });
  } catch (e) {
    console.error('error', e);
  }
});

app.get('*', (_req, res) => {
  res.send({ message: 'Unknown endpoint. Only "/pokemon/:id" is a supported endpoint' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
