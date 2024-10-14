# Votação STV com Prova de Conhecimento Zero

Este projeto consiste em um sistema de votação baseado no método de Voto Único Transferível (STV - Single Transferable Vote), implementado em uma blockchain, com transição validada por prova de conhecimento zero (ZKP - Zero Knowledge Proof). A aplicação possui um front-end React para interação com os eleitores e um contrato inteligente Solidity para processar e registrar os votos diretamente na blockchain.

## Funcionalidades

- **Votação STV**: Implementa o método STV para garantir uma eleição justa, permitindo que cada eleitor classifique suas preferências de candidatos.
- **Integração com Blockchain**: Usa contratos inteligentes para registrar votos e calcular os resultados através da tecnologia de blockchain.
- **Prova de Conhecimento Zero**: Valida a transição de estados no processo de votação, garantindo a privacidade e segurança do voto sem expor informações sensíveis.
- **UI React**: Interface de usuário construída em React, permitindo aos eleitores selecionar suas preferências de candidatos e registrar seus votos.

## Estrutura do Sistema

### Front-End

A aplicação front-end é construída utilizando **React**. O principal componente é o `STVVoteFrontEnd`, que gerencia o estado e a interação do usuário. Ele se comunica com o serviço de blockchain para carregar dados e registrar os votos dos eleitores.

- **Gerenciamento de Estado**: O estado dos candidatos e da conta do usuário é gerenciado utilizando hooks do React (`useState`, `useEffect`).
- **Componentes Separados**: A lista de candidatos é renderizada através de um componente separado chamado `CandidateList`, promovendo a segregação de responsabilidades (SRP).

### Back-End (Blockchain)

O back-end é implementado utilizando **Solidity** para os contratos inteligentes, que são implantados em uma rede Ethereum. O serviço de blockchain é abstraído no `BlockchainService`, responsável por interagir com a blockchain, carregar dados e registrar votos.

- **BlockchainService**: Este serviço carrega os dados da blockchain, como a conta do usuário e a lista de candidatas, e permite o registro dos votos [[4]](https://poe.com/citation?message_id=269495381624&citation=4).
- **Contrato Inteligente**: O contrato inteligente `PreferencialVoto` é responsável por armazenar os dados da eleição, como os votos e os candidatos, e processar o resultado final com base no método STV.

### Configuração do Projeto

O compilador Solidity utilizado é a versão 0.8.0, com otimizações habilitadas para garantir a eficiência do contrato inteligente.

## Instalação

### Pré-requisitos

- **Node.js**: Certifique-se de ter o Node.js instalado em sua máquina.
- **Ganache** ou outro provedor de blockchain local para testes.
- **MetaMask**: Extensão de navegador para interagir com a blockchain.

### Passos de Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/stv-voting-system.git
   cd stv-voting-system
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Compile os contratos inteligentes:
   ```bash
   truffle compile
   ```

4. Implante os contratos na blockchain local:
   ```bash
   truffle migrate --network development
   ```

5. Inicie o servidor de desenvolvimento React:
   ```bash
   npm start
   ```

6. Conecte-se à aplicação utilizando a extensão MetaMask para interagir com a blockchain.

## Uso

1. **Conectar à Blockchain**: Ao carregar a aplicação, ela tentará se conectar automaticamente à blockchain utilizando o MetaMask.
2. **Seleção de Candidatos**: Os eleitores podem visualizar a lista de candidatos disponíveis e selecionar suas preferências.
3. **Registrar Voto**: Os eleitores submetem suas preferências, que são registradas na blockchain através do contrato inteligente.

## Testes

O projeto inclui scripts de teste para garantir o correto funcionamento dos contratos inteligentes.

1. Para rodar os testes, utilize o comando:
   ```bash
   truffle test
   ```

Os testes são configurados para rodar com um timeout de 100.000 milissegundos, garantindo que os processos de validação e prova de conhecimento zero tenham tempo suficiente para completar.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

### Regras de Contribuição

- Mantenha o código modular e siga os princípios do SOLID.
- Teste extensivamente qualquer mudança feita nos contratos inteligentes ou na lógica de votação.
- Certifique-se de que o sistema de prova de conhecimento zero esteja preservado e funcionando corretamente.

## Licença

Este projeto está licenciado sob a [MIT License].
