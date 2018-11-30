const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    if (blogs.length === 0) {return 0}    
    return blogs.reduce(((sum, blog) => {return sum + blog.likes}), 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {return 0}
    return blogs.reduce(((first, blog) => {return first.likes > blog.likes? first : blog}), blogs[0])
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}