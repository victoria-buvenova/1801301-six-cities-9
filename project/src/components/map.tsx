import { useEffect, useRef } from 'react';

import leaflet, { Marker } from 'leaflet';
import { City, Location } from './app/app-props';
import useMap from '../hooks/useMap';

type PointLocation = Location & { isActive: boolean }
type MapProps = { city: City, points: PointLocation[] }

const URL_MARKER_DEFAULT = 'img/pin.svg';
const URL_MARKER_CURRENT = 'img/pin-active.svg';

function Map(props: MapProps) {
  const { city, points } = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker
          .setIcon(
            point.isActive !== undefined && point.isActive
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
      });
    }
  }, [currentCustomIcon, defaultCustomIcon, map, points]);

  return (
    <div style={{ height: '500px' }} ref={mapRef}>
    </div>
  );
}

export default Map;
