import etherollAbi from './etheroll-abi';

// TODO require vs import
const SolidityEvent = require('web3/lib/web3/event.js');

const Networks = Object.freeze({ mainnet: 1, morden: 2, ropsten: 3 });

const contractAddresses = {
  [Networks.mainnet]: '0x607e6e86b28d7fb3ada62dc6cf2984c6d3959351',
  [Networks.ropsten]: '0x607e6e86b28d7fb3ada62dc6cf2984c6d3959351',
};

const etherscanUrls = {
  [Networks.mainnet]: 'https://etherscan.io',
  [Networks.ropsten]: 'https://ropsten.etherscan.io',
};

function getProfit(betSize, chances) {
  let profit = 0;
  const houseEdge = 1 / 100.0;
  const chancesLoss = 100.0 - chances;
  if (chances !== 0 && chancesLoss !== 0) {
    let payout = ((chancesLoss / chances) * betSize) + betSize;
    payout *= (1 - houseEdge);
    profit = payout - betSize;
  }
  return profit;
}

class EtherollContract {
  constructor(web3, address) {
    this.web3 = web3;
    this.address = address;
    if (typeof address === 'undefined') {
      this.address = contractAddresses[web3.version.network];
    }
    this.abi = etherollAbi;
    this.web3Contract = web3.eth.contract(etherollAbi).at(this.address);
  }

  getSolidityEvents() {
    const events = {};
    this.abi.forEach((definition) => {
      if (definition.type !== 'event') {
        return;
      }
      events[definition.name] = new SolidityEvent(this.web3, definition, this.address);
    });
    return events;
  }

  // Returns sha3 signature of events, e.g.
  // {'LogResult': '0x6883...5c88', 'LogBet': '0x1cb5...75c4'}
  getEventSignatures() {
    const signatures = {};
    const events = this.getSolidityEvents();
    Object.keys(events).forEach((eventName) => {
      signatures[eventName] = events[eventName].signature();
    });
    return signatures;
  }

  getSolidityEvent(eventSignature) {
    const events = this.getSolidityEvents();
    const matchingEvent = Object.keys(events).filter(key => (
      events[key].signature() === eventSignature.replace('0x', '')
    ));
    return events[matchingEvent];
  }

  decodeEvent(_evnt) {
    // SolidityEvent.decode() seems to be mutating the object, hence the copy
    const evnt = { ..._evnt };
    const solidityEvent = this.getSolidityEvent(evnt.topics[0]);
    const decoded = solidityEvent.decode(evnt);
    return decoded;
  }

  // callback(error, result)
  getTransactionLogs(callback) {
    this.web3.eth.getBlockNumber((error, result) => {
      if (error) {
        console.log(error);
      } else {
        const { address } = this;
        const lastBlock = result;
        const fromBlock = lastBlock - 100000;
        const toBlock = lastBlock;
        const options = {
          address,
          fromBlock,
          toBlock,
        };
        const filter = this.web3.eth.filter(options);
        filter.get(callback);
      }
    });
  }

  // callback(error, result)
  watchTransactionLogs(callback) {
    this.web3.eth.getBlockNumber((error, result) => {
      if (error) {
        console.log(error);
      } else {
        const { address } = this;
        const lastBlock = result;
        const fromBlock = lastBlock - 100000;
        const toBlock = lastBlock;
        const options = {
          address,
          fromBlock,
          toBlock,
        };
        const filter = this.web3.eth.filter(options);
        filter.watch(callback);
      }
    });
  }

  // Merges bet logs (LogBet) with bet results logs (LogResult).
  static mergeLogs(logBetEvents, logResultEvents) {
    // per bet ID dictionary
    const logResultEventsDict = logResultEvents.reduce((dict, logResultEvent) => ({
      ...dict,
      [logResultEvent.args.BetID]: logResultEvent,
    }), {});
    return logBetEvents.map(logBetEvent => ({
      logBetEvent,
      logResultEvent: logResultEventsDict[logBetEvent.args.BetID],
    }));
  }

  // callback(error, result)
  getMergedTransactionLogs(callback) {
    this.getTransactionLogs((error, result) => {
      if (error) {
        console.log(error);
      } else {
        const decodedEvents = result.map(evnt => this.decodeEvent(evnt));
        const logBetEvents = decodedEvents.filter(evnt => (
          evnt.event === 'BetResult'
        ));
        const logResultEvents = decodedEvents.filter(evnt => (
          evnt.event === 'BetResult'
        ));
        const mergedLogs = EtherollContract.mergeLogs(logBetEvents, logResultEvents);
        callback(error, mergedLogs);
      }
    });
  }
}


export {
  EtherollContract, etherscanUrls, getProfit, Networks, contractAddresses,
};
