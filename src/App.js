import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { loadSsdMobilenetv1Model, loadFaceLandmarkModel, loadFaceRecognitionModel, detectAllFaces, bufferToImage, loadFaceExpressionModel, detectSingleFace, LabeledFaceDescriptors, FaceMatcher, resizeResults } from 'face-api.js'

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const MODEL_URL = '/models'

function App() {
  const [img1, setImg1] = useState('')
  const [img2, setImg2] = useState('')
  const webcamRef = useRef(null);

  useEffect(() => {
    (async () => {
      await loadSsdMobilenetv1Model(MODEL_URL)
      await loadFaceLandmarkModel(MODEL_URL)
      await loadFaceRecognitionModel(MODEL_URL)
      await loadFaceExpressionModel(MODEL_URL)
    })()
  }, [])


  const capture =
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      if (img1.length > 0) {
        setImg2(imageSrc)
      } else {
        setImg1(imageSrc)
      }
    };

  async function compare() {
    const img = document.getElementById('img1')
    const faceDescription = await detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
    const faceDescriptors = [faceDescription.descriptor]
    const labeledFaceDescriptors = new LabeledFaceDescriptors('first image', faceDescriptors)
    console.log(labeledFaceDescriptors)

    const faceMatcher = new FaceMatcher(labeledFaceDescriptors, .6)
    console.log(faceMatcher)

    const img2 = document.getElementById('img2')
    let faceDescription2 = await detectSingleFace(img2).withFaceLandmarks().withFaceDescriptor().withFaceExpressions()
    faceDescription2 = resizeResults(faceDescription2, img2)

    const results = faceMatcher.findBestMatch(faceDescription2.descriptor)
    console.log(results)
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
          <img id='img1' src={img1} alt='' style={{
            width: '500px',
            height: 'auto'
          }} />
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
        <p>results: </p>
        <button onClick={compare} style={{
          padding: '10px',
          marginTop: '20px',
        }}>Compare</button>
      </div>
    </div>
  );
}

export default App;
