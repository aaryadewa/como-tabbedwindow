module.exports = function(Como) {
    var _ = require('/lib/Underscore/underscore.min'),
        $ = require('/lib/Como/Utils'),
        UI = Como.loadUI(),
        
        create, buildViews, buildMenubar;
        
    create = function(opt) {
        var win = new UI.win({
                exitOnClose: true,
                layout: 'absolute',
                navBarHidden: true
            }),
            scrollableView = Ti.UI.createScrollableView(),
            menubar,
            iconSize = 48,
            iconMargin = 5,
            menus = opt.menus,
            views = [];
        
        for(var i=0,j=menus.length; i<j; i++) {
            views.push(menus[i].view);
        };
        scrollableView.views = views;
        menubar = buildMenubar({
            menus: menus,
            page: scrollableView
        });
        
        win.add(scrollableView);
        win.add(menubar);
        
        Ti.Gesture.addEventListener('orientationchange', function(e) {
            win.remove(menubar);
            menubar = buildMenubar({
                menus: menus,
                page: scrollableView
            });
            win.add(menubar);
        });
        
        return win;
    };
    
    buildViews = function(opt) {
        
    };
    
    buildMenubar = function(opt) {
        var page = opt.page,
            menus = opt.menus,
            iconSize = 48,
            iconMargin = (Ti.Platform.displayCaps.platformWidth / menus.length) - iconSize,
            menubar = new UI.view({
                backgroundImage: '/images/toolbar.png',
                bottom: 0,
                height: '64dp',
                left: 0
            }),
            buttonContainer = new UI.view({
                bottom: 0,
                height: Ti.UI.SIZE,
                horizontalWrap: true,
                layout: 'horizontal',
                width: Ti.UI.SIZE
            });
        
        var indicator = new UI.view({
            backgroundImage: '/images/indicator.png',
            height: '20dp',
            left: getIndicatorLeftMargin(0),
            top: '-6dp',
            width: '16dp'
        });
            
        for(var i=0,j=menus.length; i<j; i++){
            var button = new UI.button({
                    backgroundImage: menus[i].tab.icon,
                    bottom: 0,
                    height: iconSize+'dp',
                    left: (iconMargin/2)+'dp',
                    objIndex: i,
                    right: (iconMargin/2)+'dp',
                    width: iconSize+'dp'
                }),
                view = i;
                
            page.addEventListener('scrollEnd', function(e) {
                var idx = e.currentPage,
                    sectionWidth = Ti.Platform.displayCaps.platformWidth / menus.length,
                    iconMiddle = sectionWidth / 2;
                
                indicator.left = getIndicatorLeftMargin(idx);
            });
            
            if (menus[i].isDefault) {
                indicator.left = getIndicatorLeftMargin(i);
                page.setCurrentPage(i);
            }
            
            button.click(function(e) {
                var idx = e.source.objIndex;
                page.scrollToView(idx);
            });
            buttonContainer.add(button);
        };
        
        menubar.add(buttonContainer);
        menubar.add(indicator);
        
        function getIndicatorLeftMargin(currentPage) {
            var sectionWidth = Ti.Platform.displayCaps.platformWidth / menus.length,
                iconMiddle = sectionWidth / 2;
            
            return ((sectionWidth * (currentPage+1)) - iconMiddle - 8)+'dp';
        }
        
        return menubar;
    };
        
    return {
        create: create
    };
};
