
import React, {useState, useEffect} from 'react';
import { GoogleMap, useLoadScript, Marker, OverlayView} from '@react-google-maps/api';
import Input from './Input';
import { PiFlagPennantFill } from "react-icons/pi";
// import Mic from './Mic';
// import Dictaphone from './NewMic';
import 'regenerator-runtime/runtime';
import Mic from './TestMic';

const libraries = ['places'];
const mapContainerStyle = {
  width: '810px',
  height: '98vh',
};
const defaultCenter = {
  lat: 7.2905715,
  lng: 80.6337262,
};

const AppTemplate = () => {
    const [selectedSource, setSelectedSource] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [center, setCenter] = useState(defaultCenter);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyACZp1ruaDkTyr0z_AhGeEXDaGaV0CZrPM',
        libraries,
    });

    useEffect(() => {
        if (selectedSource) {
            setCenter(selectedSource);
        } else if (selectedDestination) {
            setCenter(selectedDestination);
        }
    }, [selectedSource, selectedDestination]);

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }
    const renderCustomMarker = (position) => (
        <OverlayView
            position={position}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
            <div style={{ transform: 'translate(-50%, -50%)' }}>
                <PiFlagPennantFill size={"50px"} color="Blue" /> {/* Customize as needed */}
            </div>
        </OverlayView>
    );
    return <div className='Main'>
        <div className='Left'>
            <div className='Input'>
                <div className='Header'>
                    <h1>RRR</h1>
                </div>
                <div className='Input_Input'>
                    <Input setSelected={setSelectedSource} InputType="Source"></Input>
                    <Input setSelected={setSelectedDestination} InputType="Destination"></Input>
                </div>
            </div>
            <div className='Mic'>
                <div className='OnlyMic'>
                    <Mic></Mic>
                </div>
                <div className='Output'>Output:
                <p>This is the output from the LLM</p>
                </div> 
            </div>
        </div>
        <div className='Right'>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
            >
                {selectedSource && <Marker position={selectedSource} />}
                {selectedDestination && renderCustomMarker(selectedDestination)}
            </GoogleMap>
        </div>
    </div>
}

export default AppTemplate;
