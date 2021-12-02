song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('poses', gotPoses);
}

function gotPoses(){
    if(result.length > 0){
        console.log(result);
        leftWristX = results[0].pose.leftWristX;
        leftWristY = results[0].pose.leftWristY;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWristX;
        rightWristY = results[0].pose.rightWristY;
        console.log("rightWristX = " + rightWristX + "rightWristY" + rightWristY);
    }
}

function modelLoaded(){
    console.log("poseNet is initialized");
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY = number(leftWristY);
    remove_decimal = floor(InNumberleftWristY);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML = "volume = " + volume;
    song.setVolume(volume);
    }
    
}

function preload(){
    song = loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}