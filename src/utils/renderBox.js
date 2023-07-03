

/**
 * Render prediction boxes
 * @param {HTMLCanvasElement} canvasRef canvas tag reference
 * @param {Array} boxes_data boxes array
 * @param {Array} scores_data scores array
 * @param {Array} classes_data class array
 * @param {Array[Number]} ratios boxes ratio [xRatio, yRatio]
 */
export const renderBoxes = (canvasRef, keypointData,xi,yi) => {
  const ctx = canvasRef.getContext("2d");
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clean canvas

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
    for (let i = 0; i < keypointData.length; i += 3) {
      const x = keypointData[i] * xi;
      const y = keypointData[i + 1] * yi;
      const bodyPart = Object.keys(colors)[i / 3];
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = colors[bodyPart];
      ctx.fill();
      ctx.closePath();
    }
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'white';
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
  for (const [partA, partB] of connections) {
    const x1 = keypointData[Object.keys(colors).indexOf(partA) * 3] * xi;
    const y1 = keypointData[Object.keys(colors).indexOf(partA) * 3 + 1] * yi;
    const x2 = keypointData[Object.keys(colors).indexOf(partB) * 3] * xi;
    const y2 = keypointData[Object.keys(colors).indexOf(partB) * 3 + 1] * yi;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
  }
}

