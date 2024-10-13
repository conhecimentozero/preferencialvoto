// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./STVVote.sol";

contract STVVoteMigration {
    address public stvVoteAddress;

    event MigrationStarted(address indexed admin, string[] candidateNames, uint numberOfSeats);
    event MigrationCompleted(address indexed stvVoteAddress, string[] candidateNames, uint numberOfSeats);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Apenas o administrador pode realizar esta ação.");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function deploySTVVote(string[] memory candidateNames, uint numberOfSeats) 
        public 
        onlyAdmin 
        returns (address) 
    {
        require(candidateNames.length > 0, "A lista de candidatas não pode estar vazia.");
        require(numberOfSeats > 0, "O número de vagas deve ser maior que zero.");

        // Inicializa o contrato do STVVote com as candidatas e o número de cadeiras
        STVVote stvVote = new STVVote(candidateNames, numberOfSeats);
        stvVoteAddress = address(stvVote);

        // Emite um evento de que a migração foi iniciada
        emit MigrationStarted(msg.sender, candidateNames, numberOfSeats);

        // Emite um evento ao final da migração
        emit MigrationCompleted(stvVoteAddress, candidateNames, numberOfSeats);

        return stvVoteAddress;
    }

    function getSTVVoteAddress() public view returns (address) {
        return stvVoteAddress;
    }
}