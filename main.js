/*
step 1:
Sviluppare un applicazione che riceve in input il percorso del file json, una data di inizio e una data di fine così da definire un periodo temporale.
Dovrà stampare in output l'elenco degli ordini relativi al periodo temporale (estremi inclusi) ordinati per orderTime.
Per ogni ordine dovrà stampare:

<orderTime> <customer>

L'applicazione si usa in questo modo:

PIZZAPRINT.EXE "path to JSON file" "start date" "end date"
ex: PIZZAPRINT.EXE c:\orders.json 2017-11-24 2017-11-25
*/

'use strict';
// vendor
import minimist from 'minimist';
import beautify from 'json-beautify';
const argv = minimist(process.argv.slice(2));

//deps
import dataService from './src/services/fs-data-service.js';
import ordersUtils from './src/utils/orders-utils.js';
import app from './src/app.js';

app.getOrders(argv, dataService, ordersUtils)
    .then(orders => console.log(beautify(orders, null, 2, 100)));


