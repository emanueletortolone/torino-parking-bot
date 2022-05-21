# Torino Parking Bot
A simple `Telegram` Bot that tells you the nearest car parking available in Turin city area (Italy), just by providing your current location.

## Stack
The Bot is built with `Node.js` and `Express`, exposing a webhook to process the data sent by `Telegram`.

## Open Data
The car parking informations are available thanks to the Open Data provided by `5T`, that _"manages the Mobility and Infomobility Centre of the Torino metropolitan and Piedmontese area, as in-house company of the City of Torino and the Piemonte Regional Government"_.

The data are available in `XML` format from this open endpoint: https://opendata.5t.torino.it/get_pk

## Available npm scripts
- `start`: get the app up and running
- `test`: run all the `jest` tests available
- `localtunnel`: open a proxy connection from localhost to a `local tunnel` server | https://localtunnel.github.io/www/
- `server:dev`: start the application with a proxy connection to a `local tunnel` server

## Get the Bot on Telegram
The bot is currently available on Telegram and you can find it using `@torino_parking_bot` username.