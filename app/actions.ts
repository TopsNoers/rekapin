'use server'

export async function triggerN8nWorkflow(storageId: string) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL

  if (!webhookUrl) {
    throw new Error('N8N_WEBHOOK_URL environment variable is not set')
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ storageId }),
    })

    if (!response.ok) {
      throw new Error(`Failed to trigger n8n workflow: ${response.statusText}`)
    }

    return { success: true }
  } catch (error) {
    console.error('Error triggering n8n workflow:', error)
    throw error
  }
}
