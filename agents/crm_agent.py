"""客户关系Agent"""
from base_agent import BaseAgent

class CRMAgent(BaseAgent):
    def __init__(self):
        super().__init__("CRM")

    def process(self, task):
        task_type = task.get('type')

        if task_type == 'client_profile':
            return self.create_client_profile(task['data'])
        elif task_type == 'demand_predict':
            return self.predict_demand(task['data'])

    def create_client_profile(self, data):
        """客户画像"""
        prompt = f"分析客户信息并生成画像：{data}"
        response = self.client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text

    def predict_demand(self, data):
        """需求预测"""
        prompt = f"基于客户行业和海南自贸港政策，预测法律需求：{data}"
        response = self.client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text
