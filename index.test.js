const axios = require('axios')

test('get all', async () => {
    const response = await axios.get('http://localhost:3001/api/persons')
    expect(response.status).toBe(200)
});

test('get info', async () => {
    const response = await axios.get('http://localhost:3001/api/info')
    expect(response.status).toBe(200)
    expect(response.data).toContain("Phonebook has info for")
});

test('get person', async () => {
    const response = await axios.get('http://localhost:3001/api/persons/63428d31b5ef7b056bfc7e52')
    expect(response.status).toBe(200)
    expect(response.data).toEqual(
        { id: "63428d31b5ef7b056bfc7e52", name: "Alex", number: "123" })
});

test('update person', async () => {
    const person = { name: "Matt", number: "99-123456" }
    const response = await axios.put('http://localhost:3001/api/persons/63428d4af2b5fd2657caa774', person)
    expect(response.status).toBe(200)
    expect(response.data).toEqual(
        { id: "63428d4af2b5fd2657caa774", name: "Matt", number: "99-123456" }
    )
});

test('update person empty number', async () => {
    try {
        const person = { name: "Matt", number: "1" }
        const response = await axios.put('http://localhost:3001/api/persons/63428d4af2b5fd2657caa774', person)
        expect(response.status).toBe(201)
    }
    catch (error) {
        expect(error.response.status).toBe(400)
        expect(error.response.data.error).toContain('Validation failed: number');
    }
});

test('update person invalid id', async () => {
    try {
        const person = { name: "Matt", number: "999" }
        const response = await axios.put('http://localhost:3001/api/persons/xxx', person)
    } catch (error) {
        expect(error.response.status).toBe(400)
    }
});

test('get person not existing id', async () => {
    try {
        await axios.get('http://localhost:3001/api/persons/6341c41ba3d55c294596ca6b')
    } catch (error) {
        expect(error.response.status).toBe(404)
    }
});

test('delete person', async () => {
    try {
        await axios.delete('http://localhost:3001/api/persons/6341c41ba3d55c294596ca6b')
    } catch (error) {
        expect(error.response.status).toBe(204)
    }
});

test('delete person invalid ID', async () => {
    try {
        await axios.delete('http://localhost:3001/api/persons/xxx')
    } catch (error) {
        expect(error.response.status).toBe(400)
    }
});

test('get person malformed id', async () => {
    try {
        await axios.get('http://localhost:3001/api/persons/invalid')
    } catch (error) {
        expect(error.response.status).toBe(400)
        expect(error.response.data).toEqual({ error: "malformatted id" })
    }
});

test('create with no name', async () => {
    expect.assertions(2);
    try {
        const no_name = {}
        await axios.post('http://localhost:3001/api/persons', no_name)
    } catch (e) {
        expect(e.response.status).toBe(400)
        expect(e.response.data.error).toContain('Person validation failed: name');
    }
});

test('create no number', async () => {
    expect.assertions(2);
    try {
        const no_number = { name: "Alex" }
        await axios.post('http://localhost:3001/api/persons', no_number)
    } catch (e) {
        expect(e.response.status).toBe(400)
        expect(e.response.data.error).toContain('Person validation failed: number');
    }
});

test('create invalid number, valid form is xx-xxxxxx', async () => {
    expect.assertions(2);
    try {
        const no_number = { name: "Alex", number: "12345678" }
        await axios.post('http://localhost:3001/api/persons', no_number)
    } catch (e) {
        expect(e.response.status).toBe(400)
        expect(e.response.data.error).toContain('is not a valid phone number!');
    }
});

test('create happy path', async () => {
    const person = { name: "Matt", number: "12-123456" }
    const response = await axios.post('http://localhost:3001/api/persons', person)
    expect(response.status).toBe(200)

    const personCreated = response.data
    expect(personCreated.id).not.toBe(0)
    expect(person).toEqual({ name: personCreated.name, number: personCreated.number });
});
