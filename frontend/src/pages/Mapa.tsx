import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/Mapa.css';

// Solução para corrigir os ícones do Leaflet no Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const mockPontos = [
    { id: 'p1', lat: -5.0561750518919, lng: -42.78985923139746, titulo: 'Depto. Computação UFPI' }, // Departamento de Computação
    { id: 'p2', lat: -5.056682307320944, lng: -42.79735257825805, titulo: 'CCHL UFPI' }, // CCHL
];

const Mapa = () => {
  const [pontos] = useState(mockPontos);
const center: [number, number] = [
    (pontos[0].lat + pontos[1].lat) / 2,
    (pontos[0].lng + pontos[1].lng) / 2,
];

  return (
    <div className="mapa-container">
      <h2>📍 Mapa de Pontos de Coleta</h2>
      <div className="mapa-wrapper">
        <MapContainer center={center} zoom={13} className="leaflet-container">
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {pontos.map((p) => (
            <Marker key={p.id} position={[p.lat, p.lng]}>
              <Popup>
                <strong>♻️ {p.titulo}</strong>
                <br />
                Ponto de coleta disponível
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Mapa;