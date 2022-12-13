import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { SupportedModels, createDetector, MediaPipeFaceMesh } from '@tensorflow-models/face-landmarks-detection'
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

function App() {
  // const [img1, setImg1] = useState('')
  const [img2, setImg2] = useState('')
  const webcamRef = useRef(null);

  // useEffect(() => {
  //   (async () => {
  //   })()
  // }, [])

  const capture =
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImg2(imageSrc)
    };

  async function compare() {
    try {
      const imgelem = document.getElementById('img2')
      console.log(imgelem)
      const model = SupportedModels.MediaPipeFaceMesh;
      const detectorConfig = {
        runtime: 'mediapipe', // or 'tfjs'
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
      }
      console.log(model)
      const detector = await createDetector(model, detectorConfig);
      console.log(detector)
      const faces = await detector.estimateFaces(imgelem);
      console.log(faces)
    } catch (e) {

    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end'
        }}>
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            width={800}
            videoConstraints={videoConstraints}
            ref={webcamRef}
          >
          </Webcam>
          <button onClick={capture} style={{
            padding: '10px',
            marginTop: '20px',
          }}>Capture photo</button>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '20px',
        }}>
          <img id='img2' src={img2} alt='' style={{
            width: '500px',
            height: 'auto'
          }} />
        </div>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <button onClick={compare} style={{
          padding: '10px',
          marginTop: '20px',
        }}>Compare</button>
      </div>
    </div>
  );
}

export default App;
