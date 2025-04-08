const cron = require('node-cron');
const Post = require('../models/Post');

const cleanUpOldPosts = () => {

cron.schedule('* * * * *', async () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    try {
        const result = await Post.deleteMany({
            status: {$in: ["accepted", "rejected"]},
            updatedAt: { $lt: thirtyDaysAgo }
        });
        console.log(`${result.deletedCount} old posts deleted`);
    } catch (error) {
        console.error('Error deleting old posts:', error);
        
    }
})
}

module.exports = cleanUpOldPosts;