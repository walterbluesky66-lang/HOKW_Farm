# AGENTS.md

本文件是 `E:\HOKW_Farm` 项目的 Codex 协作交接文件。其他 Codex 对话进入本项目时，应优先阅读并维护本文件。

## 项目概况

这是一个《王者荣耀世界》家园种田助手网页工具。

当前形态：

- 本地静态网页；可通过 `npm run build` 生成 `dist/`，用于 Cloudflare Pages 静态发布。
- 作物标准库固化在 `app.js`，不再读取用户自录作物；其余用户数据默认保存在浏览器 `localStorage`，配置 Supabase 后可用邮箱验证码登录，并把现有可迁移数据作为私有云端 JSON 快照自动同步。
- 当前只管理一整块菜地的一批作物，不管理多块独立菜地。
- 牧场按 1-12 个栏位总数管理动物数量，用户只填写 16 小时动物和 20 小时动物各多少只，并按两组批次计时。
- 支持浏览器通知、页面内提示和柔和提示音。
- 支持一键规划二级页面，从开启规划起生成一周动态种植排期；二级页展示下一步、总体时间进度和当前作物进度，三级页展示完整一周计划。
- 支持经验规划器二级页面；输入经验目标后，按一键规划理论作物排期和牧场最小催产间隔估算 7 天内能否达成。
- 支持牧场管理二级页面；牧场暂不纳入一键规划排期。
- 支持兴趣圈经验记录二级页面；主页仅作为入口，兴趣圈逻辑独立放在 `interest-circle.html` 和 `interest-circle.js`，不接入农场、牧场或一键规划数据。
- 暂不管理药物作物，也不把药物作物混入经验或百工币收益计算。
- 第一版云存档采用 Supabase Auth + RLS + `user_snapshots` JSON 快照；每个登录用户第一版只使用一个 `primary` 私有存档槽。

## 当前文件结构

- `index.html`：主页面入口，负责打卡、牧场提醒、当前作物展示和顶部二级页入口。
- `residence-settings.html`：居所设置二级页面，负责当前居所等级、农田数量和菜摊等级。
- `user-storage.html`：用户与存档管理二级页面，负责云存档登录、本地备份导出和导入。
- `rules.html`：种菜规则二级页面。
- `crop-archive.html`：作物/动物档案库二级页面，负责只读标准作物库展示和动物资料录入、编辑、标准库导出。
- `value-calculator.html`：作物/动物性价比计算器二级页面，负责作物基准收益、动物回本、排序和孙膑周期总收益分析。
- `ranch.html`：牧场管理二级页面，负责牧场栏位数量、动物摊等级、16/20 小时动物数量和批次收获计时。
- `planner.html`：一键规划二级页面，负责下一步建议、总体时间进度、当前作物进度、周末目标和睡眠时间规划。
- `planner-detail.html`：一键规划三级详情页，按箭头卡片展示完整一周种植排期。
- `experience-planner.html`：经验规划器二级页面，负责目标经验输入、作物理论排期经验、牧场批次经验和关键计算过程展示。
- `interest-circle.html`：兴趣圈经验记录二级页面，负责按日期录入每组 TAG 的累计经验、查看历史和维护 TAG 分类。
- `style.css`：页面样式。
- `favicon.svg`：站点图标，避免线上浏览器请求默认图标时产生 404。
- `storage-keys.js`：统一维护可导出、可导入、可云同步的本地数据键。
- `cloud-config.js`：本地空配置占位；构建到 `dist/` 时由 `scripts/build-site.js` 根据 Cloudflare 环境变量生成线上配置。
- `cloud-sync.js`：Supabase 邮箱验证码登录、云端快照恢复、恢复刷新防循环和自动上传逻辑。
- `app.js`：作物配置、动物档案、浇水规则、进度计算、牧场批次、提醒、一键规划、经验规划器和本地存储逻辑。
- `interest-circle.js`：兴趣圈独立脚本，使用 `wzry-world-interest-circle-v1` 本地状态，不依赖 `app.js`。
- `package.json`：提供 `npm run build` 发布脚本和回归验证脚本。
- `scripts/build-site.js`：生成 Cloudflare Pages 发布目录 `dist/`，只复制网站运行必需文件。
- `scripts/verify-cloud-sync-reload-guard.js`：模拟云端旧快照恢复后的本地迁移场景，以及恢复刷新前重复 Supabase auth 回调场景，验证不会反复自动刷新。
- `supabase/user_snapshots.sql`：Supabase 私有云存档表、RLS 策略和更新时间触发器。
- `.gitignore`：忽略 `dist/`、`node_modules/` 和临时发布 ZIP。
- `README.md`：项目规则和启动方式。
- `TODO.md`：后续开发计划。
- `wzry_world_farm_helper_progress_audio (1).html`：原始单文件版本，保留作参考，不要直接在这个文件上继续迭代。

## 开发原则

- 不要重写整个项目；在现有 `index.html`、`crop-archive.html`、`value-calculator.html`、`ranch.html`、`style.css`、`app.js`、`rules.html` 基础上小步迭代。
- 不要随意改动核心计算规则。除非发现明确 BUG，先说明问题，再做最小范围修复。
- 主页面优先显示用户当下要操作的信息；规则说明放在 `rules.html`。
- 保持本地静态网页可直接打开，不要引入必须构建才能运行的依赖，除非用户明确要求升级架构。
- 发布到公网时使用 `dist/`，不要直接发布项目根目录；根目录包含交接文档、README、TODO、Excel 源文件和原始参考 HTML。
- 线上站点为 `https://hokw-helper.pages.dev/`，通过 Cloudflare Pages 连接 GitHub 仓库 `walterbluesky66-lang/HOKW_Farm` 的 `main` 分支自动部署。只要用户要求修改、优化或编辑网站内容，且没有明确说“只本地修改/不要发布”，完成实质修改后默认应运行验证、更新交接日志、提交 Git commit 并 `git push origin main`，让 Cloudflare 自动更新线上站点。
- 云存档前端只能使用 Supabase publishable key；不要把 service role、secret key 或数据库密码放进仓库、`cloud-config.js` 或 Cloudflare 前端环境变量。Cloudflare Pages 环境变量使用 `HOKW_SUPABASE_URL` 和 `HOKW_SUPABASE_PUBLISHABLE_KEY`。
- 不要把药物作物混入主菜地收益计算。
- 兴趣圈页面应保持可拆分：主页只保留入口，核心逻辑不写入 `app.js`，本地状态不要和农场、牧场、规划状态混用。
- 保持中文用户文案自然、简洁；页面标题目前为 `Farm Helper`。

## 核心规则摘要

设 `T` 为作物原始成熟时间。

- 首次自浇：种下后立即可浇，减少 `7%T`。
- 后续自浇：
  - 最小浇水间隔为 `6%T`。
  - 最大浇水间隔为 `24%T`。
  - 小于 `6%T` 时不能浇水或减时为 0。
  - `6%T` 到 `24%T` 区间内，减时从 `1.75%T` 线性增加到 `7%T`。
  - 超过 `24%T` 后，最多仍只减少 `7%T`。
- 好友浇水：每次减少 `2.5%T`，最多 4 次，总上限 `10%T`。
- 有效成长进度 = 当前时间 - 种植时间 + 所有浇水减少时间。
- 有效成长进度大于或等于 `T` 时，作物成熟。
- 真实作物 `5h/16h/20h/28h` 的成熟时间向上取整到分钟。
- `3分钟测试作物` 不做成熟时间向上取整。
- 动物到达原始成熟时间的 `3/4` 时即可催产收获：16 小时动物按 12 小时提醒，20 小时动物按 15 小时提醒。
- 动物摊倍率 = `1 + (动物摊等级 - 1) * 5%`，例如 Lv.27 为 `2.3`，Lv.28 为 `2.35`。
- 动物回本按净投入计算：`购买价格 - 回收价格`；回收价格留空时默认购买价一半。

## 当前功能状态

已实现：

