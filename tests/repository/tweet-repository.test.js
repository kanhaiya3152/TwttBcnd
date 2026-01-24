import TweetRepository from '../../src/repository/tweet-repository.js'
import Tweet from '../../src/models/tweet.js';

jest.mock('../../src/models/tweet.js') // for mocking we have to import all that files 
// which are calling in the unit test(means when we try to test the create func in the
//  tweetrepo then the Tweet.create is there and it is commin from model)

describe('Create tweet tests', () => { // we can write multiple test under describe
    test('should create a new tweet ? ', async () => {
        const data = {
            content: 'Testing create tweet'
        }
        const spy = jest.spyOn(Tweet, 'create').mockImplementation(() => {
            return { ...data, createdAt: '22-01-26', updatedAt: '21-01-26' }
        })

        const tweetRepository = new TweetRepository();
        const tweet = await tweetRepository.create(data); 

        expect(spy).toHaveBeenCalled();//it checks the mocking func is working or not(means model wala)
        expect(tweet.content).toBe(data.content);
        expect(tweet.createdAt).toBeDefined();
    });

    test('should not create a tweet and throw exception', async () => {
        const data = {
            content: 'Testing tweet'
        }
        const spy = jest.spyOn(Tweet, 'create').mockImplementation(() => {
            throw new Error('something went wrong');
        });
        const tweetRepository = new TweetRepository();
        const tweet = await tweetRepository.create(data).catch(err => {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('something went wrong');
        });
    });
})


describe('Get all tweet tests', () => {
    test('testing limit for get all',async () => {
        const data = {
            content: 'Testing tweet'
        }
        const tweetsArray =  [{...data, createdAt: '2022-02-12', updatedAt: '2022-02-12'}, {...data, createdAt: '2022-02-12', updatedAt: '2022-02-12'}, {...data, createdAt: '2022-02-12', updatedAt: '2022-02-12'}];
        const findResponse = {tweetsArray};
        findResponse.skip = jest.fn((offset) => findResponse);
        findResponse.limit = jest.fn((limit) => findResponse.tweetsArray.slice(0, limit));
        const spy = jest.spyOn(Tweet, 'find').mockImplementation(() => {
            return findResponse;
        });
        const tweetRepository = new TweetRepository();
        const tweets = await tweetRepository.getAll(0, 2);
        expect(spy).toHaveBeenCalled();
        expect(tweets).toHaveLength(2);
    })
})
