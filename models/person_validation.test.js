const PhoneNumberValidator = require('./person_validation')

test('number validator', () => {
    expect(PhoneNumberValidator.valid('')).toBeFalsy()
    expect(PhoneNumberValidator.valid('10-12345')).toBeTruthy()
    expect(PhoneNumberValidator.valid('10012345')).toBeFalsy()
    expect(PhoneNumberValidator.valid('1-123456')).toBeFalsy()
    expect(PhoneNumberValidator.valid('123-123456')).toBeTruthy()
});
