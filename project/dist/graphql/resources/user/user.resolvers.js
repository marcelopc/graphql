"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = {
    Query: {
        users: (parent, { first = 10, offset = 0 }, { db }, info) => {
            return db.User.findAll({
                limit: first,
                offset: offset
            });
        },
        user: (parseNamedType, { id }, { db }, info) => {
            return db.User
                .findById(id)
                .then((user) => {
                if (!user)
                    throw new Error(`User with id ${id} not found!`);
                return user;
            });
        }
    },
    Mutattion: {
        createUser: (parent, { input }, { db }, info) => {
            return db.sequelize.transaction((t) => {
                return db.User.create(input, { transaction: t });
            });
        },
        updateUser: (parent, { id, input }, { db }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.User
                    .findById(id)
                    .then((user) => {
                    if (!user)
                        throw new Error(`User with id ${id} not found!`);
                    return user.update(input, { transaction: t });
                });
            });
        },
        updateUserPassword: (parent, { id, input }, { db }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.User
                    .findById(id)
                    .then((user) => {
                    if (!user)
                        throw new Error(`User with id ${id} not found!`);
                    return user.update(input, { transaction: t })
                        .then((user) => !!user);
                });
            });
        },
        deleteUser: (parent, { id }, { db }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.User
                    .findById(id)
                    .then((user) => {
                    if (!user)
                        throw new Error(`User with id ${id} not found!`);
                    return user.destroy({ transaction: t })
                        .then(user => !!user);
                });
            });
        }
    }
};