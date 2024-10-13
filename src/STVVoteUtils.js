// STVVoteUtils.js

/**
 * Valida as preferências dos eleitores.
 * Segue o princípio de responsabilidade única, onde esta função apenas valida as preferências.
 * @param {Array} preferences - As preferências de voto do eleitor.
 * @param {Number} totalCandidates - Número total de candidatas disponíveis.
 * @returns {Boolean} - Retorna true se as preferências forem válidas, false caso contrário.
 */
export const validatePreferences = (preferences, totalCandidates) => {
    if (!Array.isArray(preferences)) {
        throw new Error('As preferências devem ser uma matriz.');
    }

    // Verifica se o número mínimo de preferências foi atendido
    if (preferences.length === 0) {
        return false;
    }

    // Verifica se todas as preferências são válidas e únicas
    const uniquePreferences = new Set(preferences);
    for (let preference of preferences) {
        if (typeof preference !== 'string' || preference.trim() === '') {
            return false;
        }
        if (uniquePreferences.size !== preferences.length) {
            return false;
        }
    }

    // Verifica se as preferências estão dentro do intervalo permitido de candidatas
    if (preferences.length > totalCandidates) {
        return false;
    }

    return true;
};

/**
 * Normaliza a entrada do eleitor.
 * Segue o princípio de responsabilidade única, onde esta função apenas organiza as preferências em um formato padrão.
 * @param {Array} preferences - As preferências de voto do eleitor.
 * @param {Array} validCandidates - Lista de candidatas válidas.
 * @returns {Array} - Retorna as preferências normalizadas.
 */
export const normalizePreferences = (preferences, validCandidates) => {
    return preferences
        .filter(pref => validCandidates.includes(pref))
        .map(pref => pref.trim());
};

/**
 * Função para verificar se o voto está completo.
 * Segue o princípio aberto/fechado, permitindo que a lógica de validação de completude seja facilmente estendida.
 * @param {Array} preferences - As preferências de voto do eleitor.
 * @param {Number} minimumChoices - Número mínimo de escolhas exigidas.
 * @returns {Boolean} - Retorna true se o voto estiver completo, false caso contrário.
 */
export const isVoteComplete = (preferences, minimumChoices) => {
    return preferences.length >= minimumChoices;
};