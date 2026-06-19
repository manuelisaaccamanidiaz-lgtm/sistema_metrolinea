package com.metrolinea.controller;

import com.metrolinea.service.GpsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/gps")
public class GpsController {

    @Autowired
    private GpsService gpsService;

    @PostMapping("/actualizar")
    public ResponseEntity<String> recibirUbicacion(
            @RequestParam String placa,
            @RequestParam double latitud,
            @RequestParam double longitud) {
        
        // Calculamos la distancia usando nuestro nuevo servicio geográfico
        double distanciaMetros = gpsService.calcularDistanciaAProvenza(latitud, longitud);
        
        String respuestaConsole = String.format("Bus %s reportó ubicación. Distancia a Estación Provenza: %.2f metros.", 
                placa, distanciaMetros);
        
        // Imprimimos en la consola del servidor
        System.out.println(respuestaConsole);
        
        // Si el bus está a menos de 50 metros, simulamos una alerta de llegada
        if (distanciaMetros <= 50) {
            System.out.println("🚨 ALERTA: El bus " + placa + " está entrando a la Estación Provenza.");
        }
        
        return ResponseEntity.ok("Coordenadas procesadas. " + respuestaConsole);
    }
}