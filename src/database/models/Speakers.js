/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('speakers', {
        user_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        speaker_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
    });
};