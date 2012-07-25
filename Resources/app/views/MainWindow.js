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
            configuration, profile, dashboard, news, tabbedWindow;
            
        configuration = new UI.view({
            backgroundColor: '#FFF',
            backgroundImage: '/images/bg.png'
        });
        
        profile = new UI.view({
            backgroundColor: '#FFF',
            backgroundImage: '/images/bg.png'
        });
        
        dashboard = new Dashboard(Como).create();
        news = new News(Como).create();
        tabbedWindow = new TabbedWindow(Como);
            
        return tabbedWindow.create({
            items: [
                {
                    tab: {
                        icon: '/images/config.png'
                    },
                    view: configuration
                },
                {
                    tab: {
                        icon: '/images/profile.png'
                    },
                    view: profile
                },
                {
                    tab: {
                        icon: '/images/home.png'
                    },
                    view: dashboard,
                    isDefault: true
                },
                {
                    tab: {
                        icon: '/images/news.png'
                    },
                    view: news
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
