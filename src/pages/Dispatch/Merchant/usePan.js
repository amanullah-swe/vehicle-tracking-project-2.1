import React, { forwardRef, useImperativeHandle } from 'react';
import { useMap } from 'react-leaflet';

const PanToButton = forwardRef(({ lat, lng }, ref) => {
  const map = useMap();

  const panToLocation = () => {
    console.log('ref have run')
    map.setView([lat, lng], map.getZoom());
  };

  useImperativeHandle(ref, () => ({
    panToLocation,
  }));

  return null;
});

export default PanToButton;
