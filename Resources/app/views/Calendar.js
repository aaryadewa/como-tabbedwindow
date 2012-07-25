module.exports = function(Como) {
    var _ = require('/lib/Underscore/underscore.min'),
        UI = Como.loadUI(),
        
        page = new UI.win({
            layout: 'vertical',
            navBarHidden: true
        }),
        
        create, buildHeader;
    
    create = function() {
        var header = buildHeader(),
            view = UI.view({
                backgroundColor: '#FFF',
                backgroundImage: '/images/bg.png'
            }),
            list = new UI.tableview({
                width: '80%'
            }),
            data = [],
            calendars = Ti.Android.Calendar.selectableCalendars;
            
        for(var i=0,j=calendars.length; i<j; i++) {
            data.push(new UI.tablerow({
                color: '#000',
                objId: calendars[i].id,
                title: calendars[i].name
            }));
        };
        
        list.setData(data);
        view.add(list);
        page.add(header);
        page.add(view);
        
        return page;
    };
    
    buildHeader = function() {
        var Header = require('/app/views/common/Header'),
            header = new Header(Como),
            buttonBack = new UI.button({
                backgroundImage: '/images/back.png',
                height: '32dp',
                left: '10dp',
                width: '32dp'
            });
            buttonBack.on('click', function(e) {
                page.close();
            });
            
        return header.create({
            items: [buttonBack]
        });
    };
    
    return {
        create: create
    };
};