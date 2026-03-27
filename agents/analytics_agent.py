"""数据洞察Agent"""
from base_agent import BaseAgent

class AnalyticsAgent(BaseAgent):
    def __init__(self):
        super().__init__("Analytics")

    def process(self, task):
        task_type = task.get('type')

        if task_type == 'dashboard':
            return self.generate_dashboard(task['data'])
        elif task_type == 'predict':
            return self.business_predict(task['data'])

    def generate_dashboard(self, data):
        """经营仪表盘"""
        return {
            "revenue": 1500000,
            "cases": 45,
            "clients": 30,
            "payment_rate": 0.85
        }

    def business_predict(self, data):
        """业务预测"""
        prompt = f"预测未来3个月业务量，历史数据：{data}"
        response = self.client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=512,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text