- 作物选择：3分钟测试、5小时快速、16小时经验、20小时经济、28小时经验。
- 种下并首次浇水。
- 仅种下，未浇水。
- 同步已有作物：已合并到“整块菜地种植打卡”面板内，可填写游戏显示的剩余成熟时间、当前自浇可减少时间，或距离下次可浇还需等待的时间；可选已用孙膑和已发生好友浇水次数。
- 自己浇水打卡。
- 好友浇水次数打卡，最多 4 次。
- 收获完成、删除记录、清空记录。
- 有效成长进度条。
- 浇水提示以“距离最大浇水间隔”为主，鼓励用户等到满额减时再浇；如果最佳收尾浇水早于最大间隔，则同一张卡片改为展示最佳收尾时间。
- 理论最短成熟时间展示，按当前状态继续推演，不再从种植初始状态重新计算。
- 最佳收尾浇水时间展示：推算最后一次自浇后作物刚好成熟的时间点。
- 浏览器通知、页面内弹窗、柔和提示音；作物浇水提醒按最大间隔或更早的最佳收尾浇水触发，不再按最早可自浇时间提醒。
- 种菜规则二级页面。
- 作物选择、成熟时间选择和排序选择已使用自定义下拉菜单，展开面板可显示图标、主副文案和选中状态。
- 作物档案库二级页面：展示固化在 `app.js` 的 34 条只读标准作物库，包含作物名称、解锁居所等级、成熟时间、产量、种子成本、1 级基准单价、满级基准单价、单块农田基准百工币收益和经验；Lv.1-Lv.5 作物只在档案中体现，不参与收益计算、规划或当前作物自动选档。
- 动物档案库已并入档案二级页面：支持录入和编辑动物名称、所需等级、购买价格、成熟时间、饲料费、满亲密度产物基础售价、回收价格和每轮经验。
- 牧场管理二级页面：支持设置 1-12 个栏位、动物摊等级、16 小时动物数量和 20 小时动物数量；两类数量总和自动限制在栏位数内；每类动物自动采用当前居所等级可用的同档位最高等级档案，16 小时同等级优先经验，20 小时同等级优先每轮净收益；每类只填写一次剩余收获时间，点击“我收获了”后该组开始下一轮完整催产周期，也可清空该组。
- 主页面牧场提醒区显示最近收获批次、可收动物数量和养殖数量，并在卡片顶部提供“收获”批次按钮；点击后复用牧场页“我收获了”逻辑，让对应 16h / 20h 批次开始下一轮完整催产周期。
- 收益对比分析二级页面：从只读标准作物库选择当前居所等级可种的 Lv.6 及以上作物加入对比，不再手动输入作物名称和收益；作物百工币收益按 `满级基准单价 × 产量` 计算，不叠加菜摊等级。
- 收益对比分析二级页面新增动物对比：按当前牧场保存的动物摊等级计算产物售价、每轮净百工币、经验效率、回本周期和换养追平时间，并可选择对比基准。
- 作物档案库不再在线编辑或导出；作物标准库只能维护 `app.js` 的 `BUILT_IN_CROP_ARCHIVE` 后重新发布。
- 动物档案库可导出标准库 JSON，用于后续固化到 `app.js` 的 `BUILT_IN_ANIMAL_ARCHIVE`。
- 主页面已删除“提醒状态”“预留模块”、收益对比大面板和左侧重复的“牧场管理”快捷卡片；提醒入口保留在顶部按钮，收益对比入口放在“整块菜地种植打卡”面板下方。
- 当前作物卡片的“我浇水了 / 好友浇水 +1 / 孙膑催熟 / 收获完成”互动按钮放在卡片顶部、农作物标题右侧同一标题行；删除记录按钮也在同一顶部操作区，按钮图标使用固定尺寸；“收获完成”在作物仍显示生长中时也可以点击，用于校正游戏内已经收菜但网页估算仍差几分钟的情况。
- 主页面顶部右侧提供“一键规划”主入口；`🌱 Farm Helper` 旁提供“居所设置”和“用户与存档管理”互动按钮；主页不再展开居所设置或存档管理大卡片。
- `residence-settings.html` 二级页面可调整当前居所等级、农田数量和菜摊等级，并自动保存到规划状态；菜摊等级只用于作物档案的参考收益展示，不参与性价比计算器和一键规划。
- 主页种植或同步已有作物时，选择某个成熟时间档位后，会自动绑定当前等级可用的同档位最高等级标准作物；同等级有多条时，经验作物优先经验，20小时作物优先基准百工币。
- `planner.html` 二级页面读取居所设置保存的居所等级和农田数量，只填写周末高百工币目标和睡眠时间，并优先展示“现在该做什么”、总体时间进度和当前作物进度；完整 7 天动态排期在 `planner-detail.html` 三级页面查看。
- 一键规划会读取只读标准作物库，只使用 Lv.6 及以上且 `farmLevel <= 当前等级` 的作物；每个成熟时间档位只取当前等级可用的最高等级标准作物参与规划；普通期经验优先，周五 08:00 到下周一 00:00 双倍期目标未达成时只按最高等级 20 小时高百工币作物推进目标，目标达成后转经验优先。
- 一键规划使用滚动动态规划模型，会把“种某个作物”和“等待到关键窗口”都作为候选动作，比较目标数量、双倍百工币、经验收益和睡眠空等；双倍目标未达成时，目标进度只由当前等级最高的 20 小时高百工币作物推进。
- 一键规划排期按理论最短成熟时间推演，理论口径包含首次自浇、后续自浇、睡前非满额自浇和 4 次好友浇水；再结合睡眠避让决定实际可操作收获时间。
- 当前正在种的作物也会按理论最短成熟时间占用一键规划排期，并在二级页面单独显示当前作物进度条；进度条展示自浇和收尾自浇等可预期节点，不展示好友浇水时间，好友浇水只在备注中说明已计入理论最短成熟。
- 一键规划会避开睡眠时间内自浇，并尽量避免睡眠时间成熟；如果下一次自浇会因睡眠顺延到醒后，会评估睡眠开始前最后可操作的非满额自浇，能提前成熟时也纳入排期；模型会判断睡眠前先补短周期、提前种长周期，还是等待双倍窗口更划算。
- 一键规划总览的收获卡片和当前作物进度会在睡眠顺延时显示实际成熟时间和空窗时长，例如 8 点收菜但 6:45 已成熟时显示空窗约 1 小时 15 分。
- 一键规划不会自动覆盖当前作物，用户点击“按规划种下”后才会写入当前作物卡片；当前等级最高的 20 小时目标作物在双倍窗口收获后，会按 `农田数量 * 60` 计入目标进度。
- 一键规划页可选择是否计入好友祈福；勾选时会把好友祈福成功的三倍产量纳入目标辅助判断，双倍窗口内每次成功祈福按额外 `120` 个目标数量计算，并按目标作物覆盖天数估算每天约 `2-5` 次成功祈福；如果若干轮目标作物加上可行祈福次数已经能完成目标，后续排期不再额外追加高价值目标作物；取消勾选时回到基础双倍收获算法。
- 周末目标进度在 `planner.html` 顶部 summary 中用圆环展示，口径是作物获取数量进度；旧的横向周末目标进度条已移除；二级页总体时间进度条的节点卡片在桌面端按上下交错挂在对应位置，窄屏端按顺序卡片展示；完整周计划在 `planner-detail.html` 中按“作物卡片 → 作物卡片”展示。
- 经验规划器二级页面：主页顶部提供入口；`experience-planner.html` 可输入目标经验，支持 `200W` / `200万` 简写；作物部分复用一键规划 7 天理论排期并按 `档案经验 × 农田数量` 计入，牧场部分按当前动物档案和栏位数量滚动计算 16h 动物每 12 小时、20h 动物每 15 小时的批次经验；页面展示预计达成、7 天累计、作物/牧场拆分、关键计算过程和近期经验账本，若 7 天内未达成则显示 `>7天`。
- 兴趣圈经验记录页：默认内置 Excel 中 8 组 TAG，并把 `2026-06-20` 作为“前一天经验”、`2026-06-21` 作为“今天经验”初始历史记录；页面打开自动选中当天，可用上一天、下一天和日历查看/修改历史。
- 兴趣圈录入的是每组 TAG 的累计经验；今日新增按当前日期累计值减去最近一个历史记录日累计值计算，离满额差值按 `今日新增 - 206` 显示，8200 达标剩余天数按每天满额 `206` 推算；比较基准按相对日期显示，如“昨日 · 617”；分类支持新增，已有分类在各自卡片内单独编辑分类名称和 TAG；已有分类不删除，只能删除分类下的单个 TAG，并可复制 TAG 文本。
- “用户与存档管理”二级页面可把种植打卡、动物档案、作物/动物收益对比、牧场批次、一键规划、经验规划器和兴趣圈记录导出为 JSON，也可从备份 JSON 导入到当前浏览器；作物档案不再作为用户数据导出、导入或云同步，浏览器通知权限和已提醒标记不迁移。
- 云存档第一版：所有页面加载 `storage-keys.js`、`cloud-config.js` 和 `cloud-sync.js`；未配置 Supabase 或未登录时保持本地模式；登录后读取 Supabase `user_snapshots` 的 `primary` 快照，云端有数据则首次覆盖本地并刷新；若刷新后本地脚本把旧快照迁移为新结构，会上传规范化后的本地快照而不是反复刷新；云端为空且本地有数据则初始化云端；登录状态下可迁移 localStorage key 变化会自动防抖上传完整 JSON 快照。
- 支持 `npm run build` 生成 `dist/` 静态发布目录，当前复制 `index.html`、所有二/三级页面、`style.css`、`storage-keys.js`、`cloud-sync.js`、`app.js`、`interest-circle.js` 和 `favicon.svg`，并按环境变量生成 `dist/cloud-config.js`；`AGENTS.md`、`README.md`、`TODO.md`、`supabase/`、Excel 和原始参考 HTML 不进入发布目录。

## 本地验证方式

基础验证：

```powershell
node --check E:\HOKW_Farm\app.js
node --check E:\HOKW_Farm\interest-circle.js
node --check E:\HOKW_Farm\storage-keys.js
node --check E:\HOKW_Farm\cloud-sync.js
node --check E:\HOKW_Farm\scripts\build-site.js
node --check E:\HOKW_Farm\scripts\verify-cloud-sync-reload-guard.js
npm run verify:home-interactions
npm run verify:cloud-sync
npm run build
```

手动验证：

