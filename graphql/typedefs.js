module.exports = `
    input PostInput {
        content: String
    }

    type Post {
        content: String
    }

    type Mutation {
        createPost(postInput: PostInput): Post
    }

    type Query {
        getPosts: [Post]
    }

    schema {
        query: Query
        mutation: Mutation
    }
`;
