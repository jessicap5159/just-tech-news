// This file is for collecting and exporting User model data

const User = require('./User'); // Import the User model
const Post = require('./Post');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Post }; // Export an object with the User model as a property
