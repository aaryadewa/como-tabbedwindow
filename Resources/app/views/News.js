module.exports = function(Como) {
    var _ = require('/lib/Underscore/underscore.min'),
        $ = require('/lib/Como/Utils'),
        UI = Como.loadUI(),
        
        view = UI.view({
            backgroundColor: '#FFF',
            backgroundImage: '/images/bg.png'
        }),
            
        create, buildList;
        
    create = function() {
        fetchData();
        return view;
    };
    
    buildList = function(record) {
        var list = new UI.tableview({
                bottom: '60dp',
                top: '10dp',
                width: '80%'
            }),
            news = record.headlines,
            data = [];
            
        for(var i=0,j=news.length; i<j; i++){
            data.push(new UI.tablerow({
                color: '#000',
                title: news[i].headline
            }));
        };
        list.setData(data);
        view.add(list);
    };
    
    fetchData = function() {
        $.ajax({
            url: 'http://api.espn.com/v1/sports/news/headlines?apikey=phuedqqs4zvtjs77paj89b4x',
            success: function(response) {
                buildList(response);
            },
            failure: function(msg) {
                Ti.UI.createAlertDialog({
                    message: 'error fetching data',
                    ok: 'Close'
                });
            }
        })
    }
    
    return {
        create: create
    };
};