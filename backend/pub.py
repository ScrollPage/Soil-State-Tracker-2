import paho.mqtt.client as mqtt
from loguru import logger
from service import MQTT_HOST, MQTT_PORT

def on_connect(client, userdata, flags, rc):
    logger.info(f'Connected with result code {rc}')

def on_publish(client, userdata, mid):
    logger.info(f'Published {mid}')

client = mqtt.Client()
client.on_publish = on_publish
client.on_connect = on_connect
client.connect(MQTT_HOST, MQTT_PORT, 3600)

if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(
		client.publish('data', input())
	)
    asyncio.get_event_loop().run_forever()
    