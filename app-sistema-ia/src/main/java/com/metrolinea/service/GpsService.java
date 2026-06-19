package com.metrolinea.service;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;

@Service
public class GpsService {

    private final GeometryFactory geometryFactory = new GeometryFactory();

    // 1. Punto de control: Estación Provenza en Bucaramanga (Lat: 7.1038, Lon: -73.1189)
    private final double PROVENZA_LAT = 7.1038;
    private final double PROVENZA_LON = -73.1189;

    /**
     * Calcula la distancia exacta en metros entre el bus y la Estación Provenza
     */
    public double calcularDistanciaAProvenza(double busLat, double busLon) {
        // Creamos los puntos geográficos usando la librería JTS
        Point puntoBus = geometryFactory.createPoint(new Coordinate(busLon, busLat));
        Point puntoProvenza = geometryFactory.createPoint(new Coordinate(PROVENZA_LON, PROVENZA_LAT));

        // Fórmula de Haversine para convertir coordenadas polares a metros reales en la Tierra
        return calcularHaversine(busLat, busLon, PROVENZA_LAT, PROVENZA_LON);
    }

    private double calcularHaversine(double lat1, double lon1, double lat2, double lon2) {
        double R = 6371000; // Radio de la Tierra en metros
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                   Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                   Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}