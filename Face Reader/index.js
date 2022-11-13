import React from "react";
import ReactDOM from "react-dom";
import * as faceApi from "face-api.js";

import "./styles.css";

const expressionMap = {
  neutral: "😶",
  happy: "😄",
  sad: "😞",
  angry: "🤬",
  fearful: "😖",
  disgusted: "🤢",
  surprised: "😲"
};

class App extends React.Component {
  video = React.createRef();

  state = { expressions: [] };

  componentDidMount() {
    this.run();
  }

  log = (...args) => {
    console.log(...args);
  };

  run = async () => {
    this.log("run started");
    try {
      await faceApi.nets.tinyFaceDetector.load("/models/");
      await faceApi.loadFaceExpressionModel(`/models/`);
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }
      });

      this.video.current.srcObject = this.mediaStream;
    } catch (e) {
      this.log(e.name, e.message, e.stack);
    }
  };

  onPlay = async () => {
    if (
      this.video.current.paused ||
      this.video.current.ended ||
      !faceApi.nets.tinyFaceDetector.params
    ) {
      setTimeout(() => this.onPlay());
      return;
    }

    const options = new faceApi.TinyFaceDetectorOptions({
      inputSize: 512,
      scoreThreshold: 0.5
    });

    const result = await faceApi
      .detectSingleFace(this.video.current, options)
      .withFaceExpressions();

    if (result) {
      this.log(result);
      const expressions = result.expressions.reduce(
        (acc, { expression, probability }) => {
          acc.push([expressionMap[expression], probability]);
          return acc;
        },
        []
      );
      this.log(expressions);
      this.setState(() => ({ expressions }));
    }
    try {
      console.log(this.state.expressions);
      if (this.state.expressions[0][1] < 0.75) {
        window.location.replace("http://localhost:3000");
      }
    } catch (e) {
      setTimeout(() => {
        console.log(e);
      }, 3000);
    }

    setTimeout(() => this.onPlay(), 1000);
  };

  render() {
    return (
      <div className="App">
        <h1>Kindly wear your mask</h1>
        <div></div>
        <div style={{ width: "100%", height: "100vh", position: "relative" }}>
          <video
            ref={this.video}
            autoPlay
            muted
            onPlay={this.onPlay}
            style={{
              position: "absolute",
              width: "100%",
              height: "100vh",
              left: 0,
              right: 0,
              bottom: 0,
              top: 0
            }}
          />
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
