module.exports = function(Como) {
    var _ = require('/lib/Underscore/underscore.min'),
        $ = require('/lib/Como/Utils'),
        UI = Como.loadUI(),
        config = {},
        win = new UI.win({
            exitOnClose: true,
            layout: 'absolute',
            navBarHidden: true
        }),
        scrollableView = Ti.UI.createScrollableView(),
        create, buildViews, buildMenubar;
        
    create = function(opt) {
        var tabBar;
        
        $.log('[tabbar] height: '+Como.device.height+', width: '+Como.device.width);
        
        config = $.extend({
            tabHeight: 64,
            iconSize: 48,
            iconMargin: 5,
            items: []
        }, opt);
            
        buildViews();
        tabBar = buildMenubar();
        
        win.add(scrollableView);
        win.add(tabBar);
        
        Ti.Gesture.addEventListener('orientationchange', function(e) {
            win.remove(tabBar);
            tabBar = buildMenubar();
            win.add(tabBar);
        });
        
        return win;
    };
    
    buildViews = function() {
        var views = [], items = config.items;
        
        for(var i=0,j=items.length; i<j; i++) {
            views.push(items[i].view);
        }
        
        scrollableView.views = views;
    };
    
    buildMenubar = function() {
        var items = config.items,
            iconSize = config.iconSize,
            iconMargin = ($.pixelToDp(Ti.Platform.displayCaps.platformWidth) / items.length) - iconSize,
            tabBar, indicator, buttonContainer;
        
        tabBar = new UI.view({
            backgroundImage: '/images/toolbar.png',
            bottom: 0,
            height: config.tabHeight+'dp',
            left: 0
        });
        
        buttonContainer = new UI.view({
            bottom: 0,
            height: Ti.UI.SIZE,
            horizontalWrap: false,
            layout: 'horizontal'
        });
        
        indicator = new UI.view({
            backgroundImage: '/images/indicator.png',
            height: '20dp',
            left: calculateIndicatorPosition(0),
            top: '-6dp',
            width: '16dp'
        });
            
        for(var i=0,j=items.length; i<j; i++){
            var item = items[i],
                button = new UI.button({
                    backgroundImage: item.tab.icon,
                    bottom: 0,
                    height: iconSize+'dp',
                    left: (iconMargin / 2)+'dp',
                    objIndex: i,
                    right: (iconMargin / 2)+'dp',
                    width: iconSize+'dp'
                });
                
            if (item.isDefault) {
                indicator.left = calculateIndicatorPosition(i);
                scrollableView.setCurrentPage(i);
            }
            
            button.click(function(e) {
                scrollableView.scrollToView(e.source.objIndex);
            });
            buttonContainer.add(button);
        }
        
        scrollableView.addEventListener('scrollEnd', function(e) {
            indicator.left = calculateIndicatorPosition(e.currentPage);
        });
        
        tabBar.add(buttonContainer);
        tabBar.add(indicator);
        
        function calculateIndicatorPosition(currentPage) {
            var sectionWidth = $.pixelToDp(Ti.Platform.displayCaps.platformWidth) / items.length,
                iconMiddle = sectionWidth / 2;
            
            return ((sectionWidth * (currentPage+1)) - iconMiddle - 8)+'dp';
        }
        
        return tabBar;
    };
        
    return {
        create: create
    };
};
