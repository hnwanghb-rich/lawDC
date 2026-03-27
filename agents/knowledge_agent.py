"""知识库Agent"""
from base_agent import BaseAgent

class KnowledgeBaseAgent(BaseAgent):
    def __init__(self):
        super().__init__("KnowledgeBase")

    def process(self, task):
        task_type = task.get('type')

        if task_type == 'search':
            return self.search(task['data'])
        elif task_type == 'extract_experience':
            return self.extract_experience(task['data'])

    def search(self, data):
        """智能检索"""
        prompt = f"搜索法律知识：{data['query']}"
        response = self.client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text

    def extract_experience(self, data):
        """经验沉淀"""
        prompt = f"提取案件可复用经验：{data['case_info']}"
        response = self.client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=512,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text
