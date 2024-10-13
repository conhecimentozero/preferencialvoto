const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('STVVote Contract', function () {
  let STVVote;
  let stvVote;
  let owner;
  let addr1;
  let addr2;
  let candidates;

  beforeEach(async function () {
    // Define os participantes e as candidatas
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    candidates = [
      "Tainá de Paula (PT)",
      "Rosa Fernandes (PSD)",
      "Joyce Trindade (PSD)",
      "Helena Vieira (PSD)",
      "Vera Lins (PP)",
      "Monica Benicio (PSOL)",
      "Tânia Bastos (REPUBLICANOS)",
      "Talita Galhardo (PSDB)",
      "Thais Ferreira (PSOL)",
      "Tatiana Roque (PSB)",
      "Maíra do MST (PT)",
      "Gigi Castilho (REPUBLICANOS)"
    ];

    // Implementa o contrato inteligente STVVote
    STVVote = await ethers.getContractFactory('STVVote');
    stvVote = await STVVote.deploy(candidates);
    await stvVote.deployed();
  });

  describe('Deployment', function () {
    it('Deve configurar corretamente o dono do contrato', async function () {
      expect(await stvVote.owner()).to.equal(owner.address);
    });

    it('Deve inicializar com a lista correta de candidatas', async function () {
      const contractCandidates = await stvVote.getCandidates();
      expect(contractCandidates).to.deep.equal(candidates);
    });
  });

  describe('Voting', function () {
    it('Deve permitir que um eleitor registre seu voto', async function () {
      const preferences = [
        "Tainá de Paula (PT)",
        "Rosa Fernandes (PSD)",
        "Joyce Trindade (PSD)"
      ];

      await stvVote.connect(addr1).vote(preferences);
      const voterPreferences = await stvVote.getVoterPreferences(addr1.address);
      expect(voterPreferences).to.deep.equal(preferences);
    });

    it('Não deve permitir votos duplicados', async function () {
      const preferences = [
        "Tainá de Paula (PT)",
        "Rosa Fernandes (PSD)",
        "Joyce Trindade (PSD)"
      ];

      await stvVote.connect(addr1).vote(preferences);
      await expect(stvVote.connect(addr1).vote(preferences)).to.be.revertedWith(
        'Já votou.'
      );
    });

    it('Deve validar que as preferências de voto são válidas', async function () {
      const invalidPreferences = [
        "Candidata Inexistente",
        "Rosa Fernandes (PSD)"
      ];

      await expect(stvVote.connect(addr1).vote(invalidPreferences)).to.be.revertedWith(
        'Preferência inválida.'
      );
    });
  });

  describe('Counting Votes', function () {
    it('Deve contar os votos corretamente e determinar os vencedores', async function () {
      // Simulação de votos
      const vote1 = ["Tainá de Paula (PT)", "Rosa Fernandes (PSD)", "Joyce Trindade (PSD)"];
      const vote2 = ["Monica Benicio (PSOL)", "Tatiana Roque (PSB)", "Thais Ferreira (PSOL)"];
      const vote3 = ["Gigi Castilho (REPUBLICANOS)", "Tânia Bastos (REPUBLICANOS)", "Helena Vieira (PSD)"];

      await stvVote.connect(addr1).vote(vote1);
      await stvVote.connect(addr2).vote(vote2);
      await stvVote.connect(owner).vote(vote3);

      // Contagem de votos
      const winners = await stvVote.countVotes();
      expect(winners).to.be.an('array').that.is.not.empty;
    });
  });
});