- 检查 `E:\HOKW_Farm\dist` 只包含发布必需文件：`index.html`、`residence-settings.html`、`user-storage.html`、`rules.html`、`crop-archive.html`、`value-calculator.html`、`ranch.html`、`planner.html`、`planner-detail.html`、`experience-planner.html`、`interest-circle.html`、`style.css`、`storage-keys.js`、`cloud-config.js`、`cloud-sync.js`、`app.js`、`interest-circle.js`、`favicon.svg`。
- 确认 `dist` 不包含 `AGENTS.md`、`README.md`、`TODO.md`、`supabase/`、`.xlsx` 和 `wzry_world_farm_helper_progress_audio (1).html`，且不包含 Supabase service role、secret key 或数据库密码。
- 未设置 `HOKW_SUPABASE_URL` 和 `HOKW_SUPABASE_PUBLISHABLE_KEY` 时运行 `npm run build`，确认 `dist/cloud-config.js` 里 `syncEnabled` 为 `false`，各页面仍可本地模式打开。
- 设置 Cloudflare Pages 环境变量后重新部署，确认 `dist/cloud-config.js` 里只出现项目 URL 和 publishable key，不出现 secret key。
- 在 `user-storage.html` 点击“导出全部数据”，确认会下载 `hokw-farm-helper-backup-*.json`，文本框中出现 JSON，summary 包含当前已有的可迁移本地数据项，且不包含旧作物档案 key `wzry-world-farm-crop-archive-v1`。
- 使用导出的 JSON 在新浏览器配置或清空后的本地存储中测试导入，确认导入前有覆盖确认，导入后页面刷新并恢复种植、动物档案、牧场、规划、经验规划器、收益对比和兴趣圈数据；旧作物档案即使存在于备份 JSON 中也不应恢复为可用作物库。
- Supabase 真实项目验证：执行 `supabase/user_snapshots.sql` 后，用邮箱验证码登录；云端为空且本地有数据时应创建 `primary` 快照；另一个浏览器同邮箱登录应恢复云端数据；两个不同邮箱互相看不到对方快照；修改兴趣圈、牧场、规划、经验规划器或动物档案后，数秒内云端 `payload` 更新；作物档案不进入云端快照。
- 用浏览器打开 `E:\HOKW_Farm\index.html`。
- 点击顶部 `🌱 Farm Helper` 旁的“居所设置”，确认能进入 `residence-settings.html`；修改居所等级、农田数量和菜摊等级后刷新仍保留，并且 `planner.html` 继续读取同一组设置；菜摊等级只影响作物档案里的参考收益展示。
- 点击顶部 `🌱 Farm Helper` 旁的“用户与存档管理”，确认能进入 `user-storage.html`；点击“导出全部数据”，确认文本框出现 `HOKW_Farm` 备份 JSON。
- 点击顶部“兴趣圈”，确认能进入 `interest-circle.html` 并可返回主页面。
- 首次打开 `interest-circle.html`，确认默认 8 组 TAG、当天日期自动选中且当天录入为空；切到 `2026-06-21` 时，8 行今日新增均为 `206`、离满额差值均为 `0`。
- 在兴趣圈当天录入某行比 `2026-06-21` 多 `200` 的累计值，确认今日新增为 `200`，离满额差值为 `-6`；跳过一天录入时，确认会和最近一个有记录日比较。
- 在兴趣圈页面测试上一天、下一天、日历切换、历史修改、新增/编辑分类、删除单个 TAG 和复制 TAG 文本。
- 点击“种菜规则”，确认能进入 `rules.html`。
- 点击“作物档案库”，确认能进入 `crop-archive.html` 并可返回主页面。
- 点击“牧场管理”，确认能进入 `ranch.html` 并可返回主页面。
- 点击“作物性价比计算器”，确认能进入 `value-calculator.html` 并可返回主页面。
- 选择“3分钟测试作物”，种下并首次浇水，检查倒计时、进度条和提醒行为。
- 当前作物卡片出现后，确认“我浇水了 / 好友浇水 +1 / 孙膑催熟 / 收获完成”按钮位于卡片顶部、农作物标题右侧，不再位于进度条下方；作物仍显示“生长中”时，“收获完成”也应可点击并弹出确认框。
- 在“整块菜地种植打卡”中切换到“同步已有”，选择“20小时经济作物”，填写剩余成熟 `2小时03分`、现在自浇可减 `50分钟`，检查是否显示生长中、剩余约 `2时03分`，顶部“剩余成熟”副文案包含“理论最短”，顶部“距离最大间隔”卡片在最佳收尾早于最大间隔时显示最佳收尾时间。
- 同步已有作物后，检查“理论最短成熟”是否从当前时间继续推演，且不会显示为过去时间；检查“最佳收尾浇水”是否出现。
- 在“同步已有”中选择“还不能浇水”，填写等待 `30分钟`，检查顶部浇水卡不再提示最早可浇时间，而是继续显示距离最大间隔或最佳收尾时间。
- 点击好友浇水，检查进度条是否立即推进。
- 等到自浇可用后，检查普通打卡按钮仍可手动使用，但顶部浇水提醒卡继续按“最大间隔优先、最佳收尾更早则切换收尾”的策略展示。
- 在 `crop-archive.html` 中检查作物档案显示 34 条标准作物，作物新增、编辑、删除和导出入口均不存在；动物档案录入、编辑和导出仍可用。
- 检查 Lv.1-Lv.5 作物在作物档案中带“仅档案”标记，且不会出现在 `value-calculator.html` 作物收益对比下拉或一键规划候选中。
- 在 `crop-archive.html` 中检查当前居所等级可用作物按等级从高到低显示，高于当前等级的作物默认折叠且可展开查看。
- 修改居所设置页的菜摊等级，检查作物档案中的“菜摊参考”收益随之变化；性价比计算器中同一作物的一块田基准收益不变。
- 从档案库选择当前等级可用作物加入收益对比，检查成熟时间、理论最短、经验效率、基准百工币效率和等级显示；炎霞辣椒一块田基准收益应为 `100 × 30 = 3000`，浣溪圆茄应为 `200 × 25 = 5000`。
- 在 `crop-archive.html` 中录入一条动物，检查回收价格留空时保存为购买价一半，动物列表和 `value-calculator.html` 动物对比下拉同步出现。
- 在 `ranch.html` 设置 7 个栏位、动物摊 Lv.27，检查动物摊倍率显示为 `2.3`；设置 Lv.28 时收益计算应按 `2.35`。
- 在 `ranch.html` 填写 16 小时动物 `7` 只，检查 20 小时动物自动限制为 `0`；填写 16 小时动物 `4` 只、20 小时动物 `3` 只，检查栏位占用为 `7 / 7`。
- 在 `ranch.html` 为 16 小时动物批次填写剩余 `2小时`，检查主页牧场提醒显示该批次约 2 小时后可收；将到点批次点击“我收获了”，检查新一轮计时约为 12 小时。
- 在主页牧场提醒卡片顶部点击到点的“收获”批次按钮，检查对应 16h 或 20h 批次开始下一轮完整催产计时，另一批次不受影响；左侧不再出现重复的“牧场管理”快捷卡片。
- 在 `ranch.html` 为 20 小时动物批次保存时间，检查催产收获周期为 15 小时。
- 在 `value-calculator.html` 加入动物对比，检查动物表显示摊位后售价、每轮净收益、经验效率、回本周期、换养追平和基准经验差；净收益小于或等于 0 时回本应显示“无法回本”。
- 构造云不见为基准、瑞雪羊为目标的同周期动物对比，检查换养模型显示额外净投入 `520,000`、每轮多赚 `4,876`、理论追平约 `106.64` 轮、完整收获约 `107` 轮。
- 从主页顶部点击“居所设置”，在 `residence-settings.html` 调整居所等级和农田数量，检查刷新或进入 `planner.html` 后仍读取同一组设置。
- 在 `planner.html` 填写周末目标数量和睡眠时间，检查规划区能显示下一步建议、总体时间进度条、当前作物进度条、周末目标进度、预计达标时间和可用作物数量。
- 点击 `planner.html` 的“完整一周规划”，确认能进入 `planner-detail.html`，并按箭头卡片显示完整 7 天排期。
- 点击主页顶部“经验规划器”，确认能进入 `experience-planner.html` 并可返回主页面；输入 `200W` 或 `200万` 后点击“更新经验规划”，确认目标被解析为 `2,000,000` 经验。
- 在 `experience-planner.html` 构造 30 块田、一键规划有理论作物排期、牧场 16h/20h 动物数量和动物每轮经验均已填写的场景，确认页面展示预计达成、7 天累计、作物贡献、牧场贡献、关键计算过程和近期经验账本；作物经验应按 `档案经验 × 农田数量`，16h 动物按 12 小时一次，20h 动物按 15 小时一次。
- 在 `experience-planner.html` 把目标调到明显超过 7 天可获得经验的数值，确认预计达成显示 `>7天`。
- 构造已有当前作物场景，检查规划中当前作物按理论最短成熟时间显示，并包含后续好友浇水、自浇和收尾自浇节点。
- 检查周末目标进度为圆环展示，显示作物获取数量，且不再出现旧的横向 `planner-progress` 进度条。
- 构造睡眠 `00:00-08:00`、晚上 19:00 开始的经验作物场景，检查规划不会机械选择睡眠中成熟的长周期作物；若短周期桥接总收益更高，应先安排短周期作物。
- 构造周五 `16:45` 种下 20 小时高百工币作物、睡眠 `00:00-08:00` 的场景，检查 21:33 满额自浇后还会纳入 0 点前睡前非满额自浇，作物理论成熟约为周六 `07:15`，实际收获顺延到 `08:00`。
- 构造当前作物场景：周五 `17:31` 查看，下一次满额自浇 `21:44`，再下一次满额自浇原本会落入睡眠并被顺延到 `08:00`；检查规划会改用 `23:59` 睡前非满额自浇，当前作物进度显示 8 点前实际成熟和空窗时长。
- 构造有睡眠顺延的当前作物或规划作物，检查一键规划总览收获卡片显示“实际 HH:MM 成熟 · 空窗 X”，当前作物进度卡也显示实际成熟时间和空窗时长。
- 构造周五 07:00、周末目标未达成场景，检查预计在双倍窗口收获时只给当前等级最高 20 小时高百工币作物累计目标。
- 构造周五 08:00、30 块田、目标 `6000` 且勾选“计入好友祈福”场景，检查 3 轮 20 小时高百工币作物基础双倍为 `5400`，提示成功祈福 `5` 次即可达标、覆盖约 3 天常见范围 `6-15` 次，并确认后续不再追加第 4 轮高价值目标作物；把目标改成 `5600` 时应自动重算为成功祈福 `2` 次；取消勾选时应不显示祈福提示卡，并保留第 4 轮高价值目标作物。
- 构造周末目标已达成场景，检查后续排期转为经验优先。
- 调整居所设置页的居所等级，检查新解锁作物能参与后续排期。
- 点击“按规划种下”，检查当前作物卡片显示“规划作物”，并绑定档案作物名。

可选截图验证：

- 如果可用，可以用 Edge/Chrome 无头截图检查 `index.html`、`residence-settings.html`、`user-storage.html`、`experience-planner.html`、`interest-circle.html`、`crop-archive.html`、`ranch.html`、`value-calculator.html` 和 `rules.html` 是否正常渲染。
- 截图文件属于临时验证产物，验证后应删除。

## 对话结束更新规则

每次 Codex 对话只要对项目做了实质变更，都应更新本文件。

更新位置：

- 修改了项目状态、功能、文件结构、验证方式时，更新上方对应章节。
- 在下方“交接日志”新增一条最新记录，放在最上面。
- 如果改动会影响线上网站，验证通过后默认提交并推送到 GitHub `main`，除非用户明确要求暂不发布；最终回复需要说明是否已经 push，以及 Cloudflare 是否会自动部署。

交接日志格式：

```text
### YYYY-MM-DD - 简短标题

- 改动：
- 验证：
- 后续注意：
```

更新要求：

- 记录真实完成的内容，不写计划口号。
- 如果没有运行某项验证，要明确写“未验证”。
- 如果发现计算规则或数据结构有风险，要写在“后续注意”。
- 其他 Codex 对话也可以直接更新本文件，但不要删除旧日志，除非用户明确要求整理。

## 交接日志

### 2026-07-08 - 新增经验规划器

- 改动：新增 `experience-planner.html` 二级页面和主页顶部“经验规划器”入口；`app.js` 新增 `wzry-world-farm-experience-planner-v1` 目标经验状态、`200W` / `200万` 目标解析、经验投影计算和页面渲染；经验投影复用一键规划 7 天理论作物排期，作物经验按 `档案经验 × 农田数量` 计入，牧场经验按当前动物档案和栏位数量滚动计算 16h 动物每 12 小时、20h 动物每 15 小时的批次经验；页面展示预计达成、7 天累计、作物/牧场拆分、关键计算过程和近期经验账本，超过 7 天显示 `>7天`；`storage-keys.js`、`scripts/build-site.js`、`scripts/verify-home-interactions.js`、`style.css`、`README.md` 和本交接文件已同步。
- 验证：已先新增回归并运行 `npm run verify:home-interactions`，观察到旧逻辑按预期失败，错误为 `Experience planner should have its own secondary page`；完成修改后已运行 `node --check E:\HOKW_Farm\app.js`、`node --check E:\HOKW_Farm\interest-circle.js`、`node --check E:\HOKW_Farm\storage-keys.js`、`node --check E:\HOKW_Farm\cloud-sync.js`、`node --check E:\HOKW_Farm\scripts\build-site.js`、`node --check E:\HOKW_Farm\scripts\verify-cloud-sync-reload-guard.js`、`node --check E:\HOKW_Farm\scripts\verify-home-interactions.js`、`npm run verify:home-interactions`、`npm run verify:cloud-sync` 和 `npm run build`；构建显示 `Copied 17 files to dist` 且本地云同步配置为 disabled，已确认 `dist/` 包含 `experience-planner.html` 和发布必需文件、没有多余文件，`dist/cloud-config.js` 为空 Supabase 配置且 `syncEnabled: false`，未发现 service role、secret 或数据库密码关键词。
- 后续注意：经验规划器只做 7 天估算，不改变一键规划排期算法、作物/动物档案数据、牧场批次计时或 Supabase 表结构；真实线上 Supabase 登录未在本机跑一遍，新 key 会跟随现有 JSON 快照机制同步。

### 2026-07-08 - 修复规划页云存档自动刷新循环

