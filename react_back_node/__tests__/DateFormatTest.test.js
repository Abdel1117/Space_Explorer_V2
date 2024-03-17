const formatDateToDDMMYYYY = require('../Functions/DateFormat/DateFormat');

describe('formatDateToDDMMYYYY', () => {
    it('devrait formater une date en DD-MM-YYYY', () => {
        const testDate = new Date(2023, 0, 1);
        const formattedDate = formatDateToDDMMYYYY(testDate);

        expect(formattedDate).toBe('01-01-2023');
    });


});
