import { sequelize } from './dbConfig.mjs'
import { DataTypes } from 'sequelize'

const Owner = sequelize.define('Owner', {
    Owner_Id: {
        type: DataTypes.TEXT,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
    },
    First_Name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Last_Name: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Phone: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Email: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Username: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

const Restaurant = sequelize.define('Restaurant', {
    Restaurant_Id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    minimum_order: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    schedule: {
        type: DataTypes.JSONB, // Store schedule as JSONB data type
        allowNull: false
    }

});

const Menu = sequelize.define('Menu', {
    Menu_Id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Type: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

const Menu_Item = sequelize.define('Menu_Item', {
    Item_Id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }

});

const User = sequelize.define('User', {
    User_Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Username: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Email: {
        type: DataTypes.TEXT,
        allowNull: false

    },
}, {
    tableName: 'User',
    timestamps: false
});

const Review = sequelize.define('Review', {
    Review_Id: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
    },
    Rating: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Comments: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

Owner.hasMany(Restaurant);
Restaurant.belongsTo(Owner);
Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant);
Menu.hasMany(Menu_Items);
Menu_Items.belongsTo(Menu);
Menu_Items.hasMany(Review);
User.hasMany(Review);
Review.belongsTo(User);


await sequelize.sync({ alter: true });
export { User, Owner, Restaurant, Menu, Menu_Item, Review };
