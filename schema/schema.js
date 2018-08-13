const graphql = require("graphql");
const Book = require("../models/book");
const Author = require("../models/author");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      async resolve(parent, _) {
        // return authors.find(author => author.id == parent.authorid);
        return await Author.findById(parent.authorid);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, _) {
        return await Book.find({ authorid: parent.id });
      }
    }
  }
});

// this query is entered first to get access to all data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      //   arguments to pass to resolve
      args: { id: { type: GraphQLID } },
      async resolve(_, args) {
        //   write code to get the data we need from a db or other source
        return await Book.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      async resolve() {
        return await Book.find({});
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      async resolve(_, args) {
        return await Author.findById(args.id);
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      async resolve() {
        return await Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      async resolve(_, args) {
        const authorModel = {
          name: args.name,
          age: args.age
        };
        return await author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorid: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(_, args) {
        let book = new Book({
          title: args.title,
          genre: args.genre,
          authorid: args.authorid
        });
        return await book.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
