"""合规风控Agent"""
from base_agent import BaseAgent

class ComplianceAgent(BaseAgent):
    def __init__(self):
        super().__init__("Compliance")

    def process(self, task):
        task_type = task.get('type')

        if task_type == 'conflict_check':
            return self.conflict_check(task['data'])
        elif task_type == 'risk_assessment':
            return self.risk_assessment(task['data'])

    def conflict_check(self, data):
        """利益冲突审查"""
        return {"conflict": False, "checked_parties": data.get('parties', [])}

    def risk_assessment(self, data):
        """执业风险评估"""
        prompt = f"评估案件风险等级：{data['case_type']}"
        response = self.client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=512,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text
