export const healthCheck = (req, res) => {
  res.json({ 
    status: "ok",
    message: "MemeForge server is running",
    timestamp: new Date().toISOString()
  });
};