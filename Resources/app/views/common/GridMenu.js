module.exports = function(Como) {
    var _ = require('/lib/Underscore/underscore.min'),
        $ = require('/lib/Como/Utils'),
        UI = Como.loadUI(),
        
        create, buildGrid;
        
    create = function(opt) {
        var view = new UI.view({
                backgroundColor: '#FFF',
                backgroundImage: '/images/bg.png'
            }),
            config = $.extend({
                iconSize: 90,
                items: []
            }, opt),
            currentRow = 1,
            currentColumn = 1,
            iconSize = config.iconSize,
            columnSize = Math.floor(Ti.Platform.displayCaps.platformWidth / iconSize),
            itemSize = Ti.Platform.displayCaps.platformWidth / columnSize,
            left = itemSize - iconSize,
            top = itemSize - iconSize,
            items = config.items;
            
        for(var i=0,j=items.length; i<j; i++){
            if (currentColumn > columnSize) {
                currentColumn = 1;
                currentRow++;
                left = itemSize - iconSize;
                top += iconSize + (left / 2);
            }
            var menu = UI.view({
                backgroundImage: items[i].icon,
                height: iconSize+'dp',
                left: left+'dp',
                top: top+'dp',
                width: iconSize+'dp'
            });
            
            left += iconSize + ((itemSize - iconSize) / 2);
            currentColumn++;
            view.add(menu);
        };
            
        return view;
    };
    
    buildGrid = function(opt) {
        var config = $.extend({
            iconSize: 90,
            items: []
        }, opt);
    };
        
    return {
        create: create
    };
};