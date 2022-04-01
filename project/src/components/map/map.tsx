import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import leaflet, { Marker, latLng } from 'leaflet';
import { City, Location } from '../app/app-props';
import { useMap } from '../../hooks/useMap';

type PointLocation = Location & { isActive?: boolean }
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
    const markers: Marker[] = [];
    if (map) {
      map.panTo(latLng(city.location.latitude, city.location.longitude));
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });
        markers.push(marker);

        marker
          .setIcon(
            point.isActive !== undefined && point.isActive
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
      });
    }
    return () => markers.forEach((marker) => {
      marker.remove();
    });
  }, [currentCustomIcon, defaultCustomIcon, map, points, city.location.latitude, city.location.longitude]);

  return (
    <div style={{ height: '100%' }} ref={mapRef}>
    </div>
  );
}

export default Map;
