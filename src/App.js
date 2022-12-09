import { useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

function App() {
  const [img1, setImg1] = useState('')
  const [img2, setImg2] = useState('')

  const webcamRef = useRef(null);
  const capture =
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      if (img1.length > 0) {
        setImg2(imageSrc)
      } else {
        setImg1(imageSrc)
      }
    };

  function compare() {

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
          <img src={img1} alt='' style={{
            width: '500px',
            height: 'auto'
          }} />
          <img src={img2} alt='' style={{
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
