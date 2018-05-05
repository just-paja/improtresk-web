/* eslint-disable no-template-curly-in-string */
export default {
  forms: {
    badDateFormat: 'Zadejte datum v mezinárodní formátu ISO-8601.',
    notOldEnough: 'Pole ${label} nesplňuje věkový limit',
    fieldRequired: 'Pole ${label} nesmí být prázdné',
    unknownError: 'Neznámá chyba',
    notAnEmail: 'Pole ${label} neobsahuje veřejnou e-mailovou adresu',
    notAHumanName: 'Nevěříme, že pole ${label} obsahuje lidské jméno.',
    errors: {
      unauthorized: 'Neplatná kombinace uživatelského jména nebo hesla',
      'api-error': 'Chyba komunikace s API',
      'invalid-token': 'Neplatný token, operace nebyla autorizována',
      'workshop-is-full': 'Workshop je plný',
      'unknown-object': 'Byl požadován neznámý objekt',
      'must-be-owner': 'Žadatel změny musí být vlastníkem objednávky',
      'make-reservation-first': 'Před změnou workshopu si nejprve vytvořte rezervaci',
      'no-matching-price-level': 'K požadované změně neexistuje odpovídající cenová hladina',
      'email-already-exists': 'E-mail již máme v databázi. Je možné, že už účet máš a jen si nepamatuješ heslo?',
      'must-be-eighteen': 'Musí ti být osmnáct.',
      'must-accept-rules': 'Musíš souhlasit s pravidly festivalu',
    },
    tooLong: 'Hodnota ${label} je příliš dlouhá.',
    tooShort: 'Hodnota ${label} je příliš krátká.',
  },
};