- 改动：`cloud-sync.js` 在云端快照恢复后、页面刷新执行前增加 `pendingRestoreReload` 防重入标记；如果 Supabase 在刷新前重复触发登录态回调，不再重新比较同一云端快照，也不会误清恢复标记，避免规划页旧云端快照与本地过期规划窗口刷新互相触发反复自动刷新；`scripts/verify-cloud-sync-reload-guard.js` 为每个模拟场景隔离 `Storage` 原型，并新增“恢复后刷新前重复 auth 回调”回归；`README.md` 和本交接文件已同步。
- 验证：已先新增回归并运行 `npm run verify:cloud-sync`，观察到旧逻辑按预期失败，错误为 `Cloud sync should keep the restore marker when Supabase repeats the same session before the restore reload.`；完成修改后已运行 `node --check E:\HOKW_Farm\app.js`、`node --check E:\HOKW_Farm\interest-circle.js`、`node --check E:\HOKW_Farm\storage-keys.js`、`node --check E:\HOKW_Farm\cloud-sync.js`、`node --check E:\HOKW_Farm\scripts\build-site.js`、`node --check E:\HOKW_Farm\scripts\verify-cloud-sync-reload-guard.js`、`node --check E:\HOKW_Farm\scripts\verify-home-interactions.js`、`npm run verify:cloud-sync`、`npm run verify:home-interactions` 和 `npm run build`；构建显示 `Copied 16 files to dist` 且本地云同步配置为 disabled，已确认 `dist/` 只包含发布必需文件，`dist/cloud-config.js` 为空 Supabase 配置且 `syncEnabled: false`，未发现 service role、secret 或数据库密码关键词。
- 后续注意：本次只修复云存档恢复刷新竞态，不改变一键规划排期算法、作物/动物数据、Supabase 表结构或本地可迁移 key；真实线上 Supabase 登录未在本机跑一遍，用户当前卡循环的浏览器在部署更新后可能仍会有一次恢复刷新，随后应停止循环并上传规范化快照。

### 2026-07-08 - 修复一键规划过期窗口和 Lv.52 性能

- 改动：`app.js` 在开启/更新和渲染规划时检测 7 天规划窗口是否过期，过期会保留当前等级、田数、目标、睡眠和祈福设置，先归一化目标进度窗口，再把规划起点刷新到当前时间，避免旧窗口结束后继续生成空排期并显示“暂无可执行作物”；一键规划滚动动态规划深度从 `16` 收紧为 `6`，让 Lv.52 等高等级双倍边界场景能在浏览器端及时完成；`scripts/verify-home-interactions.js` 增加可固定 `Date`、`localStorage` 和页面元素的规划测试，覆盖 Lv.52 候选仍包含 `浣溪圆茄`、过期窗口自动刷新，以及周五 08:00 双倍边界下的重型规划性能；`README.md`、`TODO.md` 和本交接文件已同步。
- 验证：已先补充回归并运行 `npm run verify:home-interactions`，观察到旧逻辑因缺少过期窗口刷新 helper 按预期失败；另在收紧动态规划深度前观察到 Lv.52 重型规划约 `27` 秒并超出测试阈值；完成修改后已运行 `node --check E:\HOKW_Farm\app.js`、`node --check E:\HOKW_Farm\interest-circle.js`、`node --check E:\HOKW_Farm\storage-keys.js`、`node --check E:\HOKW_Farm\cloud-sync.js`、`node --check E:\HOKW_Farm\scripts\build-site.js`、`node --check E:\HOKW_Farm\scripts\verify-cloud-sync-reload-guard.js`、`node --check E:\HOKW_Farm\scripts\verify-home-interactions.js`、`npm run verify:home-interactions`、`npm run verify:cloud-sync` 和 `npm run build`；构建显示 `Copied 16 files to dist` 且本地云同步配置为 disabled，已确认 `dist/` 只包含发布必需文件、空 Supabase 配置和公开 Supabase CDN 引用，未包含交接文档、README、TODO、Excel、原始参考 HTML、service role、secret 或数据库密码。
- 后续注意：本次不改变作物标准库、等级筛选、周末目标公式、浇水/睡眠推演、牧场或云同步数据结构；Lv.52 档案中的 `浣溪圆茄` 本来已纳入可用候选，用户遇到的空规划主要来自已开启规划的 7 天窗口过期。

### 2026-06-26 - 修复当前作物睡前自浇空窗

- 改动：`app.js` 新增通用规划自浇候选选择逻辑；当下一次自浇会因睡眠时间顺延到醒后时，会同时评估睡眠开始前最后可操作的非满额自浇，并选择能让作物更早成熟的方案；该逻辑同时用于新作物排期和当前正在种的作物排期，避免当前作物进度继续显示“08:00（睡眠后）浇水 → 08:00 收获”而漏掉 8 点前实际成熟的空窗；`scripts/verify-home-interactions.js` 新增周五 `17:31` 当前作物回归场景，验证 `21:44` 自浇后会改用 `23:59` 睡前自浇并产生睡眠空窗；`README.md` 和本交接文件已同步。
- 验证：已先新增当前作物回归场景并运行 `npm run verify:home-interactions`，观察到旧逻辑按预期失败；完成修改后已运行 `node --check E:\HOKW_Farm\app.js`、`node --check E:\HOKW_Farm\interest-circle.js`、`node --check E:\HOKW_Farm\storage-keys.js`、`node --check E:\HOKW_Farm\cloud-sync.js`、`node --check E:\HOKW_Farm\scripts\build-site.js`、`node --check E:\HOKW_Farm\scripts\verify-cloud-sync-reload-guard.js`、`node --check E:\HOKW_Farm\scripts\verify-home-interactions.js`、`npm run verify:home-interactions`、`npm run verify:cloud-sync` 和 `npm run build`；另用脚本复现当前作物场景，结果从旧逻辑的 `21:44 自浇 → 08:00 自浇/收获` 变为 `21:44 自浇 → 23:59 睡前自浇 → 07:42 实际成熟 → 08:00 收获`，产生 `18` 分钟空窗。
- 后续注意：本次只修正一键规划中“自浇因睡眠顺延”时的候选选择，不改变作物基础减时公式、好友浇水、孙膑、牧场或云同步数据结构；真实页面显示的实际成熟时间和空窗时长会随当前作物剩余进度不同而变化，例如用户截图中的状态可能显示约 `6:45` 成熟。

### 2026-06-26 - 展示规划睡眠空窗和实际成熟

- 改动：`app.js` 新增规划睡眠空窗展示 helper；一键规划总览的收获卡片在 `sleepDelayMs > 0` 时显示“实际 HH:MM 成熟 · 空窗 X”，当前作物进度卡同步显示实际成熟时间和空窗时长，让用户知道虽然安排 8 点收菜，作物可能已在 8 点前更早成熟；`scripts/verify-home-interactions.js` 新增渲染回归检查，验证总览卡片和当前作物进度都输出“实际 / 成熟 / 空窗”；`README.md` 和本交接文件已同步。
- 验证：已先补充 `scripts/verify-home-interactions.js` 并运行 `npm run verify:home-interactions` 观察到旧界面按预期失败；完成修改后已运行 `node --check E:\HOKW_Farm\app.js`、`node --check E:\HOKW_Farm\interest-circle.js`、`node --check E:\HOKW_Farm\storage-keys.js`、`node --check E:\HOKW_Farm\cloud-sync.js`、`node --check E:\HOKW_Farm\scripts\build-site.js`、`node --check E:\HOKW_Farm\scripts\verify-cloud-sync-reload-guard.js`、`node --check E:\HOKW_Farm\scripts\verify-home-interactions.js`、`npm run verify:home-interactions`、`npm run verify:cloud-sync` 和 `npm run build`；本地未配置环境变量时构建显示 Cloud sync disabled。
- 后续注意：本次只增加展示，不改变规划排期、成熟时间、睡眠避让、浇水、好友浇水、孙膑、牧场或云同步数据结构；后续如要在完整一周详情页卡片也显示空窗，可复用 `formatPlannerSleepGap()`。

### 2026-06-26 - 计入睡前非满额自浇

- 改动：`app.js` 新增规划用自浇候选计算，若理想收尾自浇落入睡眠段，会同时评估睡眠开始前最后可操作的非满额自浇；当该睡前自浇能让作物更早成熟时，会纳入一键规划的新作物排期和当前作物排期，并在时间线中显示为“睡前自浇”；`scripts/verify-home-interactions.js` 新增真实调用 `getPlannerCropCycle()` 的回归场景，覆盖周五 `16:45` 种 20 小时作物、睡眠 `00:00-08:00`、理论约 `07:15` 成熟且 `08:00` 收获；`README.md` 和本交接文件已同步。
- 验证：已先补充 `scripts/verify-home-interactions.js` 并运行 `npm run verify:home-interactions` 观察到旧逻辑按预期失败；完成修改后已运行 `node --check E:\HOKW_Farm\app.js`、`node --check E:\HOKW_Farm\interest-circle.js`、`node --check E:\HOKW_Farm\storage-keys.js`、`node --check E:\HOKW_Farm\cloud-sync.js`、`node --check E:\HOKW_Farm\scripts\build-site.js`、`node --check E:\HOKW_Farm\scripts\verify-cloud-sync-reload-guard.js`、`node --check E:\HOKW_Farm\scripts\verify-home-interactions.js`、`npm run verify:home-interactions`、`npm run verify:cloud-sync` 和 `npm run build`；本地未配置环境变量时构建显示 Cloud sync disabled。
- 后续注意：本次只修正一键规划的睡前可操作浇水候选，不改变作物基础减时公式、主页提醒目标、好友浇水、孙膑、牧场或云同步数据结构；测试脚本为调用 `app.js` 函数新增了轻量 DOM/localStorage 模拟。

### 2026-06-26 - 允许生长中作物手动收获

- 改动：`app.js` 移除当前作物卡片“收获完成”按钮的生长中禁用条件，让作物仍显示“生长中”时也能点击收获，用于校正游戏内已经收菜但网页估算仍差几分钟的情况；收获后仍沿用原 `harvestDone()` 确认、清空当前作物、清理提醒和记录规划目标进度逻辑；`scripts/verify-home-interactions.js` 新增按钮不应带 `disabled` 的回归检查；`README.md` 和本交接文件已同步。
- 验证：已先补充 `scripts/verify-home-interactions.js` 并运行 `npm run verify:home-interactions` 观察到旧逻辑按预期失败；完成修改后已运行 `node --check E:\HOKW_Farm\app.js`、`node --check E:\HOKW_Farm\interest-circle.js`、`node --check E:\HOKW_Farm\storage-keys.js`、`node --check E:\HOKW_Farm\cloud-sync.js`、`node --check E:\HOKW_Farm\scripts\build-site.js`、`node --check E:\HOKW_Farm\scripts\verify-cloud-sync-reload-guard.js`、`node --check E:\HOKW_Farm\scripts\verify-home-interactions.js`、`npm run verify:home-interactions`、`npm run verify:cloud-sync` 和 `npm run build`；已用本地预览和应用内浏览器创建未成熟的 20 小时作物，确认页面仍显示“生长中”且“收获完成”按钮可用；已用临时无头浏览器验证点击“收获完成”后取消确认会保留当前作物，确认收获会清空当前作物；已确认 `dist/` 只包含发布必需文件，本地未配置环境变量时 `dist/cloud-config.js` 为关闭云同步，且未发现 service role、secret、数据库密码或交接文档进入 `dist/`。
- 后续注意：本次只放开手动收获入口，不改变作物成熟、减时、好友浇水、孙膑、牧场或一键规划算法；提前手动收获仍会按现有 `recordPlannerHarvestProgress(farm)` 口径记录周末目标进度。

### 2026-06-26 - 优化作物浇水提醒到最大间隔与收尾

