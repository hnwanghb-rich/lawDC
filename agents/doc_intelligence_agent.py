"""文书智能Agent"""
from base_agent import BaseAgent

class DocIntelligenceAgent(BaseAgent):
    def __init__(self):
        super().__init__("DocIntelligence")

    def process(self, task):
        task_type = task.get('type')

        if task_type == 'generate_doc':
            return self.generate_document(task['data'])
        elif task_type == 'review_contract':
            return self.review_contract(task['data'])

    def generate_document(self, data):
        """文书生成"""
        prompt = f"生成{data['doc_type']}，案件信息：{data['case_info']}"
        response = self.client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=2048,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text

    def review_contract(self, data):
        """合同审查"""
        prompt = f"审查合同风险条款：{data['contract_text']}"
        response = self.client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=2048,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text
