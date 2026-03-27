"""跨境服务Agent"""
from base_agent import BaseAgent

class CrossBorderAgent(BaseAgent):
    def process(self, task_type, data):
        if task_type == 'ftz_policy':
            query = data.get('query', '')
            messages = [
                {'role': 'user', 'content': f'请查询海南自贸港相关政策：{query}'}
            ]
            result = self.client.chat(messages)
            return {'message': result}
        return {'error': '不支持的任务类型'}