- 改动：`app.js` 新增 `getWaterReminderTarget()`，作物浇水提醒不再按最早可自浇时间触发，改为优先提醒最大浇水间隔；如果最佳收尾浇水早于最大间隔，则顶部“距离最大间隔”卡片和提醒目标切换到最佳收尾时间；顶部“剩余成熟”卡片副文案新增理论最短成熟时间；当前作物详情中的“下次自浇”卡片改为“距离最大间隔”，并补充“按最大间隔提醒，提前浇水仍可手动打卡”或“最佳收尾早于最大间隔，按收尾时间提醒”；`index.html`、`scripts/verify-home-interactions.js`、`README.md` 已同步。
- 验证：已先补充 `scripts/verify-home-interactions.js` 并运行 `npm run verify:home-interactions` 观察到旧逻辑按预期失败；完成修改后已运行 `node --check E:\HOKW_Farm\app.js`、`node --check E:\HOKW_Farm\interest-circle.js`、`node --check E:\HOKW_Farm\storage-keys.js`、`node --check E:\HOKW_Farm\cloud-sync.js`、`node --check E:\HOKW_Farm\scripts\build-site.js`、`node --check E:\HOKW_Farm\scripts\verify-cloud-sync-reload-guard.js`、`node --check E:\HOKW_Farm\scripts\verify-home-interactions.js`、`npm run verify:home-interactions`、`npm run verify:cloud-sync` 和 `npm run build`；已用本地预览和应用内浏览器验证首页顶部第三张卡为“距离最大间隔”、种下并首次浇水后顶部“剩余成熟”显示理论最短成熟且浇水卡按最大间隔显示、同步 20 小时作物剩余 `2小时03分` 且当前自浇可减 `50分钟` 时“距离最大间隔”卡切换为最佳收尾时间、约 390px 宽度无横向溢出且浏览器错误日志为空；已确认 `dist/` 只包含发布必需文件，`dist/cloud-config.js` 在本地未配置环境变量时 `syncEnabled` 为 `false`，且未发现 service role、secret、数据库密码或交接文档进入 `dist/`。
- 后续注意：本次只调整作物浇水提醒目标和顶部/详情卡片展示，不改变作物成熟、减时、好友浇水、孙膑、牧场或一键规划算法；如果用户希望完全禁止提前浇水，需要另行修改“我浇水了”按钮可用规则，本次仍保留提前手动打卡能力。

### 2026-06-26 - 修复云存档反复自动刷新

- 改动：`cloud-sync.js` 新增云端快照恢复标记和快照指纹校验；同一份云端快照首次恢复后仍会刷新一次以重载页面，但如果刷新后本地脚本把旧快照迁移/规范化为新结构，会改为上传规范化后的本地快照并清除恢复标记，不再重复恢复和刷新；退出登录、云端一致、云端为空和上传成功时会清理临时恢复标记；新增 `scripts/verify-cloud-sync-reload-guard.js` 和 `npm run verify:cloud-sync` 回归脚本；`README.md`、`AGENTS.md` 和 `package.json` 已同步。
- 验证：已先运行 `node scripts\verify-cloud-sync-reload-guard.js` 观察到新增回归检查按预期失败；完成修改后已运行 `node --check E:\HOKW_Farm\app.js`、`node --check E:\HOKW_Farm\interest-circle.js`、`node --check E:\HOKW_Farm\storage-keys.js`、`node --check E:\HOKW_Farm\cloud-sync.js`、`node --check E:\HOKW_Farm\scripts\build-site.js`、`node --check E:\HOKW_Farm\scripts\verify-cloud-sync-reload-guard.js`、`npm run verify:cloud-sync`、`npm run verify:home-interactions` 和 `npm run build`；已确认 `dist/` 只包含发布必需文件，`dist/cloud-config.js` 在本地未配置环境变量时 `syncEnabled` 为 `false`，且未发现 service role、secret、数据库密码或交接文档进入 `dist/`。
- 后续注意：本次用脚本模拟“云端旧快照恢复后被本地脚本迁移”的刷新循环，没有使用真实 Supabase 项目在线登录验证；线上部署后如果用户已经卡在刷新循环，第一次加载可能仍会刷新一次，随后应停止循环并把规范化后的快照同步回云端。

### 2026-06-26 - 固化只读标准作物库

- 改动：`app.js` 固化 34 条居所图鉴标准作物数据，旧本地作物档案不再读取、导出、导入或云同步；作物档案页改为只读标准库，Lv.1-Lv.5 作物仅展示不参与计算或规划，高于当前居所等级的作物默认折叠；居所设置新增菜摊等级，仅用于作物档案“菜摊参考”收益；作物性价比计算器改为按 `满级基准单价 × 产量` 计算单块农田基准百工币收益，不叠菜摊，浣溪圆茄满级基准单价按 `200`、单块收益按 `5000` 固化；`storage-keys.js`、`crop-archive.html`、`value-calculator.html`、`residence-settings.html`、`style.css`、`rules.html`、`README.md`、`TODO.md` 和回归脚本已同步。
- 验证：已先修改 `scripts/verify-home-interactions.js` 并运行 `npm run verify:home-interactions` 观察到新增检查按预期失败；完成修改后已运行 `node --check E:\HOKW_Farm\app.js`、`node --check E:\HOKW_Farm\interest-circle.js`、`node --check E:\HOKW_Farm\storage-keys.js`、`node --check E:\HOKW_Farm\cloud-sync.js`、`node --check E:\HOKW_Farm\scripts\build-site.js`、`node --check E:\HOKW_Farm\scripts\verify-home-interactions.js`、`npm run verify:home-interactions` 和 `npm run build`；已用本地预览和应用内浏览器验证作物档案显示 34 条标准作物、作物编辑/导出入口不存在、动物表单仍可用、高等级作物默认折叠、Lv.1 粟米带“仅档案”、菜摊 Lv.3 下炎霞辣椒基准收益 `3000` 且菜摊参考 `3300`、浣溪圆茄基准收益 `5000`、Lv.10 计算器下拉不含 Lv.1-Lv.5 或未解锁作物、计算器加入炎霞辣椒显示 `3000` 百工币、Lv.52 加入浣溪圆茄显示 `5000` 百工币、导出全部数据不含 `wzry-world-farm-crop-archive-v1`，档案页和计算器页无横向溢出且浏览器错误日志为空；已确认 `dist/` 只包含发布必需文件，未包含交接文档、`supabase/`、Excel、原始参考 HTML 或 secret/service role。
- 后续注意：作物标准库后续只能维护 `BUILT_IN_CROP_ARCHIVE` 后重新发布；菜摊等级本次不参与作物性价比计算器、一键规划、当前作物自动选档或排序；旧云端快照如果含作物档案 key，前端导入/恢复会忽略该 key。

### 2026-06-26 - 主页设置与存档入口二级化

- 改动：主页顶部 `🌱 Farm Helper` 旁新增“居所设置”和“用户与存档管理”互动按钮；原主页“农场设置”大卡片迁移为 `residence-settings.html` 二级页，并把用户可见文案改为“居所设置 / 居所等级”；原主页“云存档与本地备份”大卡片迁移为 `user-storage.html` 二级页，入口命名为“用户与存档管理”；`scripts/build-site.js`、`scripts/verify-home-interactions.js`、`README.md`、`AGENTS.md` 已同步。
- 验证：已先运行 `npm run verify:home-interactions` 观察到新增回归检查按预期失败；完成修改后已运行 `node --check E:\HOKW_Farm\app.js`、`node --check E:\HOKW_Farm\interest-circle.js`、`node --check E:\HOKW_Farm\storage-keys.js`、`node --check E:\HOKW_Farm\cloud-sync.js`、`node --check E:\HOKW_Farm\scripts\build-site.js`、`node --check E:\HOKW_Farm\scripts\verify-home-interactions.js`、`npm run verify:home-interactions` 和 `npm run build`；已确认 `dist/` 包含 `residence-settings.html` 与 `user-storage.html`，不包含交接文档、`supabase/`、Excel、原始参考 HTML 或 secret/service role；已用本地预览和应用内浏览器验证宽屏下主页不再渲染居所/存档大卡片，顶部两个入口链接正确；`residence-settings.html` 修改居所等级 `9` 和农田数量 `66` 后刷新仍保留；`planner.html` 不含等级输入且提示读取居所设置；`user-storage.html` 云同步挂载、导出/导入入口存在，点击导出后文本框生成 `HOKW_Farm` 备份 JSON；390px 下主页、居所页、存档页均无横向溢出，浏览器错误日志为空。
- 后续注意：本次只迁移入口和文案，不改动作物成熟、浇水、牧场收获、一键规划算法或云同步数据结构；历史交接日志里的“农场等级/农场设置”表述保留为当时记录。

### 2026-06-26 - 对齐首页顶部互动按钮

- 改动：主页牧场提醒卡片顶部收获按钮的可见文案由 `收16h` / `收20h` 改为“收获”，具体批次保留在无障碍标签中；牧场标题区改为宽屏三列网格，使按钮与“牧场提醒”标题同线；当前作物卡片改为“徽标行 + 标题操作行”，互动按钮与农作物标题同线展示；顶部互动按钮图标统一使用 `.btn-icon` 固定尺寸，减少大小不一的观感；`scripts/verify-home-interactions.js`、`README.md`、`AGENTS.md` 已同步。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`、`node --check E:\HOKW_Farm\interest-circle.js`、`node --check E:\HOKW_Farm\storage-keys.js`、`node --check E:\HOKW_Farm\cloud-sync.js`、`node --check E:\HOKW_Farm\scripts\build-site.js`、`node --check E:\HOKW_Farm\scripts\verify-home-interactions.js`、`npm run verify:home-interactions` 和 `npm run build`；已用本地静态服务和临时无头 Edge 注入作物/牧场数据验证 1440px 宽屏下农作物标题与首个互动按钮顶线差为 `0`、牧场标题与收获按钮顶线差为 `0`、农作物按钮图标盒均为 `22 × 22`，且牧场按钮不再显示 `16h/20h`；已验证 390px 带数据场景无横向溢出。
- 后续注意：窄屏下按钮仍会堆叠到标题下方以避免拥挤；本次未改动牧场收获计时、作物成熟或同步已有作物的计算规则。

### 2026-06-26 - 首页补充牧场收获和顶部打卡按钮

- 改动：`app.js` 的主页牧场提醒卡片顶部新增 `收16h` / `收20h` 批次按钮，直接复用牧场页 `harvestRanchGroup()` 收获逻辑，点击后对应批次开始下一轮完整催产计时；当前作物卡片的“我浇水了 / 好友浇水 +1 / 孙膑催熟 / 收获完成”移动到卡片顶部、农作物标题右侧，删除记录按钮也放入同一顶部操作区；`index.html` 删除左侧重复的“牧场管理”快捷卡片；新增 `scripts/verify-home-interactions.js` 和 `npm run verify:home-interactions` 回归检查；`style.css`、`README.md`、`AGENTS.md` 已同步。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`、`node --check E:\HOKW_Farm\interest-circle.js`、`node --check E:\HOKW_Farm\storage-keys.js`、`node --check E:\HOKW_Farm\cloud-sync.js`、`node --check E:\HOKW_Farm\scripts\build-site.js`、`node --check E:\HOKW_Farm\scripts\verify-home-interactions.js`、`npm run verify:home-interactions` 和 `npm run build`；已确认 `dist/` 只包含网页运行文件与生成的 `cloud-config.js`，未包含文档、`supabase/`、Excel、原始参考 HTML 或 secret/service role；已用本地静态服务和浏览器验证主页空状态 390px 无横向溢出且无重复牧场快捷卡片；已用临时无头 Edge 注入作物与牧场数据验证桌面端当前作物 4 个互动按钮在标题区、进度条下方不再渲染旧按钮、主页牧场顶部存在 2 个收获按钮，点击 `收16h` 会重置 16h 批次计时且不影响 20h；已验证 390px 带数据场景无横向溢出。
- 后续注意：主页牧场按钮目前按 16h / 20h 两个批次显示，未引入同档位多批次；未改动牧场计时、动物选择和作物成熟计算规则。

