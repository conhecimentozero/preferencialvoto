// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract STVVoteEvents {

    // Evento emitido quando um voto é lançado, com as preferências do eleitor
    event VoteCast(address indexed voter, uint[] preferences);

    // Evento emitido quando os votos são contados e os vencedores são determinados
    event VotesCounted(string[] winners);

    // Evento emitido quando uma candidata é eleita ao atingir o quórum
    event CandidateElected(string candidateName, uint voteCount);

    // Evento emitido quando uma candidata é eliminada do processo de contagem de votos
    event CandidateEliminated(string candidateName, uint voteCount);

    // Evento emitido quando a votação é oficialmente iniciada
    event VotingStarted();

    // Evento emitido quando a votação é oficialmente encerrada
    event VotingEnded();

    // Evento emitido quando um novo contrato de votação STV é criado
    event VoteContractCreated(address voteContractAddress);
}