# 🚀 部署到 GitHub Pages 完整指南

## 📋 前置准备

1. **GitHub 账号** - 如果没有,去 [github.com](https://github.com) 注册
2. **Git 已安装** - 终端运行 `git --version` 检查
3. **Node.js 已安装** - 终端运行 `node --version` 检查

---

## 🔧 步骤 1: 配置 Astro 支持 GitHub Pages

### 1.1 修改 `astro.config.mjs`

将配置更新为:

```javascript
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://你的用户名.github.io',  // 改成你的 GitHub 用户名
  base: '/game-guides-hub',               // 仓库名(下面会创建)
  output: 'static',
});
```

**⚠️ 重要:** 
- 把 `你的用户名` 替换为你的真实 GitHub 用户名
- `base` 的值必须和你要创建的仓库名一致

### 1.2 重新构建项目

```bash
cd game-guides-hub
npm run build
```

---

## 📦 步骤 2: 初始化 Git 仓库

### 2.1 在项目根目录初始化 Git

```bash
cd game-guides-hub
git init
```

### 2.2 创建 `.gitignore` 文件

```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/

# Build output
dist/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Astro
.astro/
EOF
```

### 2.3 添加所有文件并提交

```bash
git add .
git commit -m "Initial commit: Game guides website with i18n support"
```

---

## 🌐 步骤 3: 创建 GitHub 仓库

### 3.1 在 GitHub 创建新仓库

1. 访问 [https://github.com/new](https://github.com/new)
2. 填写信息:
   - **Repository name**: `game-guides-hub` (必须与 `astro.config.mjs` 中的 `base` 一致)
   - **Description**: `游戏攻略网站 - 艾尔登法环、幻塔、赛博朋克2077攻略`
   - **Public** ✅ (GitHub Pages 免费版只支持公开仓库)
   - **不要**勾选 "Initialize this repository with a README"
   - **不要**勾选 "Add .gitignore"
   - **不要**勾选 "Choose a license"

3. 点击 **Create repository**

### 3.2 关联远程仓库

```bash
# 替换为你的 GitHub 用户名
git remote add origin https://github.com/你的用户名/game-guides-hub.git
git branch -M main
git push -u origin main
```

---

## ⚙️ 步骤 4: 配置 GitHub Actions 自动部署

### 4.1 创建工作流文件

```bash
mkdir -p .github/workflows
```

### 4.2 创建部署工作流

创建文件 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  # 每次推送到 main 分支时触发
  push:
    branches: [main]
  # 允许手动触发
  workflow_dispatch:

# 设置 GITHUB_TOKEN 权限
permissions:
  contents: read
  pages: write
  id-token: write

# 允许一个并发部署
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build with Astro
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 4.3 提交工作流文件

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions workflow for deployment"
git push origin main
```

---

## 🎯 步骤 5: 启用 GitHub Pages

### 5.1 配置 Pages 设置

1. 访问你的仓库: `https://github.com/你的用户名/game-guides-hub`
2. 点击 **Settings** (设置)
3. 左侧菜单选择 **Pages**
4. 在 **Source** 部分:
   - **Source**: 选择 `GitHub Actions`
5. 保存设置

### 5.2 等待部署完成

- GitHub Actions 会自动构建和部署你的网站
- 在 **Actions** 标签页查看部署进度
- 通常需要 2-3 分钟

### 5.3 访问你的网站

部署完成后,你的网站地址是:
```
https://你的用户名.github.io/game-guides-hub/
```

**具体页面:**
- 首页: `https://你的用户名.github.io/game-guides-hub/`
- 英文首页: `https://你的用户名.github.io/game-guides-hub/en/`
- 中文首页: `https://你的用户名.github.io/game-guides-hub/zh/`

---

## 🔄 步骤 6: 后续更新流程

每次修改代码后,只需:

```bash
# 1. 修改代码
# 2. 构建测试
npm run build

# 3. 提交更改
git add .
git commit -m "描述你的更改"
git push origin main
```

GitHub Actions 会自动重新部署!

---

## 🎨 可选: 自定义域名

如果你想使用自己的域名(如 `guides.yourdomain.com`):

### 1. 添加 CNAME 文件

```bash
echo "guides.yourdomain.com" > public/CNAME
```

### 2. 配置 DNS

在你的域名提供商处添加:
- **类型**: CNAME
- **名称**: guides (或你的子域名)
- **值**: `你的用户名.github.io`

### 3. 在 GitHub 配置自定义域名

1. Settings → Pages
2. Custom domain: 填入 `guides.yourdomain.com`
3. 勾选 **Enforce HTTPS**

---

## 🐛 常见问题

### 问题 1: 部署后页面 404

**解决**: 检查 `astro.config.mjs` 中的 `base` 是否与仓库名一致

### 问题 2: CSS/图片加载失败

**解决**: 确保所有资源路径使用相对路径或包含 base 路径

### 问题 3: GitHub Actions 构建失败

**解决**: 
- 检查 Node.js 版本是否兼容
- 在本地先运行 `npm run build` 确保能成功构建
- 查看 Actions 日志获取详细错误信息

### 问题 4: 页面样式丢失

**解决**: 重新构建项目
```bash
npm run build
git add .
git commit -m "Rebuild"
git push
```

---

## 📝 快速命令汇总

```bash
# 首次部署
cd game-guides-hub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/game-guides-hub.git
git branch -M main
git push -u origin main

# 然后去 GitHub 创建仓库并配置 Actions

# 后续更新
git add .
git commit -m "Update description"
git push
```

---

## ✅ 验证清单

部署完成后,检查:

- [ ] 网站可以正常访问
- [ ] 首页重定向到 `/en/` 正常
- [ ] 中文页面 `/zh/` 正常
- [ ] 语言切换按钮工作正常
- [ ] 所有攻略链接可以正常打开
- [ ] 移动端显示正常
- [ ] 页面加载速度快

---

## 🎉 完成!

恭喜你!你的游戏攻略网站现在已经部署到 GitHub Pages 了!

**分享你的网站:**
```
https://你的用户名.github.io/game-guides-hub/
```

如果需要帮助,随时问我!
