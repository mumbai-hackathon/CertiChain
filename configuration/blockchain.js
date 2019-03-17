const Web3 = require('web3');


//Web Connection
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
console.log(`Talking with a geth server ${web3.version.api} \n`);

const abiArray =[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_cId",
				"type": "string"
			},
			{
				"name": "_hash",
				"type": "string"
			},
			{
				"name": "_location",
				"type": "string"
			},
			{
				"name": "_sId",
				"type": "uint256"
			}
		],
		"name": "setCertificateData",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_cId",
				"type": "string"
			},
			{
				"name": "_hash",
				"type": "string"
			}
		],
		"name": "getCertificateLocation",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_cId",
				"type": "string"
			}
		],
		"name": "getStaff",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
const address = '0x40c782a90d6c1b909185f5b32358ce13c7f9c208';
const contract = web3.eth.contract(abiArray);
const contractInstance = contract.at(address);
web3.eth.defaultAccount = web3.eth.coinbase;
web3.eth.defaultAccount = "0xc30d881fcc531c6d88eb9d64732001f28ed0de72";

module.exports.web3 = web3; 
module.exports.contractInstance = contractInstance;