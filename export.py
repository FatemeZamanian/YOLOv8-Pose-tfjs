from ultralytics import YOLO


# Load a model
model = YOLO("yolov8n-pose.pt")  # load an official model

# Export the model
model.export(format="tfjs")
