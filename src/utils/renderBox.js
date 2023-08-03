/**
 * Render prediction boxes
 * @param {HTMLCanvasElement} canvasRef canvas tag reference
 * @param {Array} boxes_data boxes array
 * @param {Array} scores_data scores array
 * @param {Array} classes_data class array
 * @param {Array[Number]} ratios boxes ratio [xRatio, yRatio]
 */

const colors = {
  nose: 'red',
  leftEye: 'blue',
  rightEye: 'green',
  leftEar: 'orange',
  rightEar: 'purple',
  leftShoulder: 'yellow',
  rightShoulder: 'pink',
  leftElbow: 'cyan',
  rightElbow: 'magenta',
  leftWrist: 'lime',
  rightWrist: 'indigo',
  leftHip: 'teal',
  rightHip: 'violet',
  leftKnee: 'gold',
  rightKnee: 'silver',
  leftAnkle: 'brown',
  rightAnkle: 'black'
};

const connections = [
  ['nose', 'leftEye'],
  ['nose', 'rightEye'],
  ['leftEye', 'leftEar'],
  ['rightEye', 'rightEar'],
  ['leftShoulder', 'rightShoulder'],
  ['leftShoulder', 'leftElbow'],
  ['rightShoulder', 'rightElbow'],
  ['leftElbow', 'leftWrist'],
  ['rightElbow', 'rightWrist'],
  ['leftShoulder', 'leftHip'],
  ['rightShoulder', 'rightHip'],
  ['leftHip', 'rightHip'],
  ['leftHip', 'leftKnee'],
  ['rightHip', 'rightKnee'],
  ['leftKnee', 'leftAnkle'],
  ['rightKnee', 'rightAnkle']
];

export const renderBoxes = (canvasRef, landmarks_data, boxes_data, scores_data, xi, yi) => {
  console.log(landmarks_data)
  const ctx = canvasRef.getContext("2d");
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clean canvas

  for (let i = 0; i < scores_data.length; ++i) {
    // filter based on class threshold
    const score = (scores_data[i] * 100).toFixed(1);
    let [y1, x1, y2, x2] = boxes_data.slice(i * 4, (i + 1) * 4);
    x1 *= xi;
    x2 *= xi;
    y1 *= yi;
    y2 *= yi;
    const width = x2 - x1;
    const height = y2 - y1;

    // draw box.
    ctx.fillStyle = colors['nose'];

    // draw border box.
    ctx.strokeStyle = colors['nose']
    ctx.lineWidth = Math.max(Math.min(ctx.canvas.width, ctx.canvas.height) / 200, 2.5);
    ctx.strokeRect(x1, y1, width, height);

    let keypoints = landmarks_data.slice([i, 0, 0], [1, -1, -1]).reshape([17, 3]).arraySync();
    const conf_threshold = 0.6;
    for (let j = 0; j < keypoints.length; j++) {
      console.log(keypoints[j])
      const x = keypoints[j][0] * xi;
      const y = keypoints[j][1] * yi;
      const bodyPart = Object.keys(colors)[j];
      if (keypoints[j][2]< conf_threshold){
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = colors[bodyPart];
      ctx.fill();
      ctx.closePath();
      keypoints[j][2] = true;

      }
      else{
        keypoints[j][2] = false;
      }

    }
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';

    for (const [partA, partB] of connections) {
      const x1 = keypoints[Object.keys(colors).indexOf(partA)][0] * xi;
      const y1 = keypoints[Object.keys(colors).indexOf(partA)][1] * yi;
      const x2 = keypoints[Object.keys(colors).indexOf(partB)][0] * xi;
      const y2 = keypoints[Object.keys(colors).indexOf(partB)][1] * yi;
      if (keypoints[Object.keys(colors).indexOf(partA)][2] == true && keypoints[Object.keys(colors).indexOf(partB)][2] == true) {

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
      }
    }
  }
}

