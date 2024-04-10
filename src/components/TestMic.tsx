//@ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Lottie from 'react-lottie';
import microphoneAnimation from '../Animation - 1712178206379.json';

function Mic() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // State to control Lottie animation
  const [animationState, setAnimationState] = useState({
    loop: false,
    autoplay: false,
  });

  // Effect to toggle animation based on 'listening' state
  useEffect(() => {
    setAnimationState({
      loop: listening,
      autoplay: listening,
    });
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  // Function to toggle microphone listening
  function toggleMic() {
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
      console.log(transcript)
      resetTranscript();
    }
  }

  const defaultOptions = {
    loop: animationState.loop,
    autoplay: animationState.autoplay,
    animationData: microphoneAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    },
  };

  return (
    <div>
      <div onClick={toggleMic} className="pointer-cursor">
        <Lottie
          options={defaultOptions}
          height={100}
          width={100}
          // isStopped={!animationState.autoplay}
        />
      </div>
      <p>Microphone: {listening ? 'Listening to your voice...' : 'off'}</p>
      <p>
        <span>{transcript}</span>
      </p>
    </div>
  );
}

export default Mic;
