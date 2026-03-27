"""Agent调度器"""
import pika
import json
from case_manager_agent import CaseManagerAgent
from crm_agent import CRMAgent
from doc_intelligence_agent import DocIntelligenceAgent
from crossborder_agent import CrossBorderAgent
from finance_agent import FinanceAgent
from marketing_agent import MarketingAgent
from knowledge_agent import KnowledgeBaseAgent
from compliance_agent import ComplianceAgent
from collaboration_agent import CollaborationAgent
from analytics_agent import AnalyticsAgent

class AgentOrchestrator:
    def __init__(self):
        self.agents = {
            'case_manager': CaseManagerAgent(),
            'crm': CRMAgent(),
            'doc_intelligence': DocIntelligenceAgent(),
            'crossborder': CrossBorderAgent(),
            'finance': FinanceAgent(),
            'marketing': MarketingAgent(),
            'knowledge': KnowledgeBaseAgent(),
            'compliance': ComplianceAgent(),
            'collaboration': CollaborationAgent(),
            'analytics': AnalyticsAgent()
        }
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters('localhost')
        )
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue='agent_tasks')

    def start(self):
        """启动调度器"""
        self.channel.basic_consume(
            queue='agent_tasks',
            on_message_callback=self.handle_task,
            auto_ack=True
        )
        print('Agent调度器已启动')
        self.channel.start_consuming()

    def handle_task(self, ch, method, properties, body):
        """处理任务"""
        task = json.loads(body)
        agent_name = task.get('agent')

        if agent_name in self.agents:
            result = self.agents[agent_name].process(task)
            print(f"任务完成: {result}")

if __name__ == '__main__':
    orchestrator = AgentOrchestrator()
    orchestrator.start()
