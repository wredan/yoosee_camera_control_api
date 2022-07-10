# yoosee_camera_control_api
This app lets you control your yoosee camera rtsp ready using REST API.

**NB:** Keep in mind that this API may not work for your camera model because there are many different models out there.

**DISCLAIMER**: Do not abuse. This API is intended to be used only on your own private property. I am not responsible for your actions through this API.

## Requirements
- You need to start rtsp on the yoosee app
- You need to know your yoosee camera ip address

## To Build the image

```bash
  $ docker build . -t <your username>/yoosee_camera_control_api
```

## To Run the image

```bash
  $ docker run -p <any port you desire>:8080 -d --name <name you desire> --restart unless-stopped <your username>/yoosee_camera_control_api
```

## How to interact

### UP
```bash
  GET http://<your host>:<port you set>/<token>/<camera IP>/up
```
### DOWN
```bash
  GET http://<your host>:<port you set>/<token>/<camera IP>/down
```
### LEFT
```bash
  GET http://<your host>:<port you set>/<token>/<camera IP>/left
```
### RIGHT
```bash
  GET http://<your host>:<port you set>/<token>/<camera IP>/right
```