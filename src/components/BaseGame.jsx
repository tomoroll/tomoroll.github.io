import React from 'react';
import PropTypes from 'prop-types';
import getWeb3 from '../utils/get-web3';
import MetaMaskLink from './MetaMaskLink';
import {
  EtherollContract,
} from '../utils/etheroll-contract';


class BaseGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onRollClick() {
    const {
      accountAddress, chances, contract, betSize, web3,
    } = this.state;
    const rollUnder = chances;
    const value = web3.toWei(betSize.toString(), 'ether');
    contract.web3Contract.bet(
      rollUnder, { from: accountAddress, value },
      (error, result) => {
        if (error) {
          console.error(error);
        } else {
          console.log(JSON.stringify(result));
        }
      },
    );
  }

  getTransactions(contract, setState) {
    contract.getMergedTransactionLogs((error, result) => {
      if (error) {
        console.log(error);
      } else {
        const allTransactions = result;
        // TODO: should be a prop via composition rather than inheritance
        const { transactionsFilter } = this.state;
        setState({ allTransactions });
        this.filterTransactions(transactionsFilter, setState);
      }
    });
  }

  /**
   * Retrieves web3 and contract info, then sets the following states:
   * - accountAddress
   * - accountBalance
   * - contract
   * - contractAddress
   * - contractBalance
   * - minBet
   * - maxBet
   * - maxChances
   * - network
   * - web3
   */
  getWeb3(setState) {
    const { showMessage, showWarningMessage } = this.props;
    getWeb3.then((results) => {
      const { web3 } = results;
      const contract = new EtherollContract(web3);
      const contractAddress = contract.address;
      const pullIntervalSeconds = 10 * 1000;
      // clearInterval() is in the componentWillUnmount()
      this.getTransactionsIntervalId = setInterval((
      ) => this.getTransactions(contract, setState), pullIntervalSeconds);
      this.getTransactions(contract, setState);
      setState({
        web3,
        network: Number(web3.version.network),
        contract,
        contractAddress,
      });
        setState({ minBet: 0.001 });
        setState({ minChances: 1 });
        setState({ maxChances: 95 });


      web3.eth.getBalance(contractAddress, (error, balance) => {
        // error can be null with the balance also null in rare cases
        if (error || balance === null) {
          const message = "Can't fetch contract balance.";
          this.showFetchContractInfoWarning(message);
        } else {
          const contractBalance = web3.fromWei(balance, 'ether').toNumber();
          setState({ contractBalance });
        }
      });
      web3.eth.getAccounts((error, accounts) => {
        if (error) {
          const message = "Can't retrieve accounts.";
          showWarningMessage(message);
        } else {
          const accountAddress = accounts.length === 0 ? null : accounts[0];
          if (accountAddress !== null) {
            web3.eth.getBalance(accountAddress, (err, balance) => {
              // error can be null with the balance also null in rare cases
              if (err || balance === null) {
                const message = "Can't fetch account balance.";
                showWarningMessage(message);
              } else {
                const accountBalance = web3.fromWei(balance, 'ether').toNumber();
                setState({ accountBalance });
              }
            });
          }
          setState({ accountAddress });
        }
      });
    }, () => {
      const classType = 'danger';
      const message = (<>
        {'No account connected, connect with a Web3-compatible wallet like '}
        <MetaMaskLink />
      </>);
      showMessage(classType, message);
    });
  }

  showFetchContractInfoWarning(optionalMessage) {
    const { showWarningMessage } = this.props;
    const defaultMessage = "Can't fetch contract info.";
    const message = (typeof optionalMessage === 'undefined') ? defaultMessage : optionalMessage;
    showWarningMessage(message);
  }

  filterTransactions(transactionsFilter, setState) {
    // TODO: should be a prop via composition rather than inheritance
    const { accountAddress, allTransactions } = this.state;
    let filteredTransactions = allTransactions.slice();
    if (transactionsFilter === '#my-transactions') {
      filteredTransactions = allTransactions.filter(transaction => (
        transaction.logBetEvent.args.from.toLowerCase() === accountAddress.toLowerCase()
      ));
    }
    setState({ filteredTransactions, transactionsFilter });
  }

  updateState(key) {
    return (value) => {
      this.setState({ [key]: value });
    };
  }
}
BaseGame.propTypes = {
  showMessage: PropTypes.func.isRequired,
  showWarningMessage: PropTypes.func.isRequired,
};

export default BaseGame;