### 2026-06-24 - 调整云登录验证码文案

- 改动：`cloud-sync.js` 中云存档登录验证码输入框占位文案由“输入邮件里的 6 位验证码”改为“输入邮件里的验证码”，避免 Supabase 邮件实际发出 8 位或其他长度 OTP 时误导用户。
- 验证：已运行 `node --check E:\HOKW_Farm\cloud-sync.js` 和 `npm run build`。
- 后续注意：Supabase OTP 长度由 Supabase/邮件模板配置决定，前端不应固定写死为 6 位；当前验证逻辑会把用户输入的完整验证码传给 Supabase。

### 2026-06-24 - 接入 Supabase 云存档第一版

- 改动：新增 `storage-keys.js` 统一维护可迁移/可同步的 9 组本地数据键；新增 `cloud-config.js` 本地空配置和 `cloud-sync.js` 云同步层，支持 Supabase 邮箱验证码登录、登录后云端快照优先恢复、云端为空时用本地数据初始化、可迁移数据变更后自动防抖上传；新增 `supabase/user_snapshots.sql`，包含 `user_snapshots` 表、RLS 策略和更新时间/版本触发器；所有页面接入云同步脚本，主页“在线迁移与本地备份”改为“云存档与本地备份”；`scripts/build-site.js` 构建时按 `HOKW_SUPABASE_URL` 和 `HOKW_SUPABASE_PUBLISHABLE_KEY` 生成 `dist/cloud-config.js`；`README.md`、`TODO.md`、`AGENTS.md` 已同步。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`、`node --check E:\HOKW_Farm\interest-circle.js`、`node --check E:\HOKW_Farm\storage-keys.js`、`node --check E:\HOKW_Farm\cloud-sync.js`、`node --check E:\HOKW_Farm\scripts\build-site.js` 和 `npm run build`；已确认 `dist/` 只包含网页运行文件与生成的 `cloud-config.js`，未包含文档、`supabase/`、Excel、原始参考 HTML 或 secret/service role；已用假环境变量验证构建会生成 `syncEnabled: true` 的配置，再恢复为空配置；已用本地静态服务和无头 Chrome 验证 8 个页面可访问，390px 下 `scrollWidth/clientWidth` 均为 `390/390` 且无运行时异常；未配置 Supabase 时主页云登录表单隐藏，状态显示“云存档未配置”。
- 后续注意：本次未使用真实 Supabase 项目验证邮箱验证码、RLS 和跨浏览器恢复；上线前需要在 Supabase 执行 `supabase/user_snapshots.sql`，在 Cloudflare Pages 配置 `HOKW_SUPABASE_URL` 与 `HOKW_SUPABASE_PUBLISHABLE_KEY` 后重新部署，并用两个邮箱确认账号隔离。前端只允许使用 publishable key，绝不能暴露 service role、secret key 或数据库密码。

### 2026-06-24 - 固化 GitHub 自动发布规则

- 改动：在开发原则和对话结束更新规则中明确线上站点 `https://hokw-helper.pages.dev/` 由 Cloudflare Pages 连接 GitHub 仓库 `walterbluesky66-lang/HOKW_Farm` 的 `main` 分支自动部署；后续只要用户要求修改、优化或编辑网站内容，且未明确说“只本地修改/不要发布”，完成实质修改后默认应验证、更新交接日志、提交 Git commit 并 `git push origin main`。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`、`node --check E:\HOKW_Farm\interest-circle.js`、`node --check E:\HOKW_Farm\scripts\build-site.js` 和 `npm run build`；已确认本地仓库跟踪 `origin/main`。
- 后续注意：Cloudflare Pages 的具体部署完成状态仍应以 Cloudflare 后台为准；后续 Codex 只要成功 push 到 GitHub，线上站点通常会自动触发构建，但最终回复仍应说明是否已推送。

### 2026-06-24 - 初始化 GitHub 源码仓库准备

- 改动：在 `E:\HOKW_Farm` 初始化本地 Git 仓库并设置默认分支为 `main`；新增 `.gitattributes` 统一仓库中文本文件 LF 换行；`.gitignore` 增加 `*.xlsx`，避免把本地整理源表提交到 GitHub；已把源码文件加入 Git 暂存区，`dist/`、上传 ZIP 和 Excel 仍保持忽略。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`、`node --check E:\HOKW_Farm\interest-circle.js`、`node --check E:\HOKW_Farm\scripts\build-site.js`；已用 `git status --short --ignored` 确认 `dist/`、`HOKW_Farm_cloudflare_pages.zip` 和 `王者荣耀世界兴趣圈.xlsx` 被忽略，源码文件已暂存；已按用户提供的 `walterbluesky66-lang <walterbluesky66@gmail.com>` 配置仓库级 Git 作者身份。
- 后续注意：GitHub CLI 未安装，Cloudflare CLI 通过 `npx` 启动超时；推送远程仓库建议先在 GitHub 网页创建空仓库，再把仓库 URL 发给 Codex。

### 2026-06-24 - 增加静态发布和本地数据迁移

- 改动：新增 `package.json` 与 `scripts/build-site.js`，支持 `npm run build` 生成 Cloudflare Pages 可用的 `dist/` 发布目录；新增 `.gitignore` 忽略 `dist/`、`node_modules/` 和临时发布 ZIP；所有页面增加 `favicon.svg`；主页新增“在线迁移与本地备份”卡片，支持把种植打卡、作物/动物档案、作物/动物收益对比、牧场批次、一键规划和兴趣圈记录导出为 JSON，并可导入覆盖当前浏览器数据后刷新；本次另生成 `E:\HOKW_Farm\HOKW_Farm_cloudflare_pages.zip` 便于 Cloudflare Pages 直接上传；`README.md`、`TODO.md`、`AGENTS.md` 已同步。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`、`node --check E:\HOKW_Farm\interest-circle.js`、`node --check E:\HOKW_Farm\scripts\build-site.js` 和 `npm run build`；已检查 `dist/` 只包含 12 个发布文件，且不包含 `AGENTS.md`、`README.md`、`TODO.md`、Excel 或原始参考 HTML；已用本地静态服务和无头 Chrome 验证 `index.html`、`interest-circle.html`、`crop-archive.html`、`ranch.html`、`value-calculator.html`、`planner.html`、`planner-detail.html`、`rules.html` 均可打开，导出 JSON 包含兴趣圈数据键，导入可覆盖规划设置，390px 窄屏无横向溢出，页面无控制台错误。
- 后续注意：第一版在线化仍是纯静态站，每个域名/浏览器各自保存 `localStorage`；浏览器通知权限和已提醒标记不会迁移。上线到 Cloudflare Pages 时使用 Build command `npm run build`、Build output directory `dist`，不要把项目根目录直接作为公网目录。

### 2026-06-22 - 精简兴趣圈卡片日期文案

- 改动：兴趣圈每日录入卡片的“比较基准”由完整日期改为相对日期显示，例如 `2026-06-21 · 617` 改为 `昨日 · 617`；“8200 达标”去掉日期前缀，例如只显示 `还需 38 天`；`README.md`、`AGENTS.md` 已同步。
- 验证：已运行 `node --check E:\HOKW_Farm\interest-circle.js` 和 `node --check E:\HOKW_Farm\app.js`；已用本地临时静态服务和浏览器将兴趣圈日期固定到 `2026-06-22`，确认 8 张卡片比较基准均显示 `昨日 · 数值`，不再包含 `2026-06-21 ·`，8200 达标项均只显示 `还需 X 天`，不再包含 `2026-xx-xx · 还需`；已验证 390px 窄屏无横向溢出且页面无控制台错误。
- 后续注意：比较基准如果跨过多天，会显示 `前日` 或 `N 天前`；如未来需要精确日期，可考虑放在悬停提示或详情展开里，而不是恢复到卡片主文案。

### 2026-06-22 - 优化兴趣圈 TAG 卡片和内联编辑

- 改动：兴趣圈每日录入 TAG 卡片和分类管理卡片增加稳定色彩主题、圆角矩形 TAG chip、左侧强调色和更清晰的文字层级；分类管理区移除顶部统一编辑表单，已有分类改为点击本卡片“编辑”后在卡片内展开名称和 TAG 输入框；新增分类保留为分类列表下方的独立新增卡片；`README.md`、`AGENTS.md` 已同步。
- 验证：已运行 `node --check E:\HOKW_Farm\interest-circle.js` 和 `node --check E:\HOKW_Farm\app.js`；已用本地临时静态服务和浏览器验证 `interest-circle.html` 桌面端默认渲染 8 张录入卡、8 张分类卡，旧 `#interestCategoryForm` 不存在，新增分类表单位于分类列表之后；点击斗战之志分类“编辑”时仅该分类卡片出现 1 个内联编辑表单，保存临时分类名和 TAG 后每日录入卡标题同步更新，随后已恢复原分类名和 TAG；已验证 1180px 首行显示 4 张 TAG 录入卡，390px 窄屏无横向溢出，页面无控制台错误。
- 后续注意：分类仍不提供整类删除入口；如果以后需要隐藏不再使用的分类，应继续优先做“归档/停用”状态，不要删除分类 id 或历史经验记录。

### 2026-06-22 - 优化兴趣圈小卡片和分类管理

- 改动：兴趣圈每日录入卡片改为紧凑小卡片布局，桌面宽度下一行可显示 4 个 TAG 分类卡片；分类管理区取消“删除分类”入口，保留新增分类、编辑分类名称和 TAG，删除动作改为删除分类下的单个 TAG，分类 id 和历史经验记录继续保留；`README.md`、`AGENTS.md` 已同步。
- 验证：已运行 `node --check E:\HOKW_Farm\interest-circle.js` 和 `node --check E:\HOKW_Farm\app.js`；已用本地无头 Chrome 验证 1180px 桌面宽度下兴趣圈录入区第一行显示 4 张卡片；页面不存在 `data-delete-category` 删除分类按钮；分类管理区存在单个 TAG 删除按钮；编辑斗战之志分类名称和 TAG 后，录入卡片标题同步更新且 `2026-06-22` 的累计经验 `817` 保留；删除其中一个 TAG 后分类仍存在、历史经验仍保留；新增分类后录入卡片和分类卡片均增加；已验证 1180px 与 390px 无横向溢出且无脚本错误。
- 后续注意：斗战之志、筑家之趣等分类承担历史经验记录锚点，不要再增加整类删除按钮；如需隐藏分类，应另做“停用/归档”状态而不是删除分类和历史记录。

### 2026-06-22 - 新增兴趣圈经验记录页

