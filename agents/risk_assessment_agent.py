"""风险评估Agent"""
from base_agent import BaseAgent

class RiskAssessmentAgent(BaseAgent):
    def process(self, task_type, data):
        if task_type == 'assess':
            case_info = data.get('case_info', '')
            messages = [
                {'role': 'user', 'content': f'请评估以下案件的风险：\n{case_info}'}
            ]
            result = self.client.chat(messages)
            return {'result': result}
        return {'error': '不支持的任务类型'}
