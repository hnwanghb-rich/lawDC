"""市场引流Agent"""
from base_agent import BaseAgent

class MarketingAgent(BaseAgent):
    def __init__(self):
        super().__init__("Marketing")

    def process(self, task):
        task_type = task.get('type')

        if task_type == 'generate_content':
            return self.generate_content(task['data'])
        elif task_type == 'lead_capture':
            return self.capture_lead(task['data'])

    def generate_content(self, data):
        """内容生成"""
        prompt = f"将案件经验转化为行业文章：{data['case_summary']}"
        response = self.client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text

    def capture_lead(self, data):
        """智能获客"""
        return {"lead_score": 85, "recommended_lawyer": data.get('lawyer_id')}
