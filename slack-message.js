if (process.env.PIPELINE_TYPE && process.env.PIPELINE_TYPE == 'nextgen-site' && !process.env.SITE_CONFIG) {
  console.log(`Alert not sent: SITE_CONFIG is not set`);
  process.exit(0)
}

const axios = require('axios');
const webhookUrl = process.env.SITE_DEPLOYMENTS_SLACK_WEBHOOK_URL;

const bitb_host="https://bitbucket.org"

let head_text = `Notification sent from <${bitb_host}/${process.env.BITBUCKET_WORKSPACE}`;
head_text += `/${process.env.BITBUCKET_REPO_SLUG}/addon/pipelines/home#!/results/${process.env.BITBUCKET_BUILD_NUMBER}`;
head_text += `|Pipeline #${process.env.BITBUCKET_BUILD_NUMBER}>`;
head_text += `: ${process.env.BITBUCKET_REPO_SLUG}:${process.env.BITBUCKET_BRANCH}`;
head_text += ` (${process.env.BITBUCKET_DEPLOYMENT_ENVIRONMENT}) (${process.env.BITBUCKET_TRIGGERER_USERNAME}) `

let text = `${head_text}\n---\nBitbucket Pipeline exit code: ${process.env.BITBUCKET_EXIT_CODE}`;

const attachments = [];
if (process.env.POD_OUTPUT && process.env.POD_OUTPUT.trim() !== '') {
  attachments.push({
    title: "Pod output logs",
    text: `\n\`\`\` ${process.env.POD_OUTPUT} \`\`\``,
    color: "#ff0000",
    footer: "Slack alert",
  });
}

const message = {
  text,
  attachments
};

axios.post(
  webhookUrl,
  message,
  {
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
.then(response => {
  console.log(`Status: ${response.status}`);
  console.log(response.data);
})
.catch(error => {
  console.error('Error sending message to Slack:', error.message);
});
