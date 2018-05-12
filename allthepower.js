

var toggleButton = function (play) {
    var icon = document.getElementById("youtube-icon");
    var img = play ? "stop.png" : "play.png";
    icon.setAttribute("src", img);
}

//create play and pause buttons for audio player
function onYouTubeIframeAPIReady() {

    var youtubesound = document.getElementById("youtube-audio");

    
//these guys above and below toggle between pause and play states on button click
    youtubesound.onclick = function () {
        if ( player.getPlayerState() === YT.PlayerState.PLAYING
            || player.getPlayerState() === YT.PlayerState.BUFFERING ) {
            player.pauseVideo();
            toggleButton(false);
        } else {
            player.playVideo();
            toggleButton(true);
        }   
    };

    var player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: youtubesound.dataset.video,
        playerVars: {
            autoplay: youtubesound.dataset.autoplay,
            loop: youtubesound.dataset.loop,
        },
        events: {
            'onReady': function(e) {
                player.setPlaybackQuality("small");
                toggleButton(player.getPlayerState() !== YT.PlayerState.CUED);
            },
            'onStateChange':function(e) {
                if (e.data === YT.PlayerState.ENDED) {
                    toggleButton(false);
                }
            }
        }
    });


}