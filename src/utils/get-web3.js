import Web3 from 'web3';

const getWeb3 = new Promise((resolve, reject) => {
  // wait for loading completion before loading web3, to be sure it's
  // already injected
  window.addEventListener('load', () => {
    // checking if Web3 has been injected by the browser MetaMask
    if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
      // Use MetaMask's provider.
      const web3 = new Web3(window.web3.currentProvider);
      const results = { web3 };
      resolve(results);
    } else {
      // user is not running MetaMask?
      reject(new Error('Is MetaMask running?'));
    }
  });
});


export default getWeb3;
