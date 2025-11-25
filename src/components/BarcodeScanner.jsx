import React, { useRef, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

export default function BarcodeScanner({ onDetected }){
  const videoRef = useRef();
  useEffect(()=>{
    const codeReader = new BrowserMultiFormatReader();
    codeReader.getVideoInputDevices().then((videoInputDevices)=>{
      if(videoInputDevices.length === 0) return;
      const deviceId = videoInputDevices[0].deviceId;
      codeReader.decodeFromVideoDevice(deviceId, videoRef.current, (result, err)=>{
        if(result && result.getText()){
          onDetected(result.getText());
        }
      });
    });
    return ()=> codeReader.reset();
  },[]);
  return <div style={{width:64,height:48,border:'1px solid #eee',borderRadius:6,overflow:'hidden'}}><video ref={videoRef} style={{width:'100%',height:'100%'}} /></div>;
}
