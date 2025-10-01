// scheduler.js
import schedule from "node-schedule";
import messageController from "./controllers/messageController.js";

schedule.scheduleJob("0 0 * * *", async () => {
  console.log("Rodando limpeza de mensagens antigas...");
  await messageControllerexcludeMessages();
});
