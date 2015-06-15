var AppState = Backbone.Model.extend({

    defaults: {
        state: "start_state",
        time: 3,
        timeTo: 0,
        stopTimeTo: false
    }
});

var Word = Backbone.Model.extend({
    getWord: function(){
        var that = this;
        $.ajax({
            type: "GET",
            url: "/words",
            success: function(data){

                that.set("value", data.value);

            }

        });
    },
    initialize: function(){
        this.getWord();
    },
    defaults: {
        id: null,
        value: " "
    }
});

var WordsList = Backbone.Collection.extend({
    model: Word
    //url: '/words'
});

var App = Backbone.View.extend({
    el: $(".viewApp"),

    //wordsList: new WordsList(),

    events: {
        'click .start': 'go',
        'click .ready': 'ready',
        'click .restart': 'restart',
        'blur .input-word': 'chekWord'
    },
    go: function(){
        this.model.model_state.set("state","timer_state");
    },
    ready: function(){
        this.model.model_state.set("stat", "check_state");
        this.model.model_state.set("stopTimeTo", true);
        //console.log('ready');
    },
    chekWord: function(e){
        var input = this.$el.find('#'+e.currentTarget.id)
            .val()
            .trim()
            .toLowerCase();
        var current = this.model.model_words
            .at(parseInt(e.currentTarget.id.substring(4))-1)
            .get('value')
            .trim()
            .toLowerCase();
        var inputEl = this.$el.find('#'+ e.currentTarget.id);
        if(input != ''){
            if(input == current ){
                inputEl.addClass('green');
                inputEl.removeClass('red');
            }else{
                inputEl.removeClass('green');
                inputEl.addClass('red');
            }
        }

    },
    restart: function(){
        this.model.model_words.reset();
        this.initializeWords();
        this.model.model_state.set(this.model.model_state.defaults, {silent: true});
        this.render();
    },
    templates: {
        start_state: _.template($('#start_state_template').html()),
        timer_state: _.template($('#timer_state_template').html()),
        exercise_state: _.template($('#exercise_state_template').html()),
        check_state: _.template($('#check_state_template').html())
    },
    initializeWords: function(){
        while(this.model.model_words.length != 10){
            this.model.model_words.add(new Word());
        }
    },
    initialize: function(){
        //console.log(this.model.model_state);
        this.model.model_state.bind('change:state', this.render, this);
        this.model.model_state.bind('change:stopTimeTo', this.renderCheck, this);
        this.model.model_state.bind('change:time', this.renderTimer, this);
        this.model.model_state.bind('change:timeTo', this.renderExercise, this);
        this.initializeWords();
        this.render();

    },
    render: function(){
        var that = this;
        switch(this.model.model_state.get("state")){
            case "start_state":
                this.renderStart();
                //console.log('render start');
                break;
            case "timer_state":
                this.renderTimer();
                setTimeout(function run() {
                    if((that.model.model_state.get('time')) == 0){
                        that.renderTimer();
                        that.model.model_state.set('state', 'exercise_state');
                        return 0;
                    } else {
                        var value = that.model.model_state.get('time');
                        value--;
                        //that.renderTimer();
                        that.model.model_state.set('time', value);
                        setTimeout(run, 1000);
                    }
                }, 100);
                //console.log('render timer');
                break;
            case "exercise_state":
                this.renderExercise();
                //console.log('stopTimeTo ' + this.model.model_state.get('stopTimeTo'));
                setTimeout(function run() {
                    if(!that.model.model_state.get('stopTimeTo')) {
                        var value = that.model.model_state.get('timeTo');
                        //console.log('stopTimerTo ' + that.model.model_state.get('stopTimeTo'));
                        value++;
                        //that.renderExercise();
                        that.model.model_state.set('timeTo', value);
                        setTimeout(run, 1000);
                    }
                }, 100);
                break;
            case "check_state":
                this.renderCheck();
                break;
        }
        return this;
    },
    renderStart: function(){
        this.$el.html(this.templates['start_state']());
        return this;
    },
    renderTimer: function(){
        this.$el.html(this.templates.timer_state(this.model.model_state.toJSON()));
        return this;
    },
    renderExercise: function(){
        this.$el.html(this.templates.exercise_state(this.model.model_state.toJSON()));

        for(var i = 1; i <= this.model.model_words.length; i++){
            this.$el.find('.word' + i).text(this.model.model_words.at(i - 1).get("value"));
        }
        return this;
    },
    renderCheck: function(){
        this.$el.html(this.templates.check_state(this.model.model_state.toJSON()));
        return this;
    }
});

//var controller = new Controller();
var appState = new AppState();
var words = new WordsList();
var app = new App({
    model: {
        model_state: appState,
        model_words: words
    }
});

