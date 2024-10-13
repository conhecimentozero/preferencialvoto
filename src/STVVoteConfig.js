// STVVoteConfig.js

// Aplicando o princípio da responsabilidade única (SRP):
// Este arquivo é responsável apenas pela configuração das candidatas e das cadeiras disponíveis.

// Encapsulamento das candidatas em uma classe para garantir que a lógica possa ser reutilizada e estendida (OCP).
class Candidate {
    constructor(name, party) {
        this.name = name;
        this.party = party;
    }
}

// Aplicamos o princípio da inversão de dependência (DIP) ao isolar a lista de candidatas em uma função separada.
const getCandidates = () => {
    return [
        new Candidate('Tainá de Paula', 'PT'),
        new Candidate('Rosa Fernandes', 'PSD'),
        new Candidate('Joyce Trindade', 'PSD'),
        new Candidate('Helena Vieira', 'PSD'),
        new Candidate('Vera Lins', 'PP'),
        new Candidate('Monica Benicio', 'PSOL'),
        new Candidate('Tânia Bastos', 'REPUBLICANOS'),
        new Candidate('Talita Galhardo', 'PSDB'),
        new Candidate('Thais Ferreira', 'PSOL'),
        new Candidate('Tatiana Roque', 'PSB'),
        new Candidate('Maíra do MST', 'PT'),
        new Candidate('Gigi Castilho', 'REPUBLICANOS')
    ];
};

// Função para definir o número de cadeiras em disputa, isolado conforme os princípios de modularidade e responsabilidade única (SRP).
const getNumberOfSeats = () => {
    return 5;  // Por exemplo, 5 cadeiras disponíveis na eleição.
};

// Exportamos as funções para que outras partes do sistema possam utilizá-las, respeitando o princípio da substituição de Liskov (LSP).
module.exports = {
    getCandidates,
    getNumberOfSeats
};