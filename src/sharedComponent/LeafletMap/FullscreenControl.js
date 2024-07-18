import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet.fullscreen';
const FullscreenControl = createControlComponent(props => L.control.fullscreen(props))
export default FullscreenControl




