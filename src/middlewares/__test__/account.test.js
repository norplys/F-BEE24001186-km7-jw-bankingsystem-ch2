import { describe, jest } from '@jest/globals';
import { AccountService } from '../../services/account';
import { checkSourceAccountExist, checkDestinationAccountExist } from '../account';

// Mock the AccountService class
jest.mock('../../services/account');

describe('checkSourceAccountExist', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {
            body: {
                sourceAccountNumber: '1234',
                amount: 100,
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {},
        };
        next = jest.fn();

        // Reset the mock implementation for each test
        AccountService.prototype.getAccountByAccountNumber = jest.fn();
    });

    it('should return 404 if account does not exist', async () => {
        // Mock the method to return null (account not found)
        AccountService.prototype.getAccountByAccountNumber.mockResolvedValue(null);

        await checkSourceAccountExist(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Source account doesn't exist" });
    });

    it('should return 400 if account balance is less than amount', async () => {
        // Mock the method to return an account with insufficient balance
        AccountService.prototype.getAccountByAccountNumber.mockResolvedValue({ balance: 50 });

        await checkSourceAccountExist(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Insufficient balance" });
    });

    it('should set account in locals and call next', async () => {
        // Mock the method to return an account with sufficient balance
        AccountService.prototype.getAccountByAccountNumber.mockResolvedValue({ balance: 200 });

        await checkSourceAccountExist(req, res, next);

        expect(res.locals.account).toEqual({ balance: 200 });
        expect(next).toHaveBeenCalled();
    });

    it('should return 500 if an error occurs', async () => {
        // Mock the method to throw an error
        AccountService.prototype.getAccountByAccountNumber.mockRejectedValue(new Error('Internal server error'));

        await checkSourceAccountExist(req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
    });
});

describe('checkDestinationAccountExist', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {
            body: {
                destinationAccountNumber: '1234',
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {},
        };
        next = jest.fn();

        // Reset the mock implementation for each test
        AccountService.prototype.getAccountByAccountNumber = jest.fn();
    });

    it('should return 404 if account does not exist', async () => {
        // Mock the method to return null (account not found)
        AccountService.prototype.getAccountByAccountNumber.mockResolvedValue(null);

        await checkDestinationAccountExist(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Destination account doesn't exist" });
    });

    it('should set account in locals and call next', async () => {
        // Mock the method to return an account
        AccountService.prototype.getAccountByAccountNumber.mockResolvedValue({ balance: 200 });

        await checkDestinationAccountExist(req, res, next);

        expect(res.locals.destAccount).toEqual({ balance: 200 });
        expect(next).toHaveBeenCalled();
    });

    it('should return 500 if an error occurs', async () => {
        // Mock the method to throw an error
        AccountService.prototype.getAccountByAccountNumber.mockRejectedValue(new Error('Internal server error'));

        await checkDestinationAccountExist(req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
    });
}   );


