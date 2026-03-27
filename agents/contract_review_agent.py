"""合同审查Agent"""
from base_agent import BaseAgent

class ContractReviewAgent(BaseAgent):
    def process(self, task_type, data):
        if task_type == 'review':
            contract_text = data.get('contract_text', '')
            messages = [
                {'role': 'user', 'content': f'请审查以下合同，指出潜在风险和建议：\n{contract_text}'}
            ]
            result = self.client.chat(messages)
            return {'result': result}
        return {'error': '不支持的任务类型'}
