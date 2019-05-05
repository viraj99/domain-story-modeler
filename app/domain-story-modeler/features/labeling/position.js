'use strict';

import { selectPartOfActivity } from './DSLabelUtil';

// determine the position of the label at the activity
export function labelPosition(waypoints) {
  var amountWaypoints = waypoints.length;
  var determinedPosition = {};
  var xPos = 0;
  var yPos = 0;

  if (amountWaypoints > 2) {
    var angleActivity = new Array(amountWaypoints - 1);
    for (var i = 0; i < amountWaypoints - 1; i++) { // calculate the angles of the activities
      angleActivity[i] = Math.angleBetween(waypoints[i], waypoints[i + 1]);
    }

    var selectedActivity = selectPartOfActivity(waypoints, angleActivity);

    xPos = labelPositionX(waypoints[selectedActivity], waypoints[selectedActivity + 1]);
    yPos = labelPositionY(waypoints[selectedActivity], waypoints[selectedActivity + 1]);

    determinedPosition = {
      x: xPos,
      y: yPos,
      selected: selectedActivity
    };

    return determinedPosition;

  } else {
    xPos = labelPositionX(waypoints[0], waypoints[1]);
    yPos = labelPositionY(waypoints[0], waypoints[1]);

    determinedPosition = {
      x: xPos,
      y: yPos,
      selected: 0
    };

    return determinedPosition;
  }
}

// calculate the X position of the label
export function labelPositionX(startPoint, endPoint) {
  var angle = Math.angleBetween(startPoint, endPoint);
  var offsetX = 0;
  var scaledangle = 0;
  if (angle == 0 || angle == 180 || angle == 90 || angle == 270) {
    offsetX = 0;
  }
  else if (angle > 0 && angle < 90) { // endpoint in upper right quadrant
    offsetX = 5 - angle / 6;
  }
  else if (angle > 90 && angle < 180) { // endpoint in upper left quadrant
    scaledangle = angle - 90;
    offsetX = 5 - scaledangle / 18;
  }
  else if (angle > 180 && angle < 270) { // endpoint in lower left quadrant
    scaledangle = angle - 180;
    offsetX = scaledangle / 18;
  }
  else if (angle > 270) { // endpoint in lower right quadrant
    scaledangle = angle - 270;
    offsetX = 5 - scaledangle / 6;
  }
  return offsetX + (startPoint.x + endPoint.x)/2;
}

// calculate the Y position of the label
export function labelPositionY(startPoint, endPoint) {
  var angle = Math.angleBetween(startPoint, endPoint);
  var offsetY = 0;
  var scaledangle = 0;

  if (angle == 0 || angle == 180) {
    offsetY = 15;
  }
  else if (angle == 90 || angle == 270) {
    offsetY = 0;
  }
  else if (angle > 0 && angle < 90) { // endpoint in upper right quadrant
    offsetY = 15 - angle / 6;
  }
  else if (angle > 90 && angle < 180) { // endpoint in upper left quadrant
    scaledangle = angle - 90;
    offsetY = -scaledangle / 9;
  }
  else if (angle > 180 && angle < 270) { // endpoint in lower left quadrant
    scaledangle = angle - 180;
    offsetY = 15 - scaledangle / 3;
  }
  else if (angle > 270) { // endpoint in lower right quadrant
    scaledangle = angle - 270;
    offsetY = -scaledangle / 9;
  }
  return offsetY + (startPoint.y + endPoint.y)/2;
}