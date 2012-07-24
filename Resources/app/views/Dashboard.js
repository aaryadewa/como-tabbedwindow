module.exports = function(Como) {
    var _ = require('/lib/Underscore/underscore.min'),
        UI = Como.loadUI(),
        
        create;
        
    create = function() {
        var GridMenu = require('/app/views/common/GridMenu'),
            gridMenu = new GridMenu(Como),
            menus = [
                {
                    action: 'Dashboard/showCalendar',
                    icon: '/images/dashboard/calendar.png'
                },
                {
                    action: 'Dashboard/showCamera',
                    icon: '/images/dashboard/camera.png'
                },
                {
                    action: 'Dashboard/showChat',
                    icon: '/images/dashboard/chat.png'
                },
                {
                    action: 'Dashboard/showGraph',
                    icon: '/images/dashboard/graph.png'
                },
                {
                    action: 'App/logout',
                    icon: '/images/dashboard/logout.png'
                },
                {
                    action: 'Dashboard/showMap',
                    icon: '/images/dashboard/map.png'
                },
                {
                    action: 'Dashboard/showSearch',
                    icon: '/images/dashboard/search.png'
                },
                {
                    action: 'Dashboard/showTodo',
                    icon: '/images/dashboard/todo.png'
                },
                {
                    action: 'Dashboard/showUniversity',
                    icon: '/images/dashboard/university.png'
                }
            ];
            
        return gridMenu.create({
            items: menus
        });
    };
        
    return {
        create: create
    };
};