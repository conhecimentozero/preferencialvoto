import React, { useState, useEffect } from 'react';
import BlockchainService from './services/BlockchainService';  // Inversão de dependência (DIP)
import CandidateList from './components/CandidateList';        // Segregação de responsabilidades (SRP)

// Componente principal do Front-End, responsável por gerenciar o estado e a interação do usuário.
const STVVoteFrontEnd = () => {
    const [candidates, setCandidates] = useState([]);
    const [account, setAccount] = useState('');

    // Carregamento inicial dos dados da blockchain.
    useEffect(() => {
        loadBlockchainData();
    }, []);

    // Função responsável por carregar os dados da blockchain usando o serviço de abstração.
    const loadBlockchainData = async () => {
        const { account, candidates } = await BlockchainService.loadBlockchainData();
        setAccount(account);
        setCandidates(candidates);
    };

    // Função para registrar o voto do usuário.
    const handleVote = async (preferences) => {
        await BlockchainService.vote(preferences, account);
    };

    return (
        <div>
            <h2>Candidates</h2>
            {/* Componente separado para renderizar a lista de candidatas */}
            <CandidateList candidates={candidates} />
            <button onClick={() => handleVote([0, 1, 2])}>Vote for Top 3</button>
        </div>
    );
};

export default STVVoteFrontEnd;