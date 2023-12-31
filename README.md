# Pose Detection using YOLOv8 and Tensorflow.js

<p align="center">
  <img src="./sample.jpeg" />
</p>

[![Node.js CI](https://github.com/FatemeZamanian/YOLOv8-Pose-tfjs/actions/workflows/node.js.yml/badge.svg)](https://github.com/FatemeZamanian/YOLOv8-Pose-tfjs/actions/workflows/node.js.yml)
![love](https://img.shields.io/badge/Made%20with-🖤-white)
![tensorflow.js](https://img.shields.io/badge/tensorflow.js-white?logo=tensorflow)

---

Pose Detection application right in your browser. Serving YOLOv8 in browser using tensorflow.js
with `webgl` backend.

**Setup**

```bash
git clone https://github.com/FatemeZamanian/YOLOv8-Pose-tfjs.git
cd yolov8-pose-tfjs
yarn install #Install dependencies
```

**Scripts**

```bash
yarn start # Start dev server
yarn build # Build for productions
```

## Model

YOLOv8n model converted to tensorflow.js.

```
used model : yolov8n-pose
size       : 6.8 Mb
```

**Use another model**

Use another YOLOv8-pose model.

1. Export YOLOv8-pose model to tfjs format. Read more on the [official documentation](https://docs.ultralytics.com/tasks/detection/#export)

   ```python
   from ultralytics import YOLO

   # Load a model
   model = YOLO("yolov8n-pose.pt")  # load an official model

   # Export the model
   model.export(format="tfjs")
   ```

2. Copy `yolov8*-pose_web_model` to `./public`
3. Update `modelName` in `App.jsx` to new model name
   ```jsx
   ...
   // model configs
   const modelName = "yolov8*-pose"; // change to new model name
   ...
   ```
4. Done! 😊

**Note: Custom Trained YOLOv8 Models**

Please update `src/utils/labels.json` with your new classes.

## Reference

- https://github.com/ultralytics/ultralytics
- https://github.com/Hyuto/yolov8-tfjs
