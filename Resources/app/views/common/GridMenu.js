module.exports = function(Como) {
    var _ = require('/lib/Underscore/underscore.min'),
        $ = require('/lib/Como/Utils'),
        UI = Como.loadUI(),
        config = {},
        create, buildGrid;
        
    create = function(opt) {
        var view = new UI.view({
                backgroundColor: '#FFF',
                backgroundImage: '/images/bg.png'
            }),
            wrapper;
            
        config = $.extend({
            iconSize: 90,
            items: []
        }, opt);
            
        wrapper = buildGrid();
        view.add(wrapper);
            
        Ti.Gesture.addEventListener('orientationchange', function(e) {
            view.remove(wrapper);
            wrapper = buildGrid();
            view.add(wrapper);
        });
        
        return view;
    };
    
    buildGrid = function() {
        var wrapper = new UI.scrolly({
                bottom: '64dp'
            }),
            currentRow = 1,
            currentColumn = 1,
            iconSize = config.iconSize,
            numOfColumn = Math.floor($.pixelToDp(Ti.Platform.displayCaps.platformWidth) / iconSize),
            itemSize = $.pixelToDp(Ti.Platform.displayCaps.platformWidth) / numOfColumn,
            iconMargin = itemSize - iconSize,
            left = iconMargin + (iconMargin / 4),
            top = 0,
            items = config.items;
            
        wrapper.top = left+'dp';
            
        for(var i=0,j=items.length; i<j; i++){
            if (currentColumn > numOfColumn) {
                currentColumn = 1;
                currentRow++;
                left = iconMargin + (iconMargin / 4);
                top += iconSize + (iconMargin / 2);
            }
            var menu = UI.view({
                backgroundImage: items[i].icon,
                height: iconSize+'dp',
                left: left+'dp',
                top: top+'dp',
                width: iconSize+'dp'
            });
            
            menu.on('click', items[i].action);
            
            left += iconSize + (iconMargin / 2);
            currentColumn++;
            wrapper.add(menu);
        }
        
        return wrapper;
    };
    
    return {
        create: create
    };
};