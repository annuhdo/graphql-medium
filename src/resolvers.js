const { getMediumFeed } = require("./connection");

const resolvers = {
  Query: {
    Medium: async (root, args, context) => {
      // const res = await getMediumFeed(args.username);
      // return res;
      return context.feedLoader.load(args.username);
    }
  },
  MediumType: {
    user: (root, args) => {
      return root;
    },
    posts: (root, args) => {
      return root.rss.channel[0].item;
    }
  },
  UserType: {
    username: (root, args) => {
      const linkRes = root.rss.channel[0].link[0].split("?")[0];
      return linkRes.split("@")[1];
    },
    name: (root, args) => {
      const xmlName = root.rss.channel[0].title[0].split(" ");
      const nameRes = [];
      for (let i = 2; i < xmlName.length - 2; i++) {
        nameRes.push(xmlName[i]);
      }

      return nameRes.join(" ");
    },
    image: (root, args) => {
      const imageURL = root.rss.channel[0].image[0].url[0];
      return imageURL;
    },
    link: (root, args) => {
      const linkRes = root.rss.channel[0].link[0];
      return linkRes.split("?")[0];
    }
  },
  PostType: {
    title: (root, args) => {
      return root.title[0];
    },
    link: (root, args) => {
      return root.link[0].split("?")[0];
    },
    author: (root, args) => {
      return root["dc:creator"][0];
    },
    published: (root, args) => {
      return root.pubDate[0];
    },
    content: (root, args) => {
      return root["content:encoded"][0];
    }
  }
};

module.exports = {
  resolvers
};
