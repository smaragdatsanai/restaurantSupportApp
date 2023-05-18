import {sequelize} from './db-config.mjs'
import { DataTypes} from 'sequelize'

const Owner = sequelize.define ('Owner', {
    Owner_Id:{
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: true,
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
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Name:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    Address:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

const WorkingDaysandHours = sequelize.define('WorkingDaysandHours',{
    Day:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    Opening:{
        type: DataTypes.STRING,
        allowNull:true
    },
    Closing:{
        type: DataTypes.STRING,
        allowNull:true
    }
})

const Menu = sequelize.define('Menu',{
    Menu_Id:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Name:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    Type:{
        type:DataTypes.TEXT,
        allowNull: false
    }
});

const Menu_Items = sequelize.define('Menu_Items',{
    Item_Id:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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
    }
});

const User = sequelize.define('User',{
    User_Id:{
        type: DataTypes.STRING,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
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
    }
});

const Review = sequelize.define('Review',{
    Review_Id:{
        type: DataTypes.STRING,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },
    Rating:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    Comments:{
        type: DataTypes.TEXT,
        allowNull:true
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
Restaurant.hasMany(WorkingDaysandHours);
WorkingDaysandHours.belongsTo(Restaurant);


try{
    await sequelize.sync({alter:true});
    console.log('Database sync successful!');
}catch (err){
    console.error('Error sychronizing the database:',err);
}
export {User,Owner,Restaurant,Menu,Menu_Items,Review,WorkingDaysandHours};

