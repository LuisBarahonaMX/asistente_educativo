# =====================================================
# 🔍 Diagnóstico automático de conexión Firebase (TransApp)
# Autor: Luis Barahona / IA de soporte
# Proyecto: transapp-e56b5
# =====================================================

Write-Host "=== DIAGNÓSTICO DEL ASISTENTE DE TRÁNSITO ===" -ForegroundColor Cyan

# 1️⃣ Verificar proyecto activo
Write-Host "`n[1] Verificando proyecto activo en Firebase CLI..."
$active = firebase use
if ($active -match "transapp-e56b5") {
    Write-Host "✅ Proyecto activo: transapp-e56b5" -ForegroundColor Green
} else {
    Write-Host "⚠️ Proyecto activo incorrecto. Corrigiendo a transapp-e56b5..." -ForegroundColor Yellow
    firebase use transapp-e56b5
}

# 2️⃣ Revisar si la función "api" existe y está activa
Write-Host "`n[2] Verificando funciones desplegadas..."
$functions = firebase functions:list | Out-String
if ($functions -match "api") {
    Write-Host "✅ Función 'api' encontrada en lista de funciones." -ForegroundColor Green
} else {
    Write-Host "❌ No se encontró la función 'api'. Revisa tu carpeta /functions." -ForegroundColor Red
}

# 3️⃣ Probar acceso directo a la API desde la terminal
$apiUrl = "https://us-central1-transapp-e56b5.cloudfunctions.net/api/chat"
Write-Host "`n[3] Probando endpoint directo: $apiUrl"
try {
    $response = Invoke-WebRequest -Uri $apiUrl -Method POST -ContentType "application/json" -Body '{"question": "prueba de conexion"}' -ErrorAction Stop
    Write-Host "✅ La función respondió correctamente." -ForegroundColor Green
    Write-Host "Respuesta parcial: " ($response.Content.Substring(0, [Math]::Min(200, $response.Content.Length)))
}
catch {
    Write-Host "❌ No se pudo acceder al endpoint remoto." -ForegroundColor Red
    Write-Host "Error:" $_.Exception.Message
}

# 4️⃣ Verificar integridad de firebase.json
Write-Host "`n[4] Revisando configuración de rewrite en firebase.json..."
$json = Get-Content firebase.json -Raw | ConvertFrom-Json
$rewrite = $json.hosting.rewrites | Where-Object { $_.source -eq "/api/**" }
if ($rewrite) {
    Write-Host "✅ Rewrite correcto detectado: /api/** → functionId: $($rewrite.function.functionId)" -ForegroundColor Green
} else {
    Write-Host "❌ Rewrite no encontrado en firebase.json" -ForegroundColor Red
}

# 5️⃣ Comprobar build local
Write-Host "`n[5] Verificando si existe carpeta de build (dist)..."
if (Test-Path "./dist/index.html") {
    Write-Host "✅ Carpeta dist encontrada (compilación lista)." -ForegroundColor Green
} else {
    Write-Host "⚠️ No se encontró carpeta dist. Ejecuta: npm run build" -ForegroundColor Yellow
}

# 6️⃣ Mostrar resumen
Write-Host "`n=== RESUMEN DEL DIAGNÓSTICO ===" -ForegroundColor Cyan
Write-Host "1. Proyecto activo: " (firebase use | Out-String)
Write-Host "2. Funciones desplegadas:" ($functions | Out-String)
Write-Host "3. Endpoint probado: $apiUrl"
Write-Host "`n--------------------------------------------------"
Write-Host "Si la prueba del punto (3) falla con 404:"
Write-Host "   - Verifica que functions/index.js exporte 'exports.api'"
Write-Host "   - Asegúrate de haber hecho: firebase deploy --only 'functions,hosting'"
Write-Host "   - Comprueba que el proyecto activo sea transapp-e56b5"
Write-Host "--------------------------------------------------"
Write-Host "Diagnóstico completado."
