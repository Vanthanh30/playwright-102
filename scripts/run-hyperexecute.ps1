$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $projectRoot '.env'
$cliPath = Join-Path $projectRoot 'hyperexecute.exe'
$artifactsPath = Join-Path $projectRoot 'artifacts'

if (-not (Test-Path -LiteralPath $envFile)) {
  throw "Missing environment file: $envFile"
}

Get-Content -LiteralPath $envFile |
  Where-Object { $_ -and -not $_.StartsWith('#') } |
  ForEach-Object {
    $name, $value = $_ -split '=', 2
    if ($name -and $value) {
      Set-Item -Path "Env:$($name.Trim())" -Value $value.Trim()
    }
  }

if (-not $env:LT_USERNAME -or -not $env:LT_ACCESS_KEY) {
  throw 'LT_USERNAME and LT_ACCESS_KEY must be defined in .env.'
}

if (-not (Test-Path -LiteralPath $cliPath)) {
  Invoke-WebRequest `
    -UseBasicParsing `
    -Uri 'https://downloads.lambdatest.com/hyperexecute/windows/hyperexecute.exe' `
    -OutFile $cliPath
}

Push-Location $projectRoot
try {
  & $cliPath `
    --config hyperexecute.yaml `
    --download-artifacts-zip `
    --download-artifacts-path "$artifactsPath\" `
    --download-logs `
    --force-clean-artifacts

  if ($LASTEXITCODE -ne 0) {
    throw "HyperExecute exited with code $LASTEXITCODE."
  }
}
finally {
  Pop-Location
}
