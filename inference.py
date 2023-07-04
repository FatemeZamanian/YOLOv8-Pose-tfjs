from ultralytics import YOLO


# Load a model
model = YOLO("yolov8n-pose.pt")  # load an official model

results = model("https://ultralytics.com/images/bus.jpg")
