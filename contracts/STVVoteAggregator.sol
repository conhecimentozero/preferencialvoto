// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./STVVote.sol"; // Importar contrato STVVote
import "./AdminUtils.sol"; // Ferramentas de administração

contract STVVoteAggregator {

    // Estado do contrato
    address public owner;
    STVVote[] public voteContracts;

    // Evento para registrar a adição de um novo contrato de votação
    event VoteContractAdded(address voteContractAddress);

    // Modificador para garantir que apenas o proprietário pode executar certas funções
    modifier onlyOwner() {
        require(msg.sender == owner, "Apenas o proprietario pode executar esta acao");
        _;
    }

    // Construtor do contrato de agregação
    constructor() {
        owner = msg.sender;
    }

    // Função para adicionar contratos de votação STV ao agregador
    function addVoteContract(address voteContractAddress) public onlyOwner {
        STVVote voteContract = STVVote(voteContractAddress);
        voteContracts.push(voteContract);
        emit VoteContractAdded(voteContractAddress);
    }

    // Função para agregar resultados de todos os contratos de votação
    function aggregateResults() public view returns (string[] memory, uint[] memory) {
        require(voteContracts.length > 0, "Nenhum contrato de voto adicionado");

        // Agregar os resultados de todos os contratos de votação
        uint totalCandidates = voteContracts[0].getCandidateCount();
        string[] memory candidateNames = new string[](totalCandidates);
        uint[] memory aggregatedVotes = new uint[](totalCandidates);

        for (uint i = 0; i < voteContracts.length; i++) {
            (string[] memory names, uint[] memory votes) = voteContracts[i].getResults();
            for (uint j = 0; j < totalCandidates; j++) {
                candidateNames[j] = names[j];
                aggregatedVotes[j] += votes[j];
            }
        }

        return (candidateNames, aggregatedVotes);
    }

    // Função para finalizar o processo de contagem em todos os contratos
    function finalizeAllVotes() public onlyOwner {
        for (uint i = 0; i < voteContracts.length; i++) {
            voteContracts[i].countVotes();
        }
    }

    // Função para obter o status de votação de todos os contratos
    function getVotingStatuses() public view returns (bool[] memory) {
        bool[] memory statuses = new bool[](voteContracts.length);
        for (uint i = 0; i < voteContracts.length; i++) {
            statuses[i] = voteContracts[i].isVotingActive();
        }
        return statuses;
    }

    // Função para transferir a propriedade do contrato de agregação
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Novo proprietario invalido");
        owner = newOwner;
    }
}