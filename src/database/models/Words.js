/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('words', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        word: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        replace_word: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        indexes: [
            {
                unique: true,
                fields: ['id'],
            },
        ],
    });
};