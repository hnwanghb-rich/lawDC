"""知识产权Agent"""
from base_agent import BaseAgent

class IPManagementAgent(BaseAgent):
    def process(self, task_type, data):
        if task_type == 'analyze':
            ip_info = data.get('ip_info', '')
            messages = [
                {'role': 'user', 'content': f'请分析以下知识产权信息：\n{ip_info}'}
            ]
            result = self.client.chat(messages)
            return {'result': result}
        return {'error': '不支持的任务类型'}
