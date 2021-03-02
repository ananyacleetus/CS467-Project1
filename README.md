# CS 467 Project 1: Stock Market Manipulation through Social Media


## Environment and Tools Used
* __Libraries:__ React v17.0.1, D3.js v6.5.0, Material-UI v4.11.3
* __APIs:__ Twitter API v2.0, Yahoo Finance API v4.2 (unofficial endpoint API)
* __Misc Tools:__ Snowpack v3.0.13, Babel v7.13.1, Marvel Prototyping App, React Tweet Embed v1.2.2


## Instructions

This template uses the snowpack build system (https://www.snowpack.dev/).

1. Ensure NodeJS is installed.  Go here to install: https://nodejs.org/en/ (recommended: version 15).
2. In a terminal, `npm install`.
- If you get an `ERESOLVE` error with the dependency tree, run `npm install --legacy-peer-deps`
3. In a terminal, navigate into the stocks-api directory. `npm install` and `npm start` to start the api that will fetch the yahoo finance data.
- If you encounter errors, you most likely need to `npm install yahoo-finance` , `npm install twit` and `npm install --save cors`. You may still need the `--legacy-peer-deps` flag depending on your system.
4. In a different terminal, back in the project directory, `npm run babel`.
4. In a different terminal, in the project directory `npm start`. This starts a local server that serves up the contents of the `public` folder, and the js
in the `src` folder.
5. Your web browser should automatically open, but if it doesn't, your terminal window should contain helpful information.
