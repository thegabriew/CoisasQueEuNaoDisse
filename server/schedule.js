import schedule from "node-schedule";
import messageController from "./controllers/messageController.js";

schedule.scheduleJob("0 0 * * *", async () => {
  console.log("Rodando limpeza de mensagens antigas...");
  try {
    await messageController.excludeMessages();
    console.log("Limpeza concluída com sucesso.");
  } catch (error) {
    console.error("Erro ao limpar mensagens antigas:", error);
  }
});   