import {getTweet} from '../../src/controllers/tweet-controller.js';
import TweetService from '../../src/service/tweet-service.js';
import { mockRequest, mockResponse } from '../mocker.js';

jest.mock('../../src/service/tweet-service.js');

test('should return tweets', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const response = [
        {
            content: 'Tweet 1'
        }, 
        {
            content: 'Tweet 2'
        }
    ];
    TweetService.prototype.get = jest.fn().mockResolvedValue(response);
    await getTweet(req, res);
    expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Successfully fetched a tweet from service',
        data: response,
        err: {}
    });
})


