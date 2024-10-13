// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./STVVote.sol";
import "./AdminUtils.sol";

contract STVVoteAdmin {

    // Estado do contrato
    address public owner;
    STVVote public stvVoteContract;
    AdminUtils public adminUtils;

    // Evento para indicar que o contrato de votação foi criado
    event VoteContractCreated(address voteContractAddress);
    
    // Modificador para garantir que apenas o proprietário pode executar certas funções
    modifier onlyOwner() {
        require(msg.sender == owner, "Apenas o proprietario pode executar esta acao");
        _;
    }

    // Construtor do contrato de administração
    constructor() {
        owner = msg.sender;
        adminUtils = new AdminUtils();
    }

    // Função para criar um novo contrato de votação STV
    function createVoteContract(string[] memory candidateNames, uint _seats) public onlyOwner {
        stvVoteContract = new STVVote(candidateNames, _seats);
        emit VoteContractCreated(address(stvVoteContract));
    }

    // Função para adicionar mais candidatas (se necessário)
    function addCandidate(string memory candidateName) public onlyOwner {
        require(bytes(candidateName).length > 0, "Nome da candidata invalido");
        stvVoteContract.addCandidate(candidateName);
    }

    // Função para iniciar o processo de votação
    function startVoting() public onlyOwner {
        stvVoteContract.startVoting();
    }

    // Função para encerrar o processo de votação
    function endVoting() public onlyOwner {
        stvVoteContract.endVoting();
    }

    // Função para contar os votos
    function countVotes() public onlyOwner {
        stvVoteContract.countVotes();
    }

    // Função para obter os resultados da votação
    function getResults() public view returns (string[] memory, uint[] memory) {
        return stvVoteContract.getResults();
    }

    // Função para verificar o status atual da votação
    function getVotingStatus() public view returns (bool) {
        return stvVoteContract.isVotingActive();
    }

    // Função para alterar o número de cadeiras disponíveis
    function setSeats(uint newSeats) public onlyOwner {
        stvVoteContract.setSeats(newSeats);
    }

    // Função para revogar a posse do contrato pelo administrador atual
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Novo proprietario invalido");
        owner = newOwner;
    }
}