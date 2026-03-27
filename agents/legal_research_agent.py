"""法律研究Agent"""
from base_agent import BaseAgent

class LegalResearchAgent(BaseAgent):
    def process(self, task_type, data):
        if task_type == 'search':
            query = data.get('query', '')
            messages = [
                {'role': 'user', 'content': f'请检索以下法律问题的相关法条和案例：{query}'}
            ]
            result = self.client.chat(messages)
            return {'result': result, 'query': query}
        return {'error': '不支持的任务类型'}
