"""AI模型客户端 - 支持多种开源模型"""
import os
import requests

class ModelClient:
    def __init__(self, provider, api_endpoint, api_key, model_name):
        self.provider = provider
        self.api_endpoint = api_endpoint
        self.api_key = api_key
        self.model_name = model_name

    def chat(self, messages, temperature=0.7, max_tokens=2048):
        """统一的聊天接口"""
        if self.provider == 'qwen':
            return self._call_qwen(messages, temperature, max_tokens)
        elif self.provider == 'glm':
            return self._call_glm(messages, temperature, max_tokens)
        elif self.provider == 'deepseek':
            return self._call_deepseek(messages, temperature, max_tokens)
        else:
            raise ValueError(f"不支持的模型: {self.provider}")

    def _call_qwen(self, messages, temperature, max_tokens):
        """调用通义千问"""
        headers = {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json'
        }
        data = {
            'model': self.model_name,
            'messages': messages,
            'temperature': temperature,
            'max_tokens': max_tokens
        }
        response = requests.post(self.api_endpoint, headers=headers, json=data)
        return response.json()['choices'][0]['message']['content']

    def _call_glm(self, messages, temperature, max_tokens):
        """调用智谱GLM"""
        # 类似实现
        pass

    def _call_deepseek(self, messages, temperature, max_tokens):
        """调用DeepSeek"""
        # 类似实现
        pass
