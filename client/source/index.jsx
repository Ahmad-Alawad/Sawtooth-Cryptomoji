import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {createPrivateKey} from './services/signing';
import {encodeAll} from './services/transactions';
// import { createKeys } from './services/signing';

const axios = require('axios')


const privateKey = "1d7bf2bba9a96500052b5f89ca0fd313d55e97e317ab040aa354142e6894917a";
const publicKey =  "0385bb66d9fc0e325cbf2147ba297e52a0ae8d3c2d40400d9a66a060a1c86a758c";

// const privateKey = createPrivateKey();
const payload = {action: 'CREATE_COLLECTION'};
const batchList = encodeAll(privateKey,payload);

// fetch('/api/state', 
// {method: 'POST',
//   headers: {
//     // 'Accept': 'application/json',
//      'Content-Type': 'application/octet-stream',
//   },
//   body: JSON.stringify(batchList)
// }).then(
//   (result) => {
//     console.log(result);
// });
// console.log(createKeys());
console.log(batchList);
axios({
  method: 'post',
  url:'/api/batches',
  headers: { 'Content-Type': 'application/octet-stream'},
  data: batchList
}).then(function(resp) {
  console.log("yaaaaaay \n",resp);
});
// .then(fetch("/api/state")
//     .then(res => res.json())
//     .then(
//       (result) => {
//         console.log(result);
//       },
//       // Note: it's important to handle errors here
//       // instead of a catch() block so that we don't swallow
//       // exceptions from actual bugs in components.
//     ));
// .then(fetch("/api/state"))
// .then(res => res.json())
// .then(
//       (result) => {
//         console.log(result);
//       },
//       // Note: it's important to handle errors here
//       // instead of a catch() block so that we don't swallow
//       // exceptions from actual bugs in components.
// );


fetch("/api/state")
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
    );

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);

ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('app')
);