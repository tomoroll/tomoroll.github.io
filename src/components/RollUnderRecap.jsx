import React from 'react';
import PropTypes from 'prop-types';
import { getProfit } from '../utils/etheroll-contract';


function RollUnderRecap({ betSize, value }) {
  const chances = value - 1;
  const profit = getProfit(betSize, chances);
  return (
    <div className="row">
      <div className="col-6">
        <h3>Roll under</h3>
      </div>
      <div className="col-6">
        <h3 className="text-right">{value}</h3>
      </div>
      <div className="col-6">
        With a wager of
      </div>
      <div className="col-6">
        <p className="text-right mb-0">
          {betSize.toFixed(8)}
          &nbsp;
          ETH
        </p>
      </div>
      <div className="col-6">
        For a profit of
      </div>
      <div className="col-6">
        <p className="text-right">
          {profit.toFixed(8)}
          &nbsp;
          ETH
        </p>
      </div>
    </div>
  );
}
RollUnderRecap.propTypes = {
  betSize: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default RollUnderRecap;
