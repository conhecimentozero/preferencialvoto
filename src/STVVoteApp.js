import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import STVVote from './STVVote.json'; // ABI do contrato inteligente
import { validatePreferences } from './STVVoteUtils'; // Função de validação de preferências

const STVVoteApp = () => {
    const [candidates, setCandidates] = useState([]);
    const [account, setAccount] = useState('');
    const [preferences, setPreferences] = useState([]);
    const [message, setMessage] = useState('');
    const [contract, setContract] = useState(null);

    // Inicialização do web3 e contrato inteligente
    useEffect(() => {
        const initBlockchain = async () => {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                try {
                    await window.ethereum.enable();
                    const accounts = await web3.eth.getAccounts();
                    setAccount(accounts[0]);

                    const networkId = await web3.eth.net.getId();
                    const deployedNetwork = STVVote.networks[networkId];
                    const instance = new web3.eth.Contract(
                        STVVote.abi,
                        deployedNetwork && deployedNetwork.address
                    );
                    setContract(instance);

                    const candidateNames = await instance.methods.getCandidates().call();
                    setCandidates(candidateNames);
                } catch (error) {
                    console.error('Erro ao conectar ao blockchain', error);
                }
            } else {
                console.error('MetaMask não detectado');
            }
        };
        initBlockchain();
    }, []);

    // Manipulador de eventos para registrar as preferências dos eleitores
    const handleVote = async (event) => {
        event.preventDefault();
        if (!validatePreferences(preferences, candidates.length)) {
            setMessage('Por favor, insira preferências válidas.');
            return;
        }

        try {
            await contract.methods.vote(preferences).send({ from: account });
            setMessage('Voto registrado com sucesso!');
        } catch (error) {
            console.error('Erro ao registrar o voto', error);
            setMessage('Houve um erro ao registrar seu voto.');
        }
    };

    // Renderização dos inputs de preferências de candidatos
    const renderVoteInputs = () => {
        return candidates.map((candidate, index) => (
            <div key={index}>
                <label>Prioridade {index + 1}:</label>
                <select
                    value={preferences[index] || ''}
                    onChange={(e) => {
                        const updatedPreferences = [...preferences];
                        updatedPreferences[index] = e.target.value;
                        setPreferences(updatedPreferences);
                    }}
                >
                    <option value="">Selecione um candidato</option>
                    {candidates.map((c, i) => (
                        <option key={i} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>
        ));
    };

    return (
        <div>
            <h1>Sistema de Votação STV</h1>
            <p>Conectado como: {account}</p>
            <form onSubmit={handleVote}>
                {renderVoteInputs()}
                <button type="submit">Registrar Voto</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default STVVoteApp;