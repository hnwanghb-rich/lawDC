"""文书起草Agent"""
from base_agent import BaseAgent

class DocumentDraftAgent(BaseAgent):
    def process(self, task_type, data):
        if task_type == 'draft':
            doc_type = data.get('doc_type', '')
            params = data.get('params', '')
            messages = [
                {'role': 'user', 'content': f'请起草{doc_type}，参数：{params}'}
            ]
            result = self.client.chat(messages)
            return {'result': result}
        return {'error': '不支持的任务类型'}
