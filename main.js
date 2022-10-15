var paddleimg = null;
var score = 0;
var wristX = 0;
var wristY = 0;
var size = 0;
function Play() {
}
function preload() {
paddleimg = loadImage("Ping-Pong.png");
}
function setup() {
    createCanvas(1000,1000);
    background(0);
    video = createCapture(VIDEO);
    video.hide();
    video.size(1000,1000);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses); 
}
function draw() {
    image(video,0,0,1000,1000);
    size = 250;
    image(paddleimg,wristX - size / 2,wristY - size,size,size);
    //circle(wristX, wristY, 15);
}
function modelLoaded() {
    console.log("model loaded");
}
function gotPoses(results) {
    if (results.length>0) {
        wristX = results[0].pose.rightWrist.x;
        wristY = results[0].pose.rightWrist.y;
        score = results[0].pose.rightWrist.score;
    }
}