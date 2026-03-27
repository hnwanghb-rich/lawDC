"""财务效益Agent"""
from base_agent import BaseAgent

class FinanceAgent(BaseAgent):
    def __init__(self):
        super().__init__("Finance")

    def process(self, task):
        task_type = task.get('type')

        if task_type == 'calculate_fee':
            return self.calculate_fee(task['data'])
        elif task_type == 'payment_reminder':
            return self.payment_reminder(task['data'])

    def calculate_fee(self, data):
        """智能计费"""
        prompt = f"计算律师费用，工时：{data['hours']}，案件类型：{data['case_type']}"
        response = self.client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=512,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text

    def payment_reminder(self, data):
        """回款提醒"""
        return {"overdue_days": data.get('days', 0), "action": "send_reminder"}
