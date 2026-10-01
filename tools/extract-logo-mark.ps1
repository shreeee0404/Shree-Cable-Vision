# Produces a transparent-background PNG of the Shree Cable Vision symbol mark
# from the original artwork. The source file is never modified.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = 'd:\shree-cable-vision'
$src  = Join-Path $root 'src\frontend\public\assets\uploads\image-019d23cd-7729-7348-b7cf-ae0212b58bf5-1.png'
$outDir = Join-Path $root 'src\frontend\public\assets\branding'
$out  = Join-Path $outDir 'scv-mark.png'

New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$img = [System.Drawing.Bitmap]::FromFile($src)

# Symbol-mark bounding box (tight, with a small breathing margin)
$x0 = 130; $x1 = 605
$y0 = 272; $y1 = 645

$w = $x1 - $x0
$h = $y1 - $y0

$dst = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = $y0; $y -lt $y1; $y++) {
  for ($x = $x0; $x -lt $x1; $x++) {
    $c = $img.GetPixel($x, $y)
    $lum = (0.299 * $c.R + 0.587 * $c.G + 0.114 * $c.B)

    # White matte (lum ~250) -> alpha 0. Logo ink (lum <= 90) -> alpha 255.
    $a = (232 - $lum) / (232 - 88)
    if ($a -lt 0) { $a = 0 }
    if ($a -gt 1) { $a = 1 }
    # Gentle easing removes the hard matte halo on anti-aliased edges.
    $a = $a * $a * (3 - 2 * $a)

    $alpha = [int][Math]::Round($a * 255)

    if ($alpha -eq 0) {
      $dst.SetPixel($x - $x0, $y - $y0, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
      continue
    }

    # Un-premultiply the ink colour so soft edges stay clean over dark backgrounds.
    $dst.SetPixel($x - $x0, $y - $y0, [System.Drawing.Color]::FromArgb(
      $alpha,
      [Math]::Min(255, $c.R),
      [Math]::Min(255, $c.G),
      [Math]::Min(255, $c.B)
    ))
  }
}

$dst.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$dst.Dispose()
$img.Dispose()

Write-Output "wrote $out ($w x $h)"