$(document).ready(function(){
  var count = streams.home.length - 1;
  $("#tweetbox-single").hide()
  //get default tweets
var renderTweets = function(){
  for(var i = count; i >= 0; i-- ){
    var tweet = streams.home[i];
    var user = $('<div class="panel-heading"><a class="users" href="#"></a></div>');
    var post = $('<div class="panel-body"></div>');
    var time = $('<span class="text-muted" id="timestamp" data-livestamp="'+ tweet.created_at +'"></span>');
    user.children().text("@" + tweet.user);
    post.text(tweet.message);
    $("#tweetbox-all").append(user);
    $('#tweetbox-all').append(time)
    $("#tweetbox-all").append(post);
  }
}
renderTweets()
setInterval(function(){
    var currentCount = streams.home.length - 1;
    if(currentCount > count){
      for(var i = count + 1; i < currentCount; i++){
        var tweet = streams.home[i]
        var user = $('<div class="panel-heading"><a class="users" href="#"></a></div>');
        var post = $('<div class="panel-body"></div>');
        var time = $('<span class="text-muted" id="timestamp" data-livestamp="'+ tweet.created_at +'"></span>');
        user.children().text("@" + tweet.user);
        post.text(tweet.message)
        $('#tweetbox-all').prepend(post);
        $('#tweetbox-all').prepend(time)
        $('#tweetbox-all').prepend(user);
      }
      count = currentCount;
    }
  },4000);
  var displayUserTweets = function(user){
    var location = streams.users[user]
    for(var i = 0; i < location.length; i++){
      var tweet = location[i];
      var user = $('<div class="panel-heading"><a class="users" href="#"></a></div>');
      var post = $('<div class="panel-body"></div>');
      var time = $('<span class="text-muted" id="timestamp" data-livestamp="'+ tweet.created_at +'"></span>');
      user.children().text("@" + tweet.user);
      post.text(tweet.message)
      $('#tweetbox-single').prepend(post);
      $('#tweetbox-single').prepend(time)
      $('#tweetbox-single').prepend(user);
      }
  }
  $("#tweetbox-all").on("click",".users",function(){
    $("#tweetbox-all").hide()
    $("#tweetbox-single").show()
    var singleUser = ($(this).text().split("").slice(1).join(""))
    $(".navInfo").text($(this).text() +"'s tweets").append("<br><br><a id='back' href='#'>View all tweets</a>")
    displayUserTweets(singleUser)
  })
  $("#infoBox").on("click","#back",function(){
    $("#tweetbox-single").children().remove();
    $("#tweetbox-all").show();
    $(".navInfo").text("All tweets")
  })
});


