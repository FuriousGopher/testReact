import React, { ChangeEvent, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
//import InputFile from './components/InputFile/InputFile'
const InputFile = () => {
  const ref = useRef<any>()
  const [file, setFile] = useState<File | null>(null)
  const [base64, setBase64] = useState<ArrayBuffer | null | string>(null)
  const onClickHandler = () => {
    ref.current.click()
  }
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    console.log({event})
    if (event.target.files) {
      setFile(event.target.files[0])
      reader.onloadend = () => {
        setBase64(reader.result)
      }
      reader.readAsDataURL(event.target.files[0])
    }
  }
  
  return (
      <div>
          <input type="file"accept='image/bmp, image/jpeg, image/x-png, image/png, image/gif' ref={ref} style={{display: 'none'}} onChange={onChangeHandler} />
          <button onClick={onClickHandler} className="Button">Click here</button>
          <div>
            {file && (
              <><span>{file.name}</span><span>{file.type}</span></>
            )}
            {typeof base64 === 'string' && (
              <img src={base64}/>
            )}
          </div>
      </div>
  )
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <InputFile/>
      </header>
    </div>
  );
}

export default App;
