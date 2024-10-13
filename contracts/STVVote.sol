// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VoteCountingEvents.sol";
import "./VoteCountingUtils.sol";

contract STVVote is VoteCountingEvents {
    
    // Estrutura da candidata
    struct Candidate {
        string name;
        uint voteCount;
    }

    // Estrutura do voto
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

    // Evento para registrar voto
    event Voted(address voter, uint[] preferences);

    // Modificador para garantir que apenas o proprietário pode executar certas funções
    modifier onlyOwner() {
        require(msg.sender == owner, "Apenas o proprietario pode executar esta acao");
        _;
    }

    // Construtor do contrato
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

    // Função para registrar o voto do eleitor
    function vote(uint[] memory preferences) public {
        require(!ballots[msg.sender].voted, "Eleitor ja votou");
        require(preferences.length == candidates.length, "Numero de preferencias invalido");

        // Registrar o voto
        ballots[msg.sender] = Ballot({
            voter: msg.sender,
            preferences: preferences,
            voted: true
        });

        emit Voted(msg.sender, preferences);
        totalVotes++;
    }

    // Função para contar os votos usando o algoritmo STV
    function countVotes() public onlyOwner {
        // Implementação de lógica STV simplificada
        uint quota = totalVotes / (seats + 1) + 1;
        bool[] memory elected = new bool[](candidates.length);
        uint electedCount = 0;

        // Verificar se já existem vencedores suficientes
        while(electedCount < seats) {
            // Passo 1: Distribuir votos para as candidatas conforme as preferências
            for (uint i = 0; i < totalVotes; i++) {
                Ballot storage ballot = ballots[address(i)];
                for (uint j = 0; j < ballot.preferences.length; j++) {
                    uint candidateIndex = ballot.preferences[j];
                    if (!elected[candidateIndex]) {
                        candidates[candidateIndex].voteCount++;
                        break;
                    }
                }
            }

            // Passo 2: Verificar candidatas eleitas
            for (uint i = 0; i < candidates.length; i++) {
                if (candidates[i].voteCount >= quota && !elected[i]) {
                    elected[i] = true;
                    electedCount++;
                    redistributeVotes(i, quota);
                }
            }

            // Passo 3: Eliminar candidatas com menos votos
            if (electedCount < seats) {
                uint minVoteCount = type(uint).max;
                uint minCandidateIndex = 0;

                for (uint i = 0; i < candidates.length; i++) {
                    if (candidates[i].voteCount < minVoteCount && !elected[i]) {
                        minVoteCount = candidates[i].voteCount;
                        minCandidateIndex = i;
                    }
                }

                redistributeVotes(minCandidateIndex, 0);
            }
        }
    }

    // Função para redistribuir os votos de uma candidata eleita ou eliminada
    function redistributeVotes(uint candidateIndex, uint quota) internal {
        for (uint i = 0; i < totalVotes; i++) {
            Ballot storage ballot = ballots[address(i)];
            if (ballot.preferences[0] == candidateIndex) {
                for (uint j = 1; j < ballot.preferences.length; j++) {
                    uint nextPreferredCandidate = ballot.preferences[j];
                    if (nextPreferredCandidate != candidateIndex) {
                        candidates[nextPreferredCandidate].voteCount++;
                        break;
                    }
                }
            }
        }
    }

    // Função para retornar os resultados da votação
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