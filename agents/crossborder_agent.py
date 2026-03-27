"""跨境服务Agent - 海南自贸港特色"""
from base_agent import BaseAgent

class CrossBorderAgent(BaseAgent):
    def __init__(self):
        super().__init__("CrossBorder")

    def process(self, task):
        task_type = task.get('type')

        if task_type == 'ftz_policy':
            return self.query_ftz_policy(task['data'])
        elif task_type == 'investment_structure':
            return self.design_investment_structure(task['data'])

    def query_ftz_policy(self, data):
        """自贸港政策查询"""
        prompt = f"查询海南自贸港相关政策：{data['query']}"
        response = self.client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text

    def design_investment_structure(self, data):
        """外资架构设计"""
        prompt = f"设计外商投资架构，国别：{data['country']}，行业：{data['industry']}"
        response = self.client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text
