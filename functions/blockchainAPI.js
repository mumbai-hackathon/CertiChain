const con = require('../configuration/databaseConnection.js');
const obj = require('../configuration/blockchain.js');
var web3 = obj.web3;
var contractInstance = obj.contractInstance


function getCertificateLocation(certificateId,hash) {
    return contractInstance.getCertificateLocation(certificateId,hash,{ from: web3.eth.accounts[0], gas: 3000000 });
}


function setCertificate(){
    return contractInstance.getCertificateLocation(certificateId,hash,{ from: web3.eth.accounts[0], gas: 3000000 });
}

module.exports = { getCertificateLocation } 