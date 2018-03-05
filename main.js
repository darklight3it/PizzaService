/*
step 1:
Sviluppare un applicazione che riceve in input il percorso del file json, una data di inizio e una data di fine così da definire un periodo temporale.
Dovrà stampare in output l"elenco degli ordini relativi al periodo temporale (estremi inclusi) ordinati per orderTime.
Per ogni ordine dovrà stampare:

<orderTime> <customer>

L"applicazione si usa in questo modo:

PIZZAPRINT.EXE "path to JSON file" "start date" "end date"
ex: PIZZAPRINT.EXE c:\orders.json 2017-11-24 2017-11-25

step 2:
la stessa applicazione deve poter eseguire diverse elaborazioni con i dati prelevati dal file json. il tipo di elaborazione è dettato da un nuovo parametro che se vale:
- Cooking 	:	stampa in output un elenco ordinato per delivery time di tutti gli item di tipo dish contenente (deliveryTime,customer,item list with quantity)
- Delivery	:	stampa in output un elenco ordinato per delivery time di tutti gli ordini di tipo takeaway contenente (deliveryTime,customer,address,totalQuantity,totalPrice),
stampa inoltre la distanza totale in KM percorsa durante la giornata
- Payment	:	stampa in output un elenco ordinato per delivery time di tutti gli ordini contenente (deliveryTime,customer,item list with quantity and price, delivery price, total price). Sapendo che il delivery price viene calcolato come 10€cent x 100m
- Inventory	:	stampa l"elenco della merce consumata quel giorno (name, quantity) raggruppata per name

L"applicazione si usa in questo modo:

PIZZAPRINT.EXE "path to JSON file" "start date" "end date" "function name"
ex: PIZZAPRINT.EXE c:\orders.json 2017-11-24 2017-11-25 Cooking

step 3:
Vogliamo dare la possibilità a software house di terze parti di estendere la nostra applicazione con nuove funzionalità, ovvero di definire nuovi "function name" e relative elaborazioni dei dati. Come possiamo fare?

Considera che:
- il codice sorgente non è open-source e non vuole essere condiviso nè da noi nè dalle altre software house.
- la nostra applicazione deve poter eseguire le nuove elaborazioni senza la necessità di essere ricompilata.
- possiamo inviare un assembly alle software house, contente l"interfaccia da implementare.

Rifattorizzare l"applicazione dello step 2 in modo che non necessiti ricompilazione nel caso in cui si voglia supportare un nuovo tipo di elaborazione.

step 4:
Integrare un nuovo tipo di elaborazione.
*/

// vendor
import minimist from 'minimist';
import beautify from 'json-beautify';
const argv = minimist(process.argv.slice(2));

//deps
import dataService from './src/services/fs-data-service';
import ordersStrategyFactory from './src/factories/orders-strategy-factory';
import app from './src/app.js';

app.getOrders(argv, dataService, ordersStrategyFactory)
  .then(orders => console.log(beautify(orders, null, 2, 100)));
