import fetch from 'node-fetch';

async function warmCache() {
  console.log("🔥 [WARM-UP] Aquecendo o cache do Notion...");
  try {
    const response = await fetch('http://localhost:3001/api/projects');
    if (response.ok) {
      console.log("✅ [WARM-UP] Cache do servidor alimentado com sucesso!");
    } else {
      console.log("⚠️ [WARM-UP] Falha ao aquecer cache. Status:", response.status);
    }
  } catch (err) {
    console.log("❌ [WARM-UP] Erro ao conectar no proxy:", err.message);
  }
}

// Pequeno delay para garantir que o proxy subiu antes do warm-up
setTimeout(warmCache, 2000);
