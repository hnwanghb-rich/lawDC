"""Agent基础类"""
import os
from anthropic import Anthropic

class BaseAgent:
    def __init__(self, name):
        self.name = name
        self.client = Anthropic(api_key=os.getenv('CLAUDE_API_KEY'))

    def process(self, task):
        """处理任务的基础方法"""
        raise NotImplementedError
