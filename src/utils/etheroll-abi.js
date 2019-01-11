const etherollAbi = [
    {
        "constant": true,
        "inputs": [],
        "name": "getLuckynumber",
        "outputs": [
            {
                "name": "",
                "type": "uint8[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "to",
                "type": "address"
            },
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "name": "withdrawEth",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "choose_a_number_to_chaos_the_algo",
                "type": "uint256"
            }
        ],
        "name": "shake",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "luckynumbers",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "under",
                "type": "uint8"
            }
        ],
        "name": "bet",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "players",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "admin",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "betvalue",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "prediction",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "luckynumber",
                "type": "uint8"
            },
            {
                "indexed": false,
                "name": "win",
                "type": "bool"
            },
            {
                "indexed": false,
                "name": "wonamount",
                "type": "uint256"
            }
        ],
        "name": "BetResult",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "betvalue",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "prediction",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "luckynumber",
                "type": "uint8"
            },
            {
                "indexed": false,
                "name": "congratulation",
                "type": "string"
            }
        ],
        "name": "LuckyDrop",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "make_chaos",
                "type": "bytes32"
            }
        ],
        "name": "Shake",
        "type": "event"
    }
];


export default etherollAbi;
