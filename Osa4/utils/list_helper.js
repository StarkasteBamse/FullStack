const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    if (blogs.length === 0) { return 0 }
    return blogs.reduce(((sum, blog) => { return sum + blog.likes }), 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) { return 0 }
    return blogs.reduce(((first, blog) => { return first.likes > blog.likes ? first : blog }), blogs[0])
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) { return 0 }

    const counts = []
    let most = blogs[0].author
    for (i = 0; i < blogs.length; i++) {
        let value = blogs[i].author
        if (typeof counts[value] === "undefined") {
            counts[value] = 1
        } else {
            counts[value]++
        }
        if (counts[value] > counts[most]) {
            most = value
        }
    }   
    const biggestBlogger = {'author': most, 'blogs': counts[most]}
    return biggestBlogger
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}