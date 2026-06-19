package com.metrolinea.controller;

import com.metrolinea.dto.ChatRequest;
import com.metrolinea.dto.ChatResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ia")
@CrossOrigin(origins = "*") // Permite peticiones desde el FrontEnd
public class IaController {

    @PostMapping("/chat")
    public ChatResponse chat(@RequestBody ChatRequest request) {
        String userMessage = request.getMessage().toLowerCase();
        String botResponse;

        // Lógica de simulación de IA simple
        if (userMessage.contains("hola") || userMessage.contains("buenos días")) {
            botResponse = "¡Hola! Soy el asistente inteligente de SITME Metrolínea. ¿En qué puedo ayudarte hoy?";
        } else if (userMessage.contains("saldo") || userMessage.contains("billetera")) {
            botResponse = "Puedes consultar tu saldo en la sección 'Mi Billetera'. Recuerda que ahora usamos un sistema ABT basado en la nube.";
        } else if (userMessage.contains("ruta") || userMessage.contains("bus")) {
            botResponse = "Para ver rutas en tiempo real, puedes usar el Planificador de Viajes o la sección de Seguimiento de Bus.";
        } else if (userMessage.contains("recarga")) {
            botResponse = "Contamos con múltiples puntos de recarga (CAE) y también puedes recargar digitalmente vía Wompi o Nequi.";
        } else {
            botResponse = "Entiendo. Por ahora soy un asistente en fase de prueba, pero pronto tendré acceso a datos en tiempo real de todo el sistema.";
        }

        return new ChatResponse(botResponse);
    }
}
