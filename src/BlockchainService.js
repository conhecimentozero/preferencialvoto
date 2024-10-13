import Web3 from 'web3';
import STVVote from '../STVVote.json';  // Importação do ABI do contrato inteligente

// Serviço responsável por interagir com a blockchain (DIP).
const BlockchainService = {
    // Carrega os dados da blockchain, como conta do usuário e lista de candidatas.
    async loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
        const accounts = await web3.eth.requestAccounts();
        const account = accounts[0];

        const networkId = await web3.eth.net.getId();
        const networkData = STVVote.networks[networkId];
        if (networkData) {
            const stvVote = new web3.eth.Contract(STVVote.abi, networkData.address);
            const candidateNames = await stvVote.methods.getCandidates().call();
            return { account, candidates: candidateNames };
        } else {
            throw new Error('Smart contract not deployed to detected network.');
        }
    },

    // Registra o voto do usuário na blockchain.
    async vote(preferences, account) {
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
        const networkId = await web3.eth.net.getId();
        const networkData = STVVote.networks[networkId];
        if (networkData) {
            const stvVote = new web3.eth.Contract(STVVote.abi, networkData.address);
            await stvVote.methods.vote(preferences).send({ from: account });
        } else {
            throw new Error('Smart contract not deployed to detected network.');
        }
    }
};

export default BlockchainService;