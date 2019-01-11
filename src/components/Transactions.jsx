import React from 'react';
import PropTypes from 'prop-types';
import Address from './Address';
import Transaction from './Transaction';


function MergedLog({ network, mergedLog }) {
  const { logBetEvent, logResultEvent } = mergedLog;
  const playerNumber = logBetEvent.args.prediction.toNumber();
  let valueEth = '?';
  let diceResult = '?';
  let sign = '?';
  let alertClass = 'secondary';
  // resolved bet case
  if (typeof logResultEvent !== 'undefined') {
    diceResult = logBetEvent.args.luckynumber.toNumber();
    const playerWon = diceResult < playerNumber;
    valueEth = (logBetEvent.args.betvalue * (10 ** (-18))).toFixed(2);
    sign = playerWon ? '<' : '>';
    alertClass = playerWon ? 'success' : 'danger';
  }
  return (
    <div className={`row d-inline-flex list-group-item list-group-item-${alertClass}`}>
      <div className="col-sm-2 d-block">
        <h3>{diceResult}</h3>
      </div>
      <div className="col-10">
        <div className="w-100">
          {valueEth}
          &nbsp;
          ETH
        </div>
        <div className="w-100">
          {diceResult}
          &nbsp;
          {sign}
          &nbsp;
          {playerNumber}
        </div>
        <div className="w-100">
          Wallet:
          &nbsp;
          <Address address={logBetEvent.args.from.toString()} network={network} />
        </div>
        <div className="w-100">
          Transaction:
          &nbsp;
          <Transaction hash={logBetEvent.transactionHash} network={network} />
        </div>
      </div>
    </div>
  );
}
MergedLog.propTypes = {
  network: PropTypes.number.isRequired,
  mergedLog: PropTypes.shape({
    // TODO: seems completely ignored
    todo: PropTypes.number,
  }).isRequired,
};

function TransactionsFilterButtons({ onClick }) {
  return (
    <nav className="nav">
      <button
        type="button"
        className="btn btn-link active"
        onClick={() => onClick('#all-transactions')}
      >
          All transactions
      </button>
      <button
        type="button"
        className="btn btn-link"
        onClick={() => onClick('#my-transactions')}
      >
          My transactions
      </button>
    </nav>
  );
}
TransactionsFilterButtons.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function Transactions({ network, onClick, transactions }) {
  const reversedTransactions = transactions.slice().reverse();
  const transactionsElems = reversedTransactions.map(transaction => (
    <MergedLog
      key={transaction.logBetEvent.transactionHash}
      network={network}
      mergedLog={transaction}
    />
  ));
  return (
    <div className="card transactions">
      <div className="card-header">
        <TransactionsFilterButtons onClick={onClick} />
      </div>
      <div className="card-body">
        <div className="list-group">{transactionsElems}</div>
      </div>
    </div>
  );
}
Transactions.propTypes = {
  network: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({
    // TODO: seems completely ignored
    // https://github.com/facebook/prop-types/issues/181
    todo: PropTypes.number,
  })).isRequired,
};


export default Transactions;
