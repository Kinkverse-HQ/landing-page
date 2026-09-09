# Docker landing QA

`docker-local-cta-2026-09-09.jpg` was captured on 2026-09-09 at 1280×720 from
the development Docker container at source revision `a192fe6`. It shows the CTA
caption following the configured local application URL. Production defaults keep
`app.kinkverse.org`.

The image was personally inspected before publication. It contains static site
copy and local QA URLs, with no real user data, credentials, browser chrome or
filesystem paths. Its JPEG metadata contains only a standard JFIF header.
Functional checks separately covered links, live source synchronization, image
startup health and TypeScript/Vite production compilation; the screenshot is a
visual record, not proof that those behaviors work.
