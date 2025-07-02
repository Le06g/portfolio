let ballX, ballY, ballRad, ballDim;
let ballRt, YballSpd, XballSpd, MxBallSpd;
let eyelimitX, eyelimitY;
let RrectY, rectYSz, RrectSp, LrectSp;
let PossibleRt;
let borderY, borderX;
let player2;
let waitStartTime = 0;
let waitDuration = 1000; // Duration for each countdown second
let wait = false;
let countdown = 3;
let ballResetting = false;

function setup() {
  createCanvas(400, 200);
  noStroke();
  textSize(35);
  //ball
  ballX = width / 2;
  ballY = height / 2;
  PossibleRt = [30, 45, 210, 225];
  ball();
  //rectangles
  rectYSz = height / 3;
  RrectY = height / 3;
  LrectY = height / 3;
  LrectSpd = height / 150;
  RrectSpd = LrectSpd;
  //border
  borderX = width / 90;
  borderY = borderX;
  //player2?
  player2 = 0;
}

function ball() {
  ballRt = PossibleRt[floor(random() * PossibleRt.length)];
  if (ballRt === radians(0) || ballRt === radians(90) || ballRt === radians(270)) { ball() }
  XballSpd = cos(radians(ballRt)) * width / 300;
  YballSpd = sin(radians(ballRt)) * height / 150;
  ballDim = height / 15;
  ballRad = ballDim / 2;
  MxBallSpd = sqrt(YballSpd**2 + XballSpd**2);
}

function draw() {
  background(0);
  
  // Draw middle line and circles
  fill(200);
  rect(width / 2 - borderX / 2, 0, borderX, height);
  circle(width / 2, height / 2, width / 40);

  // Draw side borders
  fill(80);
  rect(0, 0, borderY, height);
  rect(width - borderY, 0, borderX, height);

  // Draw top and bottom borders
  fill(200);
  rect(0, 0, width, borderY);
  rect(0, height - borderX, width, borderY);

  // Draw ball
  fill(255);
  circle(ballX, ballY, ballDim);

  // Map mouse to eye positions
  eyelimitY = constrain(map(mouseY, ballY - height / 2, ballY + height / 2, ballY - ballRad, ballY + ballRad), ballY - ballRad / 2, ballY + ballRad / 2);
  eyelimitX = constrain(map(mouseX, ballX - width / 2, ballX + width / 2, ballX - ballRad, ballX + ballRad), ballX - ballRad / 2, ballX + ballRad / 2);

  // Eye dot
  fill(0);
  circle(eyelimitX, eyelimitY, ballDim / 8);

  // Draw left rectangle
  fill(255, 35, 45);
  rect(width / 24, LrectY, width / 45, rectYSz);

  // Draw right rectangle
  fill(45, 35, 255);
  rect(width * 11 / 12, RrectY, width / 45, rectYSz);

  // Rrectangle movement
  if (keyIsDown(UP_ARROW)) {
    RrectY -= LrectSpd;
  }
  if (keyIsDown(DOWN_ARROW)) {
    RrectY += LrectSpd;
  }
  RrectY = constrain(RrectY, borderY, height - rectYSz - borderY);
  LrectY = constrain(LrectY, borderY, height - rectYSz - borderY);

  // Ball movement
  ballY += YballSpd;
  ballX += XballSpd;

  // Ball wall collision
  if (ballX >= width - ballRad - borderX || ballX <= ballRad + borderX) {
    ballX = width / 2;
    ballY = height / 2;
    XballSpd = 0;
    YballSpd = 0;
    ball();
  }
  if (ballY >= height - ballRad - borderY || ballY <= ballRad + borderY) {
    YballSpd *= -1.1;
    XballSpd *= 1.1;
  }
  //HECK YEAH
  MxBallSpd = sqrt(YballSpd**2 + XballSpd**2);
  // Ball X-rect collision
  if (
    (ballX + ballRad >= width * 11 / 12 &&
      ballX - ballRad <= width * 11 / 12 + width / 45 &&
      ballY >= RrectY &&
      ballY <= RrectY + rectYSz)
    ||
    (ballX - ballRad <= width / 24 + width / 45 &&
      ballX + ballRad >= width / 24 &&
      ballY >= LrectY &&
      ballY <= LrectY + rectYSz)
  ) {
    YballSpd *= 1.1;
    XballSpd *= -1.1;
  }

  // Ball Y-rect collision
  if (
    ballX + ballRad > width * 11 / 12 &&
    ballX - ballRad < width * 11 / 12 + width / 45
  ) {
    // RTop edge
    if (ballY < RrectY && ballY + ballRad >= RrectY && YballSpd > 0) {
      YballSpd *= -1.1;
      XballSpd *= 1.1;
      ballY = RrectY - ballRad;
    }
    // RBottom edge
    else if (ballY > RrectY + rectYSz && ballY - ballRad <= RrectY + rectYSz && YballSpd < 0) {
      YballSpd *= -1.1;
      XballSpd *= 1.1;
      ballY = RrectY + rectYSz + ballRad;
    }
  }

  if (
    ballX + ballRad > width / 24 &&
    ballX - ballRad < width / 24 + width / 45
  ) {
    // LTop edge
    if (ballY < LrectY && ballY + ballRad >= LrectY && YballSpd > 0) {
      YballSpd *= -1.05;
      XballSpd *= 1.05;
      ballY = LrectY - ballRad;
    }
    // LBottom edge
    else if (ballY > LrectY + rectYSz && ballY - ballRad <= LrectY + rectYSz && YballSpd < 0) {
      YballSpd *= -1.05;
      XballSpd *= 1.05;
      ballY = LrectY + rectYSz + ballRad;
    }
  }

  // Lrect AI
  if (ballY >= LrectY + rectYSz / 2) {
    LrectY += LrectSpd;
  } else if (ballY <= LrectY + rectYSz / 2) {
    LrectY -= LrectSpd;
  }
  if(MxBallSpd > 10){
    YballSpd *= 0.9;
    XballSpd *= 0.9;
    MxBallSpd = sqrt(YballSpd**2 + XballSpd**2);
  }
  console.log(MxBallSpd)
}