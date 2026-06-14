# Playwright 102 - TestMu AI HyperExecute

## Test architecture

The test suite follows the Page Object Model conventions defined in
`playwright-test-generator-prompt.md`:

```text
locators/       Centralized selectors
pages/          Fixtures, shared actions, and UI page objects
models/         Typed scenario input models
data/           Typed test data
translations/   UI text and messages
utilities/      Constants, logging, and assertion helpers
tests/          Behavior-focused specs
```

Specs do not contain inline locators, direct Playwright assertions, or direct
page actions. UI interactions are routed through `CommonPage`; page and DOM
assertions are routed through `AssertHelper`.

Dự án Playwright + TypeScript triển khai ba scenario trên TestMu AI Selenium
Playground và chạy song song trên HyperExecute với hai môi trường:

- Windows + Chromium
- Linux + Chromium

## Cài đặt và chạy local

Yêu cầu Node.js 20 trở lên.

```bash
npm ci
npx playwright install chromium
npm test
```

Các lệnh hữu ích:

```bash
npm run typecheck
npm run test:headed
npm run report
```

Có thể cấu hình test từ bên ngoài bằng environment variables:

```powershell
$env:PLAYGROUND_URL = "https://www.testmuai.com/selenium-playground/"
$env:TEST_MESSAGE = "Welcome to TestMu AI"
npm test
```

## Chạy trên HyperExecute

1. Tạo hai secret trong HyperExecute Dashboard:
   `LT_USERNAME` và `LT_ACCESS_KEY`.
2. Tải HyperExecute CLI cho hệ điều hành đang sử dụng.
3. Nếu chạy CLI từ máy local, đặt thông tin xác thực:

```powershell
$env:LT_USERNAME = "your-username"
$env:LT_ACCESS_KEY = "your-access-key"
.\hyperexecute.exe --config hyperexecute.yaml --download-artifacts --force-clean-artifacts
```

Hoặc tạo `.env` với `LT_USERNAME` và `LT_ACCESS_KEY`, sau đó chạy:

```powershell
npm run test:hyperexecute
```

`hyperexecute.yaml` chạy bằng credentials được nạp từ `.env`.
`hyperexecute-vault.yaml` thể hiện Secret Management và dùng sau khi tạo
`LT_USERNAME`, `LT_ACCESS_KEY` trong HyperExecute Dashboard.

Hai file cấu hình thể hiện các yêu cầu của assignment:

- Matrix đa hệ điều hành với `win` và `linux`.
- Secrets được inject bằng `${{.secrets.LT_USERNAME}}` và
  `${{.secrets.LT_ACCESS_KEY}}` trong `hyperexecute-vault.yaml`.
- Environment variables `PLAYGROUND_URL`, `TEST_MESSAGE` và `EXECUTION_OS`.
- Pre steps cài dependency bằng npm và cài Chromium.
- Dependency cache dựa trên checksum của `package-lock.json`.
- `PLAYWRIGHT_BROWSERS_PATH` đưa Chromium vào `.playwright-cache` để tái sử dụng.
- Post step ghi môi trường vừa hoàn thành.
- Artifacts gồm HTML report, JUnit XML, screenshot, video và trace.

Các artifact được tải trực tiếp bằng tùy chọn `--download-artifacts` hoặc từ
HyperExecute Dashboard.

## GitHub Actions

Workflow `.github/workflows/hyperexecute.yml` chạy khi push/pull request vào
`main` hoặc khi kích hoạt thủ công. Tạo repository secrets:

- `LT_USERNAME`
- `LT_ACCESS_KEY`

Workflow tải HyperExecute CLI, trigger job cloud và upload file artifact đã tải
về GitHub Actions.
