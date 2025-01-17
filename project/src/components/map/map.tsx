import clsx from 'clsx';
import {useEffect, useRef} from 'react';
import leaflet, {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/useMap/useMap';
import 'leaflet/dist/leaflet.css';
import {OfferId, Offers} from '../../types/offer';


type MapProps = {
  className: 'property__map' | 'cities__map';
  selectedOfferId: OfferId | null;
  offers: Offers;
}

const DEFAULT_COORDINATE = {
  latitude: 48.85661,
  longitude: 2.351499,
  zoom: 11
};

const defaultMarkerIcon = new Icon({
  iconUrl: './img/pin.svg',
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

const activeMarkerIcon = new Icon({
  iconUrl: './img/pin-active.svg',
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

export default function Map({className, selectedOfferId, offers}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const cityLocation = offers[0]?.city?.location ?? DEFAULT_COORDINATE;
  const map = useMap(mapRef, cityLocation);

  useEffect(() => {
    if (map) {
      const {latitude, longitude, zoom} = cityLocation;
      map.flyTo([latitude, longitude], zoom);
    }
  }, [map, cityLocation]);

  useEffect(() => {
    if (map) {
      const markerGroup = leaflet.layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            selectedOfferId !== null && offer.id === selectedOfferId
              ? activeMarkerIcon
              : defaultMarkerIcon
          )
          .addTo(markerGroup);
      });

      return () => {
        map.removeLayer(markerGroup);
      };
    }
  }, [map, offers, selectedOfferId, cityLocation]);

  return (
    <section
      className={clsx('map', {className})}
      ref={mapRef}
      style={{height: '100%', width: '100%', maxWidth: '1144px', margin: '0 auto'}}
      data-testid="map"
    >
    </section>
  );
}
