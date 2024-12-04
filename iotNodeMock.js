const mqtt = require('mqtt');

function getMock() {
    return [
        {
            id: 1, 
            weight: 20, 
            compartment: 1,
            time: "09:55"
        },
        {
            id: 2, 
            weight: 50, 
            compartment: 2,
            time: "09:55"
        },
        {
            id: 3, 
            weight: Math.floor(Math.random() * 501), 
            compartment: 3,
            time: "09:55"
        },
        {
            id: 4, 
            weight: Math.floor(Math.random() * 501), 
            compartment: 4,
            time: "09:55"
        },
        {
            id: 5, 
            weight: Math.floor(Math.random() * 501), 
            compartment: 5,
            time: "09:55"
        },
        {
            id: 6, 
            weight: 90, 
            compartment: 6,
            time: "09:55"
        }
    ]
}

// Defina suas credenciais e informações do broker MQTT
const brokerAddress = "mqtt://localhost"; // Endereço do broker MQTT local
const options = {
    port: 1883, // Porta padrão MQTT
    clientId: 'mock_client_' + Math.random().toString(16).substr(2, 8) // ID do cliente para conexão
};

const topic = "smartBag/status/all";

const client = mqtt.connect(brokerAddress, options);

client.on('connect', () => {
    console.log('Conectado ao broker MQTT');
    
    // Função para publicar mensagem a cada 10 segundos
    setInterval(() => {
        client.publish(topic, JSON.stringify(getMock()));
        console.log('Mensagem publicada');
    }, 5000);  // Intervalo de 10 segundos (10000 milissegundos)
  });

client.on('error', (err) => {
    console.error('Erro de conexão MQTT:', err);
  });

