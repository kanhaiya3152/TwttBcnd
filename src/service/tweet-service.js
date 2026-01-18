import {TweetRepository, HashtagRepository} from '../repository/index';

class TweetService {
    constructor(){
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data) {
        const content = data.content;
        const tags = content.match(/#[a-zA-Z0-9]+/g)
                            .map((tag)=> tag.substring(1))
                            .map(tag => tag.toLowerCase()) // this regex extracts hashtag and if any hashtag in capital then it converts into small
                            
        console.log(tags); // gives all the hashtags which present in the content
        const tweet = await this.tweetRepository.create(data);
        let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
        alreadyPresentTags = alreadyPresentTags.map(tag => tag.title);
        let newTags = tags.filter(tag => !alreadyPresentTags.includes(tag)); 
        newTags = newTags.map(tag => {
            return {title:tag, tweets: [tweet.id]}
        })
        await this.hashtagRepository.bulkCreate(newTags) // it create new data with newTags using bulkcreate 
        alreadyPresentTags.forEach((tag) => { // add the new tweet id if the hasgtag is already present    
            tag.tweets.push(tweet.id);
            tag.save();
        })
        // todo create hashtag and add here
        // 1. bulcreate in mongoose
        // 2. filter title of hashtag based on multuple tags
        //3. How to add tweet id inside all the hasgtags 
        return tweet;
    }
}

export default TweetService;