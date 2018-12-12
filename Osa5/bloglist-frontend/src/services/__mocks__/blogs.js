let token = null

const blogs = [
    {
        id: "5c0ffa4c951e36254c490d3f",
        title: "testi",
        author: "www",
        url: "http://www.helsinki.fi",
        likes: 0,
        user: {
            _id: "5c0a734d23b752155037d465",
            username: "AzureDiamond",
            name: "T.est"
        }
    },
    {
        id: "5c1006a0951e36254c490d40",
        title: "Hyvä blogi",
        author: "Muumi",
        url: "http://www.helsinki.fi",
        likes: 0,
        user: {
            _id: "5c0ac43fab2f151e5c2d5b3d",
            username: "Muumi",
            name: "T.est"
        }
    },
    {
        id: "5c1017a27acec31df8c64ed4",
        title: "PropTypes",
        author: "Testi",
        url: "mistä minä tietäisisn",
        likes: 0,
        user: {
            _id: "5c0a734d23b752155037d465",
            username: "AzureDiamond",
            name: "T.est"
        }
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

const setToken = () => {
}

export default {getAll, blogs, setToken}
