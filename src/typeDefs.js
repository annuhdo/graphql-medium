const typeDefs = `
  type Query {
    medium(username: String!): MediumType
  },
  type MediumType {
    user: UserType,
    posts: [PostType]
  },
  type UserType {
    username: String,
    name: String,
    image: String,
    link: String
  },
  type PostType {
    title: String,
    link: String,
    author: String,
    published: String,
    content: String
  }
`;

module.exports = {
  typeDefs
};