- 改动：新增 `interest-circle.html` 和独立脚本 `interest-circle.js`，主页顶部新增“兴趣圈”入口；兴趣圈使用单独 `wzry-world-interest-circle-v1` 本地状态，默认内置 Excel 中 8 组 TAG 和 `2026-06-20`/`2026-06-21` 两天历史累计经验；支持按日期录入累计经验、上一天/下一天/日历查看历史、自动计算今日新增、`今日新增 - 206` 差值、8200 达标日期，以及新增/编辑分类、删除单个 TAG 和复制 TAG 文本；`style.css`、`README.md`、`TODO.md` 已同步。
- 验证：已运行 `node --check E:\HOKW_Farm\interest-circle.js` 和 `node --check E:\HOKW_Farm\app.js`；已用本地无头 Chrome 验证主页顶部存在 `interest-circle.html` 入口；首次打开兴趣圈页默认选中 `2026-06-22` 且当天录入为空；切到 `2026-06-21` 时 8 行今日新增均为 `206`、差值均为 `0`；当天录入斗战之志累计 `817` 时显示今日新增 `200`、差值 `-6`；跳到 `2026-06-23` 录入 `1023` 时会以 `2026-06-22` 为最近基准并显示新增 `206`、差值 `0`；已验证新增/编辑分类、删除单个 TAG、复制 TAG 文本、1180px 与 390px 无横向溢出且无脚本错误。
- 后续注意：兴趣圈页面刻意不接入 `app.js` 和农场/牧场/规划状态；如果未来要独立部署，优先迁出 `interest-circle.html`、`interest-circle.js` 和 `.interest-*` 样式，再移除主页入口。

### 2026-06-20 - 牧场改为按数量批量管理

- 改动：`ranch.html` 取消逐栏位动物录入，改为填写 16 小时动物数量和 20 小时动物数量；`app.js` 牧场状态从旧 `slots` 兼容迁移到 `groups.h16/groups.h20`，两类数量总和自动限制在栏位数内，并按当前农场等级可用的同档位最高等级动物自动绑定，16 小时同等级优先经验，20 小时同等级优先每轮净收益；牧场页、主页牧场提醒、浏览器提醒和动物档案“牧场采用”徽标已同步批次口径；`style.css`、`README.md`、`TODO.md` 已同步。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`；已验证 7 个栏位下填写 16 小时动物 `7` 只会把 20 小时动物限制为 `0`，16 小时 `4` 只 + 20 小时 `3` 只显示栏位占用 `7 / 7`；已验证 16 小时批次保存剩余 `2小时` 后主页显示约 2 小时后收获，到点点击“我收获了”后重置为约 12 小时；已验证 20 小时批次保存后催产周期为 15 小时；已验证旧 `slots` 本地状态可迁移成批次数量；已验证 `index.html`、`ranch.html` 在桌面和 390px 窄屏无横向溢出且无脚本错误。
- 后续注意：新版牧场每个成熟时间档位只有一个批次计时，适合“同一类动物一起养”的场景；如果用户实际把同档位动物分批次错开收获，当前版本不会分别提醒，需要未来新增“同档位多批次”而不是回到逐栏位录入。

### 2026-06-20 - 增加动物换养追平模型

- 改动：`value-calculator.html` 动物收益对比文案改为覆盖换养追平；`app.js` 新增动物换养模型，按目标动物与基准动物的净投入差、单位时间净收益差计算理论追平轮数/时间、完整收获轮数，并提示如果先用基准动物攒额外净投入大约需要多久；动物对比表新增“换养追平”列，摘要区新增“换养追平”卡片；`style.css` 调整动物表格宽度和摘要卡自适应列数；`README.md` 已同步公式口径。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`；已用临时浏览器配置注入与瑞雪羊/云不见等值的测试数据，验证基准动物切换到较高净收益动物时显示额外净投入 `520,000`、每轮多赚 `4,876`、理论交叉点 `106.64` 轮（约 `53天 7小时 44分钟`）、完整收获约 `107` 轮（`53天 12时`），且 1180px 与 390px 下无横向溢出、无脚本错误。
- 后续注意：换养追平沿用当前页面的净投入口径（购买价 - 回收价）；如果未来要按“手头现金是否足够购买新动物”建模，需要另加现金流口径，不要和净投入回本口径混在一起。

### 2026-06-20 - 增加牧场管理

- 改动：新增 `ranch.html` 牧场管理页；`index.html` 新增牧场入口和主页牧场提醒区；`crop-archive.html` 改为作物/动物档案库并新增动物档案录入、编辑、删除和导出；`value-calculator.html` 改为作物/动物性价比计算器并新增动物收益对比；`app.js` 新增 `wzry-world-farm-animal-archive-v1`、`wzry-world-farm-ranch-v1`、`wzry-world-farm-animal-value-calculator-v1` 三套本地状态，支持动物 3/4 催产收获、动物摊倍率、默认半价回收、净投入回本、栏位接管和收获重置；`style.css` 增加牧场和动物表格样式；`README.md`、`TODO.md` 已同步。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`；已用本地无头 Edge 验证主页牧场提醒渲染、7 个栏位读取、27 级动物摊倍率为 `2.3`、28 级倍率为 `2.35`、16 小时动物催产周期为 `12` 小时、20 小时动物催产周期为 `15` 小时、到点栏位点击“我收获了”后重置为约 `12` 小时、动物回收价格留空保存为购买价一半、动物对比表渲染 2 条数据；已验证 `index.html`、`crop-archive.html`、`ranch.html`、`value-calculator.html` 在 390px 下无横向溢出且无脚本错误。
- 后续注意：牧场第一版不纳入一键规划排期；动物档案标准库仍为空，若要发给别人开箱即用，需要补充 `BUILT_IN_ANIMAL_ARCHIVE` 或做导入功能。

### 2026-06-20 - 增加祈福计入开关

- 改动：`planner.html` 规划参数中新增“计入好友祈福”复选项，并增加简短说明；`app.js` 新增 `includeBlessing` 规划状态，默认保持勾选并保存到本地；勾选时继续使用好友祈福辅助目标模型，取消勾选时不生成祈福提示卡，目标进度和排期回到基础双倍收获算法；`style.css` 调整规划参数区三列布局和复选项小字样式；`README.md` 已同步说明该开关口径。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`；已用脚本级规划函数验证 30 块田、目标 `6000` 且计入祈福时，3 轮目标作物 + 成功祈福 `5` 次可达标并转经验优先；取消计入祈福时，`blessingPlan` 为 `null`，目标作物保留 4 轮；已用本地 Edge 无头打开注入测试数据的 `planner.html`，验证勾选时显示祈福提示卡且目标卡 3 个，取消勾选时不显示祈福提示卡且目标卡 4 个；已验证 1180px 与 390px 下无横向溢出，并单独确认“计入好友祈福”标签和说明文案存在。
- 后续注意：当前开关只影响规划估算；实际收获进度仍只记录基础双倍收获，若以后要记录真实成功祈福次数，需要新增打卡输入。

### 2026-06-20 - 增加好友祈福辅助目标模型

- 改动：一键规划新增好友祈福辅助目标模型；双倍窗口内目标作物基础仍按每块田 `60` 个计入，成功祈福按三倍产量额外折算 `120` 个目标数量；模型按目标作物覆盖天数估算每天约 `2-5` 次成功祈福，若若干轮目标作物加可行祈福次数已经能完成周末目标，则后续排期转向经验优先，不再额外追加高价值目标作物；`planner.html` 总览和 `planner-detail.html` 详情都会显示祈福辅助提示卡；`README.md` 已同步说明该口径。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`；已用脚本级规划函数验证 30 块田、目标 `6000` 时 3 轮高价值作物需要成功祈福 `5` 次、覆盖 3 天常见范围 `6-15` 次，且目标作物记录只保留 3 轮、后续转经验；已验证目标改为 `5600` 时自动重算为成功祈福 `2` 次；已验证目标 `7500` 时 3 轮在常见上限内不够，会保留第 4 轮；已用本地 Edge 无头打开注入测试数据的 `planner.html`，确认提示卡渲染、目标作物卡为 3 个，并在 1180px 与 390px 检查 `scrollWidth === clientWidth` 无横向溢出。
- 后续注意：当前祈福模型只做规划估算，不记录实际成功祈福次数；实际收获后如果要把祈福成功数写入周末目标进度，需要新增打卡入口或收获时的成功祈福输入。

### 2026-06-19 - 农场设置迁回主页

- 改动：首页顶部右侧新增醒目的“一键规划”入口，并移除侧栏中原有的一键规划快捷卡片；首页新增“农场设置”面板，负责当前农场等级和农田数量输入；`planner.html` 不再显示等级和田数字段，只保留周末目标数量和睡眠时间；`app.js` 改为首页设置即时保存，规划页读取同一份本地规划状态。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`；已用本地 Chrome 无头打开 `index.html` 和 `planner.html`，验证首页存在右上角一键规划入口、首页等级/田数可保存为 Lv.7 / 88 块田、规划页不再渲染等级/田数字段且启动规划后仍读取 Lv.7 / 88 块田；已验证 1180px 和 390px 宽度下首页/规划页无横向溢出，且无脚本错误。
- 后续注意：农场等级和农田数量现在属于主页全局设置；后续如果新增多块独立菜地，需要先重新定义这些全局设置与单块菜地配置的关系。

### 2026-06-18 - 强化规划进度条节点对应

- 改动：优化 `planner.html` 二级页总体时间进度，总览节点卡片改为挂在进度条对应位置，并在桌面端上下交错展示，卡片内容压缩为时间、收获作物和种植作物；窄屏端保留顺序卡片，避免拥挤。修复当前作物进度条末端“收尾自浇”和“收获”文字重叠的问题，过近的中间浇水标签不再显示在轨道上，只在下方备注保留具体时间。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`；已用本地 Chrome 无头截图检查 1180px iframe 桌面总览页和 390px iframe 窄屏总览页；截图确认总览卡片与进度条节点对应，当前作物轨道末端不再出现文字重叠；已删除临时验证页和截图文件。
- 后续注意：当前总览最多展示前 8 个关键节点；若以后要展示更多节点，建议增加横向滚动或分页，不要继续压缩同一条进度条。

### 2026-06-18 - 优化一键规划总览和详情页

- 改动：重构 `planner.html` 的一键规划展示层级，二级页优先显示总体时间进度条、下一步建议、当前作物进度条和进入完整计划的入口；总体进度条只展示种植/收获轮换，不再展示好友浇水时间，并用备注说明理论最短成熟已包含 4 次好友浇水假设；新增 `planner-detail.html` 三级页面，用箭头卡片展示完整一周排期。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`；已用本地 Chrome 无头截图检查桌面总览页、桌面详情页、390px iframe 窄屏总览页和 390px iframe 窄屏详情页；390px iframe 检查显示文档级 `scrollWidth/clientWidth` 为 `390/390`，页面无横向滚动；截图确认总览文字放在进度条下方，三级详情页按箭头卡片展示。
- 后续注意：二级页为了避免移动端拥挤，窄屏下总体进度条使用无数字小圆点，当前作物轨道的具体自浇时间主要放在下方备注；如果后续要让用户手动选择“是否假设好友浇水”，仍需要新增规划参数开关。

### 2026-06-18 - 修复当前作物规划和圆环目标进度

