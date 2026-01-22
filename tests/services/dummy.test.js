import dummyFunctions from "../../src/service/dummy-service";

test('result first', () => { 

    dummyFunctions.helper = jest.fn(() => true);
    const result = dummyFunctions.execute();
    expect(result).toBe('Learning JS')
}) 