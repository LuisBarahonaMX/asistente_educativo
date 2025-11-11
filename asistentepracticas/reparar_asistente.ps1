Write-Host "==============================================="
Write-Host "🛠️  REPARADOR AUTOMÁTICO DEL ASISTENTE PWA"
Write-Host "==============================================="

$projectId = "asistentep-9f276"
$functionName = "api"
$region = "us-central1"
$hostingUrl = "https://$projectId.web.app/api/chat"
$functionUrl = "https://$region-$projectId.cloudfunctions.net/api/chat"

# Paso 1. Verificar proyecto activo
Write-Host "`n🔍 Verificando proyecto activo..."
$active = (firebase use) -match $projectId
if (-not $active) {
    Write-Host "⚙️ Cambiando proyecto activo a $projectId"
    firebase use $projectId | Out-Null
} else {
    Write-Host "✅ Proyecto activo: $projectId"
}

# Paso 2. Eliminar función anterior
Write-Host "`n🧹 Eliminando función vieja ($functionName)..."
try {
    firebase functions:delete $functionName --region $region --force | Out-Null
    Write-Host "✅ Función anterior eliminada."
} catch {
    Write-Host "⚠️ No se encontró una función vieja o ya estaba eliminada."
}

# Paso 3. Desplegar funciones y hosting nuevamente
Write-Host "`n🚀 Desplegando funciones y hosting..."
try {
    firebase deploy --only "functions,hosting" --force | Tee-Object -Variable deployLog | Out-Null
    Write-Host "✅ Despliegue completo."
} catch {
    Write-Host "❌ Error en despliegue. Revisa la conexión a internet o credenciales Firebase."
    exit 1
}

# Paso 4. Verificar rewrite en el archivo firebase.json
Write-Host "`n📁 Verificando rewrite en firebase.json..."
$json = Get-Content "./firebase.json" | ConvertFrom-Json
$rewriteFound = $json.hosting.rewrites | Where-Object { $_.run.serviceId -eq $functionName }

if ($rewriteFound) {
    Write-Host "✅ Rewrite detectado correctamente:"
    $rewriteFound | ConvertTo-Json -Depth 4 | Write-Host
} else {
    Write-Host "❌ No se encontró el rewrite. Es posible que Firebase CLI no lo haya aplicado."
}

# Paso 5. Probar Hosting
Write-Host "`n🌍 Probando endpoint en Hosting..."
try {
    $response = Invoke-WebRequest -Uri $hostingUrl -Method POST -Headers @{ "Content-Type"="application/json" } -Body '{"question":"Hola, ¿quién eres?"}' -TimeoutSec 30
    Write-Host "✅ HOSTING responde correctamente (HTTP $($response.StatusCode))"
    Write-Host $response.Content
} catch {
    Write-Host "❌ HOSTING aún falla: $($_.Exception.Message)"
}

# Paso 6. Probar función directa en Cloud Run
Write-Host "`n☁️ Probando endpoint en Cloud Run..."
try {
    $response = Invoke-WebRequest -Uri $functionUrl -Method POST -Headers @{ "Content-Type"="application/json" } -Body '{"question":"Hola, ¿quién eres?"}' -TimeoutSec 30
    Write-Host "✅ Cloud Run responde (HTTP $($response.StatusCode))"
    Write-Host $response.Content
} catch {
    Write-Host "❌ Error en Cloud Run: $($_.Exception.Message)"
}

# Diagnóstico final
Write-Host "`n==============================================="
Write-Host "📊 DIAGNÓSTICO FINAL"
Write-Host "==============================================="
Write-Host "• Proyecto activo: $projectId"
Write-Host "• Función: $functionName ($region)"
Write-Host "• Archivo firebase.json con rewrite: " ($rewriteFound -ne $null)
Write-Host "• Hosting: " (if ($response.StatusCode -eq 200) { "🟢 OK" } else { "🔴 Error" })
Write-Host "==============================================="
Write-Host "🏁 REPARACIÓN FINALIZADA"
Write-Host "==============================================="