- 改动：修复一键规划中当前正在种的作物仍按实际成熟时间占位的问题，改为从当前状态按理论最短成熟时间继续推演；当前作物排期现在会显示剩余好友浇水、自浇、睡眠顺延后的自浇和收尾自浇节点；周末目标进度从独立横向进度条改为顶部“周末目标进度”卡片中的圆环，口径为作物获取数量，并显示当前已获得数量、目标数量和本表预计数量。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`；已用本地无头 Edge 构造周五 09:00 当前 20 小时作物场景，验证当前作物从实际睡眠后收获改为按理论最短 21:52 收获，时间线包含好友浇水×4、13:48 自浇、18:36 自浇和 21:51 收尾自浇；已验证顶部存在圆环目标进度，显示 `0 / 6,000` 和本表预计 `6,000`，旧 `.planner-progress` 横向进度条不再渲染；已验证 390px 窄屏无横向溢出。
- 后续注意：当前作物理论排期默认把剩余好友浇水按可立即发生处理，自浇按最长间隔安排并避开睡眠；如果后续要支持“不假设好友浇水”，需要在规划页增加独立开关。

### 2026-06-18 - 收紧一键规划目标作物口径

- 改动：一键规划排期改为按理论最短成熟时间推演，理论口径包含首次自浇、后续自浇和 4 次好友浇水；规划候选作物改为每个成熟时间档位只取当前等级可用的最高等级档案作物；周末 6000 目标只由当前等级最高的 20 小时高百工币作物推进，非 20 小时作物即使百工币更高也不能在目标未完成时插队；主页种下或同步已有作物时会按所选成熟时间档位绑定当前等级可用的最高等级档案作物，并在当前作物卡片显示档案收益。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`；已用本地无头 Edge 构造 Lv.5 档案场景，验证即使 5 小时作物百工币远高于 20 小时作物，周五 09:00 且目标未达成时首个排期仍为 20 小时目标作物并显示 `目标 +6,000`；已验证规划时间线显示理论好友浇水 `×4`；已验证主页手动选择 20 小时作物会绑定 Lv.5 的 20 小时档案条目；已验证规划页和主页 390px/桌面宽度无横向溢出。
- 后续注意：当前“最高等级档案作物”按 `farmLevel <= 当前等级` 过滤，并先比较等级；同等级下 20 小时作物按百工币排序，经验类作物按经验排序。若以后要允许同等级多作物手动指定，需要给规划页增加显式选择入口。

### 2026-06-18 - 调整一键规划页面和模型

- 改动：将一键规划从主页大面板迁出到 `planner.html` 二级页面，主页只保留入口；排期展示改为进度条式时间轨道，用关键节点标出种下、浇水、睡眠避让和收获；排期算法改为滚动动态规划模型，把“种某个作物”和“等待到关键窗口”都纳入候选动作，比较目标数量、双倍百工币、经验收益和睡眠空等；修正周末目标未达成时的排序，同等目标数量下优先百工币收益最高的作物。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`；已用本地无头 Edge 验证主页只保留 `planner.html` 入口；已验证周五 09:00 且目标未达成时优先选择测试档案中百工币最高的“胭纱云棉”；已验证规划页存在进度条节点标记；已验证 390px 窄屏无横向溢出。
- 后续注意：当前模型为有限深度滚动动态规划，候选作物会保留经验、百工币、效率和短周期代表；若未来档案库作物数量大幅增加，需要继续关注浏览器端计算性能。

### 2026-06-18 - 增加一键规划

- 改动：主页新增“一键规划”设置和排期展示，支持当前农场等级加减/输入、农田数量、周末高百工币目标、睡眠时间；新增 `wzry-world-farm-planner-v1` 本地存储；排期读取作物档案库并按等级筛选，普通期经验优先，双倍窗口目标未达成时高百工币优先，目标达成后转经验优先；规划会避开睡眠自浇和睡眠成熟，并支持短周期作物桥接睡眠空档；新增“按规划种下”联动当前作物卡片，双倍窗口收获规划高百工币作物后按 `农田数量 * 60` 累计目标进度。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`；已用本地无头 Edge 验证睡眠 `00:00-08:00` 且周一 19:00 场景可先排 5 小时短周期桥接作物；已验证周五 07:00 且目标未达成时优先 20 小时高百工币作物；已验证周末目标已达成后切回 16 小时高经验作物；已验证等级升到 2 后会采用 28 小时高等级经验作物；已验证点击“按规划种下”会在当前作物卡片显示“规划作物”并绑定档案；已验证 390px 窄屏无横向溢出。
- 后续注意：本次一键规划仍按整块菜地同种作物排期，不拆多块田；未来计划默认不假设好友浇水和孙膑，只有用户实际打卡后才会读取当前状态重排；若后续接入真实标准库，应优先补足档案作物的等级、经验和百工币数据。

### 2026-06-18 - 修正档案页成熟时间下拉

- 改动：将 `crop-archive.html` 档案表单中的成熟时间自定义下拉收紧到与普通输入框一致的 48px 高度；缩小该表单下拉的图标和箭头；展开菜单选项改为自动换行显示完整主副文案，不再用省略号截断。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`；已通过本地 `http://127.0.0.1:8788/crop-archive.html` 预览测量成熟时间下拉和相邻输入框高度均为 48px；已验证展开菜单选项文字为正常换行；已验证 390px 窄屏无横向溢出。
- 后续注意：本次只调整档案页表单里的下拉紧凑样式和全局下拉选项的换行显示，未改动作物计算或档案数据结构。

### 2026-06-18 - 拆出性价比计算器页面

- 改动：新增 `value-calculator.html` 作物性价比计算器二级页面，并把主页面右侧的收益对比大面板迁出；主页面在“整块菜地种植打卡”面板下方新增性价比计算器入口；计算器页面继续读取同一份档案库和对比 `localStorage` 数据。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`；已用本地无头 Edge 验证主页面不再渲染 `valueCalculator` 面板，打卡面板下方入口可进入 `value-calculator.html`；已验证计算器页可读取档案库作物、加入对比并渲染结果；已验证主页面、档案页、计算器页 390px 窄屏无横向溢出，且无脚本异常。
- 后续注意：主页面现在只保留打卡入口和当前作物卡片；收益分析相关改动应优先落在 `value-calculator.html`，档案录入相关改动应优先落在 `crop-archive.html`。

### 2026-06-18 - 优化主页面布局和档案库入口

- 改动：新增 `crop-archive.html` 作物档案库二级页面，并把主页面作物档案库面板迁出；主页面顶部新增“作物档案库”入口；“同步已有作物”合并进“整块菜地种植打卡”面板，通过“新种下 / 同步已有”切换；删除主页面“提醒状态”和“预留模块”两个面板；`app.js` 改为兼容主页面和档案页共用。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`；已用本地无头 Edge 验证主页面不再渲染“提醒状态”“预留模块”和档案库大面板，主页面可切换到同步模式并同步 20 小时作物、显示游戏同步标记，作物卡片 6 个指标含“最佳收尾浇水”；已验证 `crop-archive.html` 可新增作物、导出标准库，主页面收益对比下拉可读取新增档案；已验证主页面和档案页 390px 窄屏无横向溢出，且无脚本异常。
- 后续注意：档案库仍使用同一个 `localStorage` 键；主页面收益对比只读取档案，不负责编辑档案。若后续重新设计药物作物，应新增明确功能入口，不再放空白预留面板。

### 2026-06-18 - 增加作物档案库

- 改动：新增作物档案库面板，支持录入和编辑农作物名称、成熟时间、满级百工币、经验、所需农场等级；收益对比改为从档案库选择作物加入分析，旧的手填收益数据会迁移成档案库条目；档案编辑后当前对比表会同步读取最新数据；新增标准库 JSON 导出入口，方便后续固化为发给他人也自带的内置数据库。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`；已通过本地 `http://127.0.0.1:8787/index.html` 预览验证新增档案、编辑档案、加入收益对比、导出标准库数据均正常；已验证 390px 窄屏无横向溢出。
- 后续注意：静态网页在浏览器内录入的数据仍保存在当前浏览器 `localStorage`；如果要让其他人打开网页时自带这些作物，需要把导出的标准库数据固化到 `app.js` 的 `BUILT_IN_CROP_ARCHIVE` 数组，或后续接入在线同步/导入功能。

### 2026-06-17 - 修复同步后的理论推演

- 改动：修复同步已有作物后“理论最短成熟”仍按种植初始状态推演、可能显示到过去时间的问题；新增基于当前状态的理论最快推演；新增“最佳收尾浇水”指标，用于显示最后一次自浇后作物刚好成熟的推荐时间点。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`；已用本地无头 Edge 验证同步已有作物后作物卡片正常渲染“理论最短成熟”和“最佳收尾浇水”指标；已确认 20 小时作物、剩余 `2小时03分`、当前可减 `50分钟` 的同步状态仍显示生长中、剩余 `2时3分`、下次自浇“现在”。
- 后续注意：当前理论最快推演仍沿用“剩余好友浇水可立即补满、后续自浇优先按最大减时，最后一次自浇按刚好成熟收尾”的口径；若未来要做收益/在线版，可以把这套推演口径在规则页单独展开说明。

### 2026-06-17 - 增加已有作物同步

- 改动：新增“同步已有作物”表单，支持按游戏剩余成熟时间、当前自浇可减时间或距离下次可浇等待时间接管作物；同步时可选已用孙膑，并可填写已发生好友浇水次数用于限制后续可记录次数；作物卡片新增“游戏同步”标记和同步口径说明。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`；已用本地无头 Edge 验证 20 小时作物、剩余 `2小时03分`、当前可减 `50分钟` 时显示生长中、剩余 `2时3分`、下次自浇“现在”；已验证等待 `30分钟` 模式显示约 `30分钟`；已验证 390px 窄屏无横向溢出。
- 后续注意：同步功能只校准当前剩余成熟和未来浇水节点，不反推历史自浇减时；已发生好友浇水次数只限制后续次数，不重复扣减成熟时间。

### 2026-06-17 - 修正下拉层级和间距

- 改动：收紧自定义下拉按钮和选项间距；将字符箭头改为固定盒子的 CSS 箭头，避免展开/收起时位置跳动；提高展开菜单层级，修复成熟时间菜单被下方排序控件盖住的问题。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`；已通过本地预览验证成熟时间菜单覆盖排序控件时位于上层、排序菜单行距收紧；已验证 390px 窄屏下成熟时间和排序下拉无横向溢出。
- 后续注意：若继续新增下拉框，优先复用当前 `.custom-select` 结构；如某个表单区域使用 `overflow:hidden`，可能仍需单独处理菜单外溢空间。

### 2026-06-17 - 美化下拉选项

- 改动：将主页面 3 个原生下拉框增强为自定义下拉菜单，保留原 `select` 值用于现有计算逻辑；新增展开面板、图标、主副文案、选中态、键盘操作和窄屏适配样式。
- 验证：已运行 `node --check E:\HOKW_Farm\app.js`；已通过本地预览地址在浏览器中验证作物下拉可鼠标展开、键盘展开、选择后同步 `cropSelect.value`，并验证 390px 窄屏无横向溢出。
- 后续注意：自定义下拉仍依赖 `app.js` 初始化；若未来新增动态下拉框，需要调用同一增强逻辑或复用当前组件。

### 2026-06-17 - 新建 Codex 协作交接文件

- 改动：新增 `AGENTS.md`，记录项目现状、核心规则、开发原则、验证方式和后续对话更新规则。
- 验证：本次仅新增文档，未涉及运行逻辑。
- 后续注意：后续每次对项目做实质修改后，应同步更新本文件的相关章节和交接日志。
