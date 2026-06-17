# ╔══════════════════════════════════════════════════════════════╗
# ║   Computer Science — Video File  (1 video slot)             ║
# ║   ADST-BiZ-VISUAL ARTS EXHIBITION · MLIA Shenzhen           ║
# ╚══════════════════════════════════════════════════════════════╝

## HOW THE FALLBACK SYSTEM WORKS
  1. Site tries YOUR local file first  → green badge  📁 Local File
  2. If NOT found                      → YouTube plays seamlessly ▶ YouTube
  The page NEVER breaks.

## EXACT FILENAME TO USE  (one file only)
  cs_video_01.mp4        ←  recommended
  cs_video_01.webm       ←  alternative
  cs_video_01.mov        ←  alternative
  (formats tried in that order — first one found is used)

  Title shown on site:  "CS Department Showcase"

## UPDATE YOUR YOUTUBE FALLBACK ID
  Open:   src/data/departments.ts
  Find:   computerScienceVideos
  Change: youtubeId: 'YOUR_REAL_ID_HERE'
  (YouTube URL format: https://www.youtube.com/watch?v=YOUR_REAL_ID_HERE)

## NETLIFY DEPLOYMENT OPTIONS

  OPTION A — Small file (< 50 MB):
    git add public/videos/Computer_Science_Videos/cs_video_01.mp4
    git commit -m "Add CS video"
    git push
    → Netlify serves it automatically.

  OPTION B — Large file (50 MB – 2 GB) via Git LFS:
    git lfs install
    git lfs track "public/videos/**/*.mp4"
    git lfs track "public/videos/**/*.webm"
    git lfs track "public/videos/**/*.mov"
    git add .gitattributes
    git commit -m "Track videos with LFS"
    Then add the video file, commit, and push.
    Enable "Netlify Large Media" in your Netlify dashboard.

  OPTION C — YouTube only (no local file needed):
    Just update youtubeId in departments.ts. Done.

## ENCODING RECOMMENDATION
  Tool:    HandBrake (free) — https://handbrake.fr
  Preset:  Fast 1080p30
  Format:  MP4  |  Codec: H.264  |  Audio: AAC stereo 160 kbps
  Quality: RF 23–26  (lower number = larger file, higher quality)
  Target:  Under 80 MB for smooth Netlify streaming
