import {sequelize} from './dbConfig.mjs'
import { DataTypes, UUIDV4} from 'sequelize'

const Owner = sequelize.define ('Owner', {
    Owner_Id:{
        type: DataTypes.UUID,
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    First_Name:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    Last_Name:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    Phone:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Email:{
        type: DataTypes.STRING,
        allowNull:true
    },
    Username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Password:{
        type: DataTypes.STRING,
        allowNull: false
    }

});

const Restaurant = sequelize.define('Restaurant',{
    Restaurant_Id:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    Name:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    Address:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Opens_on:{
        type: DataTypes.TIME,
        allowNull:false
    },
    Closes_at:{
        type: DataTypes.TIME,
        allowNull: false
    },
    Image:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    Restaurant_Type:{
        type: DataTypes.STRING,
        allowNull: true
    }

});



const Menu = sequelize.define('Menu',{
    Menu_Id:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    Name:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    Type:{
        type:DataTypes.TEXT,
        allowNull: false
    },
    Active_from:{
        type: DataTypes.TIME,
        allowNull:false
    },
    Active_until:{
        type: DataTypes.TIME,
        allowNull:false
    },
    Image:{
        type: DataTypes.TEXT,
        allowNull: false
    }
});

const Menu_Item = sequelize.define('Menu_Item',{
    Item_Id:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    Name:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    Description:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    Price:{
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    Image:{
        type: DataTypes.TEXT,
        allowNull: false
    }
});

const User = sequelize.define('User',{
    User_Id:{
        type: DataTypes.UUID,
        allowNull:false,
        primaryKey: true
    },
    Username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    ProfileImage:{
        type: DataTypes.TEXT,
        allowNull: true
    }
});

const Review = sequelize.define('Review',{
    Review_Id:{
        type: DataTypes.UUID,
        allowNull:false,
        primaryKey: true
    },
    Rating:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    Comments:{
        type: DataTypes.TEXT,
        allowNull:true
    }
});


Owner.hasMany(Restaurant,{foreignKey:'OwnerId'});
Restaurant.belongsTo(Owner,{foreignKey:'OwnerId'});
Restaurant.hasMany(Menu ,{foreignKey:'RestaurantId'});
Menu.belongsTo(Restaurant,{foreignKey:'RestaurantId'});
Menu.hasMany(Menu_Item, { foreignKey: 'MenuId' });
Menu_Item.belongsTo(Menu, { foreignKey: 'MenuId' });
Menu_Item.hasMany(Review,{ foreignKey:'MenuItemId'});
Review.belongsTo(Menu_Item,{ foreignKey:'MenuItemId'});
User.hasMany(Review,{ foreignKey:'UserId'});
Review.belongsTo(User,{ foreignKey:'UserId'});



try{
    await sequelize.sync({alter:true});
    console.log('Database sync successful!');
}catch (err){
    console.error('Error sychronizing the database:',err);
}
export {User,Owner,Restaurant,Menu,Menu_Item,Review};