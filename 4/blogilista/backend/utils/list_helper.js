
const totalLikes = (blogs) => {
    return blogs.reduce((sum, accumulator) => sum + accumulator.likes, 0);
}

const favoriteBlog = (blogs) => {
    return Math.max(...blogs.map(blog => blog.likes))
}

module.exports = {
    totalLikes,
    favoriteBlog
}
