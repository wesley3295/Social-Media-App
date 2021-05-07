const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;


//dummy data
var users = [
    { name: 'Wesley Spencer', email: 'wesley3295@gmail.com', password: 'wesley',age:26, id: "1" },
    { name: 'LeeAnna Spencer', email: 'leeanna102793@gmail.com', password: 'leeanna',age:26, id: "2" },
    { name: 'Rosie Spencer', email: 'rosie072720@gmail.com', password: 'rosie',age:1, id: "3" }
]
var messages = [
    { content: 'Hey, how are you?', id: '1',userId:"1" },
    { content: 'Good, and you?', id: '2',userId:"2" },
    { content: 'Googoo Gaga', id: '3',userId:"3" },
    { content: 'Want to catch a movie later?', id: '4',userId:"1" },
    { content: 'Sure what time?', id: '5',userId:"2" },
    { content: '3pm?', id: '6',userId:"1" }
]


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        age: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        messages:{
            type: GraphQLList(MessageType),
            resolve(parent,type){
                return _.filter(messages,{userId:parent.id})
            }
        }
    })
})

const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        user:{ 
        type: UserType,
        resolve(parent,args){
            return _.find(users,{id:parent.userId})
        }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //code to get data from db/other source
                return _.find(users, { id: args.id })
            }
        },
        message: {
            type: MessageType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //code to get data from db/other source
                return _.find(messages, { id: args.id })
            }
        },
        messages:{
            type: GraphQLList(MessageType),
            resolve(parent,args){
               return messages
            }
        },
        users:{
            type: GraphQLList(UserType),
            resolve(parent,args){
               return users
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
