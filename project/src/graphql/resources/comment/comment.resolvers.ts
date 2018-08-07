import { GraphQLResolveInfo } from "graphql";

import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { Transaction } from "../../../../node_modules/@types/sequelize";
import { CommentInstance } from "../../../models/CommentModel";

export const commentResolvers = {

    Comment: {

        user: (user, args, {db}: {db:DbConnection}, info: GraphQLResolveInfo) => {
            return db.User.findById(user.get('user'))
        },

        post: (post, { postId, first = 10, offset = 0 }, {db}: {db:DbConnection}, info: GraphQLResolveInfo) => {
           return db.Post.findById(post.get('user'))

        },
    },

    Query: {
        commentsByPost: (parent, { postId, first = 10, offset = 0 }, {db}: {db:DbConnection}, info: GraphQLResolveInfo) => {
            return db.Comment
                .findAll({
                    where: {post: postId},
                    limit: first,
                    offset: offset
                });
        },

    Mutation: {
        createComment: (parent, { input }, {db}: {db:DbConnection}, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .create(input, {transaction: t});
            });
        },

        updateComment:(parent, { id, input }, {db}: {db:DbConnection}, info: GraphQLResolveInfo) => {
            id = parseInt(id);

            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .findById(id)
                    .then((comment: CommentInstance) => {
                        if(!comment)
                            throw new Error(`Comment with id ${id} not found!`);
                        return comment.update(input, {transaction: t});
                    });
            });
        },

        deleteComment:(parent, { id }, {db}: {db:DbConnection}, info: GraphQLResolveInfo) => {
            id = parseInt(id);

            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                .findById(id)
                .then((comment: CommentInstance) => {
                    if(!comment)
                        throw new Error(`Comment with id ${id} not found!`);
                    return comment.destroy({transaction: t})
                        .then(comment => !!comment);
                });
            });

        },
    }
    }

}