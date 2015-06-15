//Модель которая отвечает за содержимое шаблона #article_template
var Article = Backbone.Model.extend({
    defaults: {
        page: 'page',
        content: 'content'
    }
    //urlRoot: '/lesson'
});

//Модель отвечающая за содержимое шаблона #menu_tamplate(выпадающий список уроков)
var Menu = Backbone.Model.extend({
    defaults: {
        pages: {}
    },
    urlRoot: '/menu'
});


//Представление отвечающее за рендер и отображение выпадающего списка меню
var MenuView = Backbone.View.extend({
    el: $('.menu'),
    events: {
        'click .name': 'name'
    },
    article: new Article(),
    initialize: function(){

    },
    name: function(e){
        var that = this;
        $.when($.ajax({
            type: "GET",
            url: 'menu/'+ e.currentTarget.innerText.trim(),
            success: function(data){

                that.article.set({
                    'page': data.page,
                    'content':  data.content
                });
            }

        })).done(function(){
            //var article = new Article();
            var articleView = new ArticleView({model: that.article});
            articleView.render();
            $('.modal-trigger').leanModal();
            //$('.modal-trigger').openModal();
        });

    },
    template: _.template($('#menu_tamplate').html()),
    render: function(){
        var that = this;
        //that.model.getMenu();
        $.when(that.model.fetch()).done(function(){
            $(that.el).html(that.template(that.model.toJSON()));
            //console.log(that.model.toJSON());
        });
        //setTimeout(function(){
        //    $(that.el).html(that.template(that.model.toJSON()));
        //    console.log(that.model.toJSON());
        //}, 200);
        return this;
    }
});

//Представление отвечающее за рендер и отображение статьи
var ArticleView = Backbone.View.extend({
    el: $('.article'),
    template: _.template($('#article_template').html()),
    initialize: function(){
        this.model.bind('change', this.render, this);
        this.render();

    },
    render: function(){
        var that = this;
        $(that.el).html(that.template(that.model.toJSON()));
        console.log("render");
        return this;
    }
});


var menu = new Menu();
var menuView = new MenuView({model: menu});

menuView.render();


