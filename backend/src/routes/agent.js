const express = require('express');
const router = express.Router();
const amqp = require('amqplib');

router.post('/agent', async (req, res) => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue('agent_tasks');

    channel.sendToQueue('agent_tasks', Buffer.from(JSON.stringify(req.body)));

    res.json({ status: 'processing', message: 'Agent任务已提交' });

    await channel.close();
    await connection.close();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
