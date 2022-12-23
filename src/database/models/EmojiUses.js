/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('emoji_uses', {
        emoji_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        indexes: [
            {
                unique: true,
                fields: ['emoji_id'],
            },
        ],
    });
};