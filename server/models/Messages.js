'use strict';

import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Messages = sequelize.define("Messages", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        message:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        reciver:{
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        
    }, {
        tableName: 'messages',
        timestamps: false
    });

    return Messages;
};