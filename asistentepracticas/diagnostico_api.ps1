Write-Host "==============================================="
Write-Host "🔧 DIAGNÓSTICO AVANZADO DEL ASISTENTE"
Write-Host "==============================================="

$project = "asistentep-9f276"
$hosting = "https://$project.web.app/api/chat"
$function = "https://us-central1-$project.cloudfunctions.net/api/chat"

# 1️⃣ Comprobar archivo firebase.json
if (Test-Path "./firebase.json") {
    $json = Get-Content "./firebase.json" -Raw | ConvertFrom-Json
    Write-Host "`n📁 Archivo firebase.json encontrado"
    if ($json.hosting.rewrites) {
        $rewrite = $json.hosting.rewrites | ConvertTo-Json -Compress
        Write-Host "✅ Rewrites configurados: $rewrite"
    } else {
        Write-Host "⚠️ No se detectaron rewrites en firebase.json"
    }
} else {
    Write-Host "❌ No se encontró firebase.json en este directorio."
}

# 2️⃣ Probar Hosting (Firebase)
Write-Host "`n🌐 Prueba de Hosting..."
try {
    $r1 = Invoke-WebRequest -Uri $hosting -Method POST -Headers @{ "Content-Type"="application/json" } -Body '{"question":"¿Prueba de conexión?"}' -TimeoutSec 15
    Write-Host "✅ Hosting responde (HTTP $($r1.StatusCode))"
    Write-Host "Contenido: $($r1.Content)"
} catch {
    Write-Host "❌ Hosting ERROR: $($_.Exception.Message)"
}

# 3️⃣ Probar Cloud Function directa
Write-Host "`n☁️ Prueba de Cloud Run..."
try {
    $r2 = Invoke-WebRequest -Uri $function -Method POST -Headers @{ "Content-Type"="application/json" } -Body '{"question":"¿Prueba directa?"}' -TimeoutSec 15
    Write-Host "✅ Cloud Run responde (HTTP $($r2.StatusCode))"
    Write-Host "Contenido: $($r2.Content)"
} catch {
    Write-Host "❌ Cloud Run ERROR: $($_.Exception.Message)"
}

Write-Host "`n==============================================="
Write-Host "🏁 FIN DEL DIAGNÓSTICO"
Write-Host "==============================================="
