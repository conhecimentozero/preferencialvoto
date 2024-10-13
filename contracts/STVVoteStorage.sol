// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract STVVoteStorage {

    // Estrutura para armazenar os dados das candidatas
    struct Candidate {
        string name;
        uint voteCount;
    }

    // Estrutura para armazenar os dados dos eleitores e suas preferências
    struct Ballot {
        address voter;
        uint[] preferences;
        bool voted;
    }

    // Estado do contrato
    address public owner;
    Candidate[] public candidates;
    mapping(address => Ballot) public ballots;
    uint public totalVotes;
    uint public seats;

    // Modificador para garantir que apenas o proprietário possa executar certas funções
    modifier onlyOwner() {
        require(msg.sender == owner, "Apenas o proprietario pode executar esta acao");
        _;
    }

    // Construtor para inicializar o contrato com as candidatas e o número de cadeiras
    constructor(string[] memory candidateNames, uint _seats) {
        owner = msg.sender;
        seats = _seats;
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({
                name: candidateNames[i],
                voteCount: 0
            }));
        }
    }

    // Função para registrar um voto no armazenamento
    function storeVote(address voter, uint[] memory preferences) public onlyOwner {
        require(!ballots[voter].voted, "Eleitor ja votou");
        require(preferences.length == candidates.length, "Numero de preferencias invalido");

        ballots[voter] = Ballot({
            voter: voter,
            preferences: preferences,
            voted: true
        });

        totalVotes++;
    }

    // Função para atualizar a contagem de votos de uma candidata
    function updateCandidateVoteCount(uint candidateIndex, uint newVoteCount) public onlyOwner {
        require(candidateIndex < candidates.length, "Indice de candidata invalido");
        candidates[candidateIndex].voteCount = newVoteCount;
    }

    // Função para obter as preferências de um eleitor
    function getVoterPreferences(address voter) public view returns (uint[] memory) {
        return ballots[voter].preferences;
    }

    // Função para verificar se um eleitor já votou
    function hasVoted(address voter) public view returns (bool) {
        return ballots[voter].voted;
    }

    // Função para retornar o total de votos e a lista de candidatas com suas respectivas contagens de votos
    function getResults() public view returns (string[] memory, uint[] memory) {
        string[] memory candidateNames = new string[](candidates.length);
        uint[] memory voteCounts = new uint[](candidates.length);

        for (uint i = 0; i < candidates.length; i++) {
            candidateNames[i] = candidates[i].name;
            voteCounts[i] = candidates[i].voteCount;
        }

        return (candidateNames, voteCounts);
    }
}