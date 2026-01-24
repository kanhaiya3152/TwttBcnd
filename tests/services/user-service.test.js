import userService from '../../src/service/user-service.js'
import  UserRepository  from '../../src/repository/user-repository.js'

jest.mock('../../src/repository/user-repository.js')

describe('user authenticate', () => {
    test('Testing signup ', async () => { 
        const data = {
            email : 'abc@gmail.com',
            password : '12345'
        };
        (UserRepository.prototype.create).mockReturnValue({...data, createdAt: '2022-12-12', updatedAt: '2022-12-12'});

        const service = new userService();
        const response = await service.signup();
        expect(response.email).toBe(data.email);
    })
})