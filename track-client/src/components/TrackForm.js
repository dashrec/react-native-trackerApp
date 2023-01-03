import React, { useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';


const TrackForm = () => {
  // saying inside of state we need an excess to a recording, locations and a name
  const {
    state: { recording, locations, name },
    startRecording,
    stopRecording,
    changeName,
  } = useContext(LocationContext);

  const [saveTrack] = useSaveTrack();

  return (
    <>
      <Spacer>
        <Input
          value={name}
          onChangeText={changeName}
          placeholder="Enter name"
        />
      </Spacer>

      {recording ? (
        <Button title="Stop" onPress={stopRecording} />
      ) : (
        <Button title="Start Recording" onPress={startRecording} />
      )}

      <Spacer>
        {!recording && locations.length ? (
          <Button title="Save Recording" onPress={saveTrack} />
        ) : null}
      </Spacer>
    </>
  );
};

export default TrackForm;
// Remember, anytime we are recording, a list of all of our different locations should be getting accumulated inside of that locations array.
