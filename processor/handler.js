'use strict';

const { TransactionHandler } = require('sawtooth-sdk/processor/handler');
const { InvalidTransaction } = require('sawtooth-sdk/processor/exceptions');
const { decode, encode } = require('./services/encoding');


const FAMILY_NAME = 'cryptomoji';
const FAMILY_VERSION = '0.1';
const NAMESPACE = '5f4d76';
const {getCollectionAddress, getMojiAddress} = require ('./services/addressing');


const privateKey = "1d7bf2bba9a96500052b5f89ca0fd313d55e97e317ab040aa354142e6894917a";
const publicKey =  "0385bb66d9fc0e325cbf2147ba297e52a0ae8d3c2d40400d9a66a060a1c86a758c";

// const {getPublicKey} = require('../client/source/services/signing');
/**
 * A Cryptomoji specific version of a Hyperledger Sawtooth Transaction Handler.
 */
class MojiHandler extends TransactionHandler {


  createMoji(ownerKey, moji) {
    return getMojiAddress(ownerKey, moji.dna);
  }
  /**
   * The constructor for a TransactionHandler simply registers it with the
   * validator, declaring which family name, versions, and namespaces it
   * expects to handle. We'll fill this one in for you.
   */
  constructor () {
    console.log('Initializing cryptomoji handler with namespace:', NAMESPACE);
    super(FAMILY_NAME, [ FAMILY_VERSION ], [ NAMESPACE ]);
  }

  /**
   * The apply method is where the vast majority of all the work of a
   * transaction processor happens. It will be called once for every
   * transaction, passing two objects: a transaction process request ("txn" for
   * short) and state context.
   *
   * Properties of `txn`:
   *   - txn.payload: the encoded payload sent from your client
   *   - txn.header: the decoded TransactionHeader for this transaction
   *   - txn.signature: the hex signature of the header
   *
   * Methods of `context`:
   *   - context.getState(addresses): takes an array of addresses and returns
   *     a Promise which will resolve with the requested state. The state
   *     object will have keys which are addresses, and values that are encoded
   *     state resources.
   *   - context.setState(updates): takes an update object and returns a
   *     Promise which will resolve with an array of the successfully
   *     updated addresses. The updates object should have keys which are
   *     addresses, and values which are encoded state resources.
   *   - context.deleteState(addresses): deletes the state for the passed
   *     array of state addresses. Only needed if attempting the extra credit.
   */
  apply (txn, context) {
    // Enter your solution here
    // (start by decoding your payload and checking which action it has)

    var payloadActoins = ['CREATE_COLLECTION','SELECT_SIRE', 'BREED_MOJI'];
    let payload;
    // let publicKey;

    function _in(x,val) {
      for (var i=0; i<x.length; i++){
        if (val==x[i]){
          return true;
        }
        return false;
      }
    }
console.log("\n\n\n\nBeforeTry\n\n\n\n\n");
    try {
      payload = decode(txn.payload);
      console.log('PAYLOAD:', payload)
        
      
    } catch (error) { 
      throw new InvalidTransaction('Unable to decode payload');
    }
    if( !payload || !_in(payloadActoins, payload.action)){
      throw new InvalidTransaction('Not valid transaction');
    }else{
      console.log("Inside else", payload.action.toString());
      if (payload.action.toString() === 'CREATE_COLLECTION' ){
        // publicKey = txn.header.signerPublicKey;
        // console.log("pubblicKey", publicKey);

        const colAddress = getCollectionAddress(publicKey);
        return context.getState([colAddress]).then(state => {
          if (state[colAddress].length > 0) {
            throw new InvalidTransaction('collection already exit');
          }
          console.log("AfterTry");

          const collection = {};
          let moji = [];
        let moji0 = {
          "dna": "Sarah1",
          "owner": publicKey,
          "breeder": "",
          "sire": "",
          "bred": [ "" ],
          "sired": [ "" ]
        };
        let moji1 = {
          "dna": "Ahmad1",
          "owner": publicKey,
          "breeder": "",
          "sire": "",
          "bred": [ "" ],
          "sired": [ "" ]
        };
       let moji2 = {
          "dna": "Walid1",
          "owner": publicKey,
          "breeder": "",
          "sire": "",
          "bred": [ "" ],
          "sired": [ "" ]
        };

        moji[0] = this.createMoji(publicKey, moji0);       
        moji[1] = this.createMoji(publicKey, moji1);
        moji[2] = this.createMoji(publicKey, moji2);

        collection[colAddress] = encode({key: publicKey , moji: moji});
        collection[moji[0]] = encode(moji0); 
        collection[moji[1]] = encode(moji1); 
        collection[moji[2]] = encode(moji2); 

        console.log("collection",collection);
        return context.setState({
          collection
        });
      });
      }
    }    
  }
}

module.exports = MojiHandler;
