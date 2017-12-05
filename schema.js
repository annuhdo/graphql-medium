const util = require("util");
const parseXML = util.promisify(require("xml2js").parseString);

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

const axios = require("axios");

const mediumAPI = "https://medium.com/feed/";

async function getMediumFeed(username) {
  try {
    const api = `${mediumAPI}@${username}`;
    let mediumFeed = await axios(api);
    mediumFeed = await parseXML(mediumFeed.data);
    return mediumFeed;
  } catch (e) {
    console.error(e);
  }
}

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: (root, args) => {
        return root.title[0];
      }
    },
    link: {
      type: GraphQLString,
      resolve: (root, args) => {
        return root.link[0].split("?")[0];
      }
    },
    author: {
      type: GraphQLString,
      resolve: (root, args) => {
        return root["dc:creator"][0];
      }
    },
    published: {
      type: GraphQLString,
      resolve: (root, args) => {
        return root.pubDate[0];
      }
    },
    content: {
      type: GraphQLString,
      resolve: (root, args) => {
        return root["content:encoded"][0];
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    username: {
      type: GraphQLString,
      resolve: (root, args) => {
        const linkRes = root.rss.channel[0].link[0].split("?")[0];
        return linkRes.split("@")[1];
      }
    },
    name: {
      type: GraphQLString,
      resolve: (root, args) => {
        const xmlName = root.rss.channel[0].title[0].split(" ");
        const nameRes = [];
        for (let i = 2; i < xmlName.length - 2; i++) {
          nameRes.push(xmlName[i]);
        }

        return nameRes.join(" ");
      }
    },
    image: {
      type: GraphQLString,
      resolve: (root, args) => {
        const imageURL = root.rss.channel[0].image[0].url[0];
        return imageURL;
      }
    },
    link: {
      type: GraphQLString,
      resolve: (root, args) => {
        const linkRes = root.rss.channel[0].link[0];
        return linkRes.split("?")[0];
      }
    }
  })
});

const MediumQueryType = new GraphQLObjectType({
  name: "MediumQuery",
  fields: () => ({
    user: {
      type: UserType,
      resolve: (root, args) => {
        return root;
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: (root, args) => {
        return root.rss.channel[0].item;
      }
    }
  })
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    medium: {
      type: MediumQueryType,
      args: {
        username: { type: GraphQLString }
      },
      resolve: async (root, args) => {
        const res = await getMediumFeed(args.username);
        return res;
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: Query
});
