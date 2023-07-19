const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  try {
    const name = process.argv[2] || "Sidney Kertzmann";
    console.log(`Checking if "${name}" is on the nice list...`);

    const merkleTree = new MerkleTree(niceList);
    const index = niceList.findIndex(n => n === name);
    if (index === -1) {
      console.log("You are not on the nice list :(");
      return;
    }

    const proof = merkleTree.getProof(index);

    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      name,
      proof
    });

    console.log(`\nCongratulations! ${gift} `);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

main();
