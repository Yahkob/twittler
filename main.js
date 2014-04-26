$(document).ready(function(){
  var count = streams.home.length - 1;
  var allTweets = $('#tweetbox-all')
  var individualTweets = $('#tweetbox-user')
  //hide single twittler users box on start up
  individualTweets.hide()

  //tweet retrieval function
  var fetchTweets = function(start,end,data,location){
    for(var i = start; i < end; i++){
      var tweet = data[i]
      var user = $('<div class="panel-heading"><a class="users" href="#"></a></div>');
      var post = $('<div class="panel-body"></div>');
      //'Posted about x time ago'
      var time = $('<span class="text-muted" id="timestamp" data-livestamp="'+ tweet.created_at +'"></span>');
      user.children().text("@" + tweet.user);
      post.text(tweet.message)
      location.prepend(post);
      location.prepend(time)
      location.prepend(user);
    }
  };

  //get default tweets
  fetchTweets(0,count + 1,streams.home,allTweets)

  //refreshes twittler feed every four seconds
  setInterval(function(){
    var currentCount = streams.home.length;
    if(currentCount > count){
      fetchTweets(count + 1,currentCount,streams.home,allTweets)
      count = currentCount;
    }
  },4000);

  //handles user click event
  $("#tweetbox-all").on("click",".users",function(){
    //hides all tweets
    $("#tweetbox-all").hide()
    //shows @user's tweets
    $("#tweetbox-user").show()
    var singleUser = ($(this).text().split("").slice(1).join(""))
    var userData = streams.users[singleUser]
    console.log(userData[0])
    $(".navInfo").text($(this).text() +"'s tweets").append("<br><br><a id='allTweets' href='#'>View all tweets</a>")
    fetchTweets(0,userData.length,userData,individualTweets);
  })

  //navigates to twittler feed
  $("#infoBox").on("click","#allTweets",function(){
    $("#tweetbox-user").children().remove();
    $("#tweetbox-all").show();
    $(".navInfo").text("All tweets")
  })
});

