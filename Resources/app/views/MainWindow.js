module.exports = function(Como) {
    var _ = require('/lib/Underscore/underscore.min'),
        UI = Como.loadUI(),
        
        create, createTabbedWindow;
        
    create = function() {
        return createTabbedWindow();
    };
    
    createTabbedWindow = function() {
        var TabbedWindow = require('/app/views/common/TabbedWindow'),
            Dashboard = require('/app/views/Dashboard'),
            News = require('/app/views/News'),
            
            menubar = new TabbedWindow(Como);
            
        return menubar.create({
            menus: [
                {
                    tab: {
                        icon: '/images/config.png'
                    },
                    view: new UI.view({
                        backgroundColor: '#AAA'
                    })
                },
                {
                    tab: {
                        icon: '/images/profile.png'
                    },
                    view: new UI.view({
                        backgroundColor: '#BBB'
                    })
                },
                {
                    tab: {
                        icon: '/images/home.png'
                    },
                    view: new Dashboard(Como).create(),
                    isDefault: true
                },
                {
                    tab: {
                        icon: '/images/news.png'
                    },
                    view: new News(Como).create()
                },
                {
                    tab: {
                        icon: '/images/off.png'
                    },
                    view: new UI.view({
                        backgroundColor: '#EEE'
                    })
                }
            ]
        });
    };
        
    return {
        create: create
    };
};
