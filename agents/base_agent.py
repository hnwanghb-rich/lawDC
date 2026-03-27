"""Agent基础类"""
from models.model_client import ModelClient

class BaseAgent:
    def __init__(self, model_config):
        self.client = ModelClient(
            provider=model_config['provider'],
            api_endpoint=model_config['api_endpoint'],
            api_key=model_config['api_key'],
            model_name=model_config['model_name']
        )

    def process(self, task_type, data):
        raise NotImplementedError("子类必须实现process方法")